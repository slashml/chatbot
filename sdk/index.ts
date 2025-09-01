// Interfaces
export interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

export interface ChatResponse {
  response: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  // Add other settings fields as needed
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: number;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: number;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  recentUsers: number;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // Add other profile fields as needed
}

export interface Session {
  user?: User;
  expires: string;
}

// AuthModule
export class AuthModule {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getSession(): Promise<Session | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/session`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const session: Session = await response.json();
      return session;
    } catch (error) {
      console.error("Error fetching session:", error);
      return null;
    }
  }

  public signIn(provider: string = 'google'): void {
    window.location.href = `${this.baseUrl}/api/auth/signin/${provider}`;
  }

  public signOut(): void {
    window.location.href = `${this.baseUrl}/api/auth/signout`;
  }
}

// ChatModule
export class ChatModule {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async sendMessage(messages: Message[]): Promise<ChatResponse | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const chatResponse: ChatResponse = await response.json();
      return chatResponse;
    } catch (error) {
      console.error("Error sending message:", error);
      return null;
    }
  }
}

// UserStatsModule
export class UserStatsModule {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getStats(): Promise<UserStats | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/users/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const stats: UserStats = await response.json();
      return stats;
    } catch (error) {
      console.error("Error fetching user stats:", error);
      return null;
    }
  }
}

// SettingsModule
export class SettingsModule {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getSettings(): Promise<AppSettings | null> {
    try {
      console.log('Fetching application settings...');
      const response = await fetch(`${this.baseUrl}/api/settings`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const settings: AppSettings = await response.json();
      return settings;
    } catch (error) {
      console.error("Error fetching settings:", error);
      return null;
    }
  }

  public async updateSettings(settingsData: Partial<AppSettings>): Promise<AppSettings | null> {
    try {
      console.log('Updating application settings:', settingsData);
      const response = await fetch(`${this.baseUrl}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedSettings: AppSettings = await response.json();
      return updatedSettings;
    } catch (error) {
      console.error("Error updating settings:", error);
      return null;
    }
  }
}

// UserProfileModule
export class UserProfileModule {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      // Placeholder for API call to get user profile
      console.log(`Fetching profile for user: ${userId}`);
      const response = await fetch(`${this.baseUrl}/api/users/${userId}/profile`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const profile: UserProfile = await response.json();
      return profile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }

  public async updateProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      // Placeholder for API call to update user profile
      console.log(`Updating profile for user: ${userId}`, profileData);
      const response = await fetch(`${this.baseUrl}/api/users/${userId}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedProfile: UserProfile = await response.json();
      return updatedProfile;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return null;
    }
  }
}

// Main SDK Class
export class KiloCodeSDK {
  public chat: ChatModule;
  public auth: AuthModule;
  public stats: UserStatsModule;
  public profile: UserProfileModule;
  public settings: SettingsModule;

  constructor(baseUrl: string) {
    this.chat = new ChatModule(baseUrl);
    this.auth = new AuthModule(baseUrl);
    this.stats = new UserStatsModule(baseUrl);
    this.profile = new UserProfileModule(baseUrl);
    this.settings = new SettingsModule(baseUrl);
  }
}