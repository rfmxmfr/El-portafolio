# AWS Amplify Gen 2 Setup Guide

This guide will help you set up AWS Amplify Gen 2 for your React project.

## Project Structure

```
amplify/
├── auth/
│   └── resource.ts       # Authentication configuration
├── data/
│   └── resource.ts       # Data models and API configuration
├── backend.ts            # Main backend definition
├── package.json          # Backend dependencies
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

1. **Install dependencies**:

```bash
cd amplify
npm install
```

2. **Start the sandbox environment**:

```bash
npm run sandbox
```

3. **Update the configuration**:

After starting the sandbox, Amplify will generate a configuration file. Copy the values to `src/amplifyconfiguration.ts`.

## Deploy to AWS

When you're ready to deploy:

```bash
cd amplify
npm run deploy
```

## Using AI Features

The project includes AI capabilities:

- **Chat**: Use the conversation route for interactive fashion design assistance
- **Generation**: Use the generation route to create fashion design ideas

## Client-Side Integration

```jsx
import { generateAI, conversationAI } from 'aws-amplify/ai';

// For chat
const result = await conversationAI({
  model: 'AIAssistant',
  route: '/chat',
  input: 'Help me design a summer dress'
});

// For generation
const ideas = await generateAI({
  model: 'AIAssistant',
  route: '/generate',
  input: 'Modern minimalist fashion'
});
```

## Learn More

- [Amplify Gen 2 Documentation](https://docs.amplify.aws/react/start/quickstart/)
- [Amplify AI Documentation](https://docs.amplify.aws/react/build-a-backend/generativeai/)