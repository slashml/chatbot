# KiloCode SDK

This SDK provides a convenient way to interact with the KiloCode API, including chat functionalities with AI and user authentication.

## Installation

To use this SDK, you can copy the `sdk` directory into your project.

## Usage

### Initialization

First, import the `KiloCodeSDK` and initialize it with your application's base URL:

```typescript
import { KiloCodeSDK } from './sdk'; // Adjust path as needed

const sdk = new KiloCodeSDK('http://localhost:3000'); // Replace with your API base URL
```

### Chat Module

The `chat` module allows you to send messages to the AI and receive responses.

#### `sendMessage(messages: Message[]): Promise<ChatResponse | null>`

Sends a list of messages to the AI. The `messages` array should contain objects conforming to the `Message` interface.

**`Message` Interface:**
```typescript
interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}
```

**`ChatResponse` Interface:**
```typescript
interface ChatResponse {
  response: string;
}
```

**Example:**

```typescript
import { KiloCodeSDK, Message } from './sdk';

const sdk = new KiloCodeSDK('http://localhost:3000');

async function sendChatMessage() {
  const messages: Message[] = [
    { role: 'user', content: 'Hello, how are you?', timestamp: Date.now() },
    { role: 'bot', content: 'I am an AI, so I do not have feelings.', timestamp: Date.now() + 1000 },
    { role: 'user', content: 'Tell me a joke.', timestamp: Date.now() + 2000 },
  ];

  const response = await sdk.chat.sendMessage(messages);

  if (response) {
    console.log('AI Response:', response.response);
  } else {
    console.error('Failed to get AI response.');
  }
}

sendChatMessage();
```

### Authentication Module

The `auth` module provides methods for managing user sessions.

#### `getSession(): Promise<Session | null>`

Retrieves the current user session.

**`Session` Interface:**
```typescript
interface Session {
  user?: User;
  expires: string;
}
```

**`User` Interface:**
```typescript
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
```

**Example:**

```typescript
import { KiloCodeSDK } from './sdk';

const sdk = new KiloCodeSDK('http://localhost:3000');

async function getCurrentSession() {
  const session = await sdk.auth.getSession();

  if (session?.user) {
    console.log('Logged in as:', session.user.name || session.user.email);
  } else {
    console.log('No active session.');
  }
}

getCurrentSession();
```

#### `signIn(provider: string = 'google'): void`

Redirects the user to the sign-in page for the specified provider (defaults to 'google'). This method will cause a full page reload.

**Example:**

```typescript
import { KiloCodeSDK } from './sdk';

const sdk = new KiloCodeSDK('http://localhost:3000');

// To initiate Google sign-in
sdk.auth.signIn('google');
```

#### `signOut(): void`

Redirects the user to the sign-out page. This method will cause a full page reload.

**Example:**

```typescript
import { KiloCodeSDK } from './sdk';

const sdk = new KiloCodeSDK('http://localhost:3000');

// To sign out
sdk.auth.signOut();
```

### User Stats Module

The `stats` module provides methods for retrieving user statistics.

#### `getStats(): Promise<UserStats | null>`

Retrieves overall user statistics.

**`UserStats` Interface:**
```typescript
interface UserStats {
  totalUsers: number;
  activeUsers: number;
  recentUsers: number;
  timestamp: string;
}
```

**Example:**

```typescript
import { KiloCodeSDK } from './sdk';

const sdk = new KiloCodeSDK('http://localhost:3000');

async function getUserStats() {
  const stats = await sdk.stats.getStats();

  if (stats) {
    console.log('Total Users:', stats.totalUsers);
    console.log('Active Users:', stats.activeUsers);
    console.log('Recent Users (last 7 days):', stats.recentUsers);
    console.log('Last Updated:', stats.timestamp);
  } else {
    console.error('Failed to retrieve user stats.');
  }
}

getUserStats();
```

### User Profile Module

The `profile` module provides methods for managing user profiles.

#### `getProfile(userId: string): Promise<UserProfile | null>`

Retrieves a user's profile by their ID.

#### `updateProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile | null>`

Updates a user's profile by their ID with the provided data.

**`UserProfile` Interface:**
```typescript
interface UserProfile {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // Add other profile fields as needed
}
```

**Example:**

```typescript
import { KiloCodeSDK } from './sdk';

const sdk = new KiloCodeSDK('http://localhost:3000');

async function manageUserProfile() {
  const testUserId = 'some-user-id'; // Replace with an actual user ID

  // Get user profile
  const profile = await sdk.profile.getProfile(testUserId);
  if (profile) {
    console.log('User Profile:', profile);
  } else {
    console.error('Failed to get user profile.');
  }

  // Update user profile (e.g., change name)
  const updatedProfile = await sdk.profile.updateProfile(testUserId, { name: 'New User Name' });
  if (updatedProfile) {
    console.log('Updated User Profile:', updatedProfile);
  } else {
    console.error('Failed to update user profile.');
  }
}

manageUserProfile();
```

### Settings Module

The `settings` module provides methods for managing application settings.

#### `getSettings(): Promise<AppSettings | null>`

Retrieves application settings.

#### `updateSettings(settingsData: Partial<AppSettings>): Promise<AppSettings | null>`

Updates application settings with the provided data.

**`AppSettings` Interface:**
```typescript
interface AppSettings {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  // Add other settings fields as needed
}
```

**Example:**

```typescript
import { KiloCodeSDK } from './sdk';

const sdk = new KiloCodeSDK('http://localhost:3000');

async function manageSettings() {
  // Get current settings
  const settings = await sdk.settings.getSettings();
  if (settings) {
    console.log('Current Settings:', settings);
  } else {
    console.error('Failed to get settings.');
  }

  // Update settings (e.g., change theme)
  const updatedSettings = await sdk.settings.updateSettings({ theme: 'dark' });
  if (updatedSettings) {
    console.log('Updated Settings:', updatedSettings);
  } else {
    console.error('Failed to update settings.');
  }
}

manageSettings();
```

### Notification Module

The `notifications` module provides methods for managing user notifications.

#### `getNotifications(): Promise<Notification[] | null>`

Retrieves a list of all notifications for the current user.

#### `markAsRead(notificationId: string): Promise<boolean>`

Marks a specific notification as read.

**`Notification` Interface:**
```typescript
interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: number;
}
```

**Example:**

```typescript
import { KiloCodeSDK } from './sdk';

const sdk = new KiloCodeSDK('http://localhost:3000');

async function manageNotifications() {
  // Get notifications
  const notifications = await sdk.notifications.getNotifications();
  if (notifications) {
    console.log('Notifications:', notifications);
    if (notifications.length > 0) {
      const firstUnread = notifications.find(n => !n.read);
      if (firstUnread) {
        console.log(`Marking notification ${firstUnread.id} as read...`);
        const success = await sdk.notifications.markAsRead(firstUnread.id);
        console.log(`Mark as read successful: ${success}`);
      }
    }
  } else {
    console.error('Failed to get notifications.');
  }
}

manageNotifications();
```

### Blog Module

The `blog` module provides methods for interacting with blog posts.

#### `getPosts(): Promise<BlogPost[] | null>`

Retrieves a list of all blog posts.

#### `getPost(postId: string): Promise<BlogPost | null>`

Retrieves a single blog post by its ID.

**`BlogPost` Interface:**
```typescript
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: number;
}
```

**Example:**

```typescript
import { KiloCodeSDK } from './sdk';

const sdk = new KiloCodeSDK('http://localhost:3000');

async function manageBlogPosts() {
  // Get all blog posts
  const posts = await sdk.blog.getPosts();
  if (posts) {
    console.log('Blog Posts:', posts);
    if (posts.length > 0) {
      // Get a single blog post
      const singlePost = await sdk.blog.getPost(posts[0].id);
      if (singlePost) {
        console.log('Single Blog Post:', singlePost);
      } else {
        console.error('Failed to get single blog post.');
      }
    }
  } else {
    console.error('Failed to get blog posts.');
  }
}

manageBlogPosts();
```