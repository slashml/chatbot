FROM node:22.5.1-alpine AS base

# Create a new stage named 'deps' based on the 'base' stage
FROM base AS deps
# Install libc6-compat to ensure compatibility with Alpine Linux
RUN apk add --no-cache libc6-compat
# Set the working directory to /app
WORKDIR /app
# Copy package.json to the working directory
COPY package.json ./
# Install dependencies using npm install (instead of npm ci)
RUN npm install --production=false

# Create a new stage named 'builder' based on the 'base' stage
FROM base AS builder
# Set the working directory to /app
WORKDIR /app
# Copy node_modules from the 'deps' stage to the current stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all files from the current directory to the working directory
COPY . .
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Create a new stage named 'runner' based on the 'base' stage
FROM base AS runner
# Set the working directory to /app
WORKDIR /app
# Set NODE_ENV to production
ENV NODE_ENV production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1
# Create a system group named 'nodejs' with GID 1001
RUN addgroup --system --gid 1001 nodejs
# Create a system user named 'nextjs' with UID 1001
RUN adduser --system --uid 1001 nextjs
# Copy the public directory from the 'builder' stage
COPY --from=builder /app/public ./public
# Copy the .next directory from the 'builder' stage and set ownership to nextjs:nodejs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# Copy node_modules from the 'builder' stage
COPY --from=builder /app/node_modules ./node_modules
# Copy package.json from the 'builder' stage
COPY --from=builder /app/package.json ./package.json
# Switch to the 'nextjs' user
USER nextjs
# Expose port 3000
EXPOSE 3000
# Set the PORT environment variable to 3000
ENV PORT 3000
# Set the default command to start the Next.js application
CMD ["npm", "start"]