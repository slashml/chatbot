// Interfaces
export interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

export interface ChatResponse {
  response: string;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
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

// Main SDK Class
export class KiloCodeSDK {
  public chat: ChatModule;
  public auth: AuthModule;

  constructor(baseUrl: string) {
    this.chat = new ChatModule(baseUrl);
    this.auth = new AuthModule(baseUrl);
  }
}