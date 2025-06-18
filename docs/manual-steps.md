# Manual Steps to Set Up Amplify Gen 2

If the script doesn't work, follow these manual steps:

## 1. Install Amplify Library

```bash
npm install --save aws-amplify
```

## 2. Initialize Amplify Gen 2

```bash
npx -y create-amplify
```

Follow the prompts:
- Choose React as your framework
- Select the features you want (Auth, Data, etc.)

## 3. Start the Sandbox

```bash
npx amplify sandbox
```

## 4. Update Configuration

After the sandbox starts, it will generate configuration values.

Create or update `src/amplifyconfiguration.ts` with:

```typescript
export const amplifyconfiguration = {
  // Copy values from the sandbox output
};
```

## 5. Update Your Main File

In `src/main.jsx`:

```jsx
import { Amplify } from 'aws-amplify';
import { amplifyconfiguration } from './amplifyconfiguration';

// Configure Amplify
Amplify.configure(amplifyconfiguration);
```

## 6. Start Your App

```bash
npm run dev
```