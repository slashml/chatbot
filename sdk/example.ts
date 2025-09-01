import { KiloCodeSDK, Message } from './index';

// Initialize the SDK with your base URL
const sdk = new KiloCodeSDK('http://localhost:3000'); // Replace with your actual base URL

async function runChatExample() {
  console.log('--- Chat Example ---');
  const messages: Message[] = [
    { role: 'user', content: 'Hello, how are you?', timestamp: Date.now() },
  ];

  const chatResponse = await sdk.chat.sendMessage(messages);

  if (chatResponse) {
    console.log('AI Response:', chatResponse.response);
  } else {
    console.log('Failed to get AI response.');
  }

  // Example with conversation history
  const conversation: Message[] = [
    { role: 'user', content: 'What is the capital of France?', timestamp: Date.now() - 10000 },
    { role: 'bot', content: 'The capital of France is Paris.', timestamp: Date.now() - 5000 },
    { role: 'user', content: 'And what about Germany?', timestamp: Date.now() },
  ];

  const followUpResponse = await sdk.chat.sendMessage(conversation);
  if (followUpResponse) {
    console.log('AI Follow-up Response:', followUpResponse.response);
  } else {
    console.log('Failed to get AI follow-up response.');
  }
}

async function runAuthExample() {
  console.log('\n--- Authentication Example ---');

  // Get current session
  const session = await sdk.auth.getSession();
  if (session?.user) {
    console.log('Current User:', session.user.name || session.user.email);
    console.log('Session Expires:', session.expires);
  } else {
    console.log('No active session.');
  }

  // Note: signIn and signOut will redirect the browser, so they are commented out for direct execution.
  // To test them, uncomment and run in a browser environment.

  // console.log('Attempting to sign in...');
  // sdk.auth.signIn('google'); // This will redirect to Google login

  // console.log('Attempting to sign out...');
  // sdk.auth.signOut(); // This will redirect to sign out
}

// User Stats Example
async function runStatsExample() {
  console.log('\n--- User Stats Example ---');
  const stats = await sdk.stats.getStats();
  if (stats) {
    console.log('User Stats:', stats);
  } else {
    console.log('Failed to get user stats.');
  }
}

// Run the examples
// User Profile Example
async function runProfileExample() {
  console.log('\n--- User Profile Example ---');
  const testUserId = 'user123'; // Replace with a valid user ID for testing

  // Get user profile
  const profile = await sdk.profile.getProfile(testUserId);
  if (profile) {
    console.log('User Profile:', profile);
  } else {
    console.log('Failed to get user profile.');
  }

  // Update user profile
  const updatedProfile = await sdk.profile.updateProfile(testUserId, { name: 'Jane Doe' });
  if (updatedProfile) {
    console.log('Updated User Profile:', updatedProfile);
  } else {
    console.log('Failed to update user profile.');
  }
}

runChatExample();
runAuthExample();
runStatsExample();
runProfileExample();