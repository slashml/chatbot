Next.js Chatbot with Gemini AI
A modern chatbot application built with Next.js that integrates Google's Gemini AI for intelligent conversations. Features Google authentication and local storage for chat history.
Features

AI-Powered Conversations: Leverages Google's Gemini API for natural language processing
Google Authentication: Secure user login with Google OAuth
Local Storage: Chat history persists locally in the browser
Responsive Design: Works seamlessly across desktop and mobile devices
Real-time Chat Interface: Smooth, interactive messaging experience

Tech Stack WOW

Framework: Next.js 14+ with App Router
Authentication: NextAuth.js with Google Provider
AI Integration: Google Gemini API
Styling: Tailwind CSS (or your preferred styling solution)
Storage: Browser Local Storage
Language: TypeScript

Prerequisites
Before running this application, make sure you have:

Node.js 18+ installed
A Google Cloud Project with Gemini API enabled
Google OAuth credentials configured

Environment Variables
Create a .env.local file in the root directory:
env# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Gemini API
GEMINI_API_KEY=your_gemini_api_key
Installation

Clone the repository:

bashgit clone <repository-url>
cd nextjs-gemini-chatbot

Install dependencies:

bashnpm install
# or
yarn install
# or
pnpm install

Set up environment variables (see above)
Run the development server:

bashnpm run dev
# or
yarn dev
# or
pnpm dev

Open http://localhost:3000 in your browser

Configuration
Google Cloud Setup

Go to Google Cloud Console
Create a new project or select an existing one
Enable the Gemini API
Create credentials for OAuth 2.0
Add your domain to authorized origins

OAuth Configuration
Add the following to your Google OAuth settings:

Authorized JavaScript origins: http://localhost:3000
Authorized redirect URIs: http://localhost:3000/api/auth/callback/google

Usage

Authentication: Users must sign in with their Google account
Start Chatting: Begin conversations with the AI chatbot
Persistent History: Chat history is automatically saved to local storage
Session Management: Conversations persist across browser sessions

API Routes

/api/auth/* - NextAuth.js authentication endpoints
/api/chat - Gemini API integration for chat responses

Project Structure
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── chat/
│   ├── components/
│   ├── page.tsx
│   └── layout.tsx
├── lib/
│   ├── auth.ts
│   ├── gemini.ts
│   └── utils.ts
├── types/
└── public/
Features in Detail
Chat Functionality

Real-time message exchange with Gemini AI
Message history stored locally
Typing indicators and loading states
Error handling for API failures

Authentication

Secure Google OAuth integration
User session management
Protected routes and API endpoints

Local Storage

Automatic chat history persistence
Cross-session conversation continuity
User-specific data storage

Deployment
Vercel (Recommended)

Push your code to GitHub
Connect your repository to Vercel
Add environment variables in Vercel dashboard
Deploy automatically

Other Platforms
Configure environment variables and build commands according to your platform's requirements.
Contributing

Fork the repository
Create a feature branch
Make your changes
Submit a pull request

License
This project is licensed under the MIT License - see the LICENSE file for details.
Support
For issues and questions:

Create an issue in the GitHub repository
Check the documentation for common solutions

Acknowledgments

Google Gemini AI for powerful language processing
Next.js team for the excellent framework
NextAuth.js for authentication solutions
this is one of amazing app planet earth has seen. Inshallah.