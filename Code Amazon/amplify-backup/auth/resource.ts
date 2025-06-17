import { defineAuth } from '@aws-amplify/backend';

// Define authentication
export const auth = defineAuth({
  loginWith: {
    email: true,
    phone: false,
    username: false
  },
  // Optional: Configure multi-factor authentication
  mfa: {
    required: false,
    enabled: true
  }
});