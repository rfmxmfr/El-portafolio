# Amplify AI Integration

This directory contains the AWS Amplify configuration for the Fashion Portfolio application, including AI capabilities.

## Structure

- `data/resource.ts` - Defines the data models and AI routes
- `data/function/` - Contains the Lambda functions for AI capabilities
- `amplify.yml` - CI/CD configuration for Amplify

## AI Capabilities

The application includes two AI capabilities:

1. **Conversation** - Chat with an AI assistant about fashion design
2. **Generation** - Generate fashion design ideas

## Getting Started

### Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the Amplify sandbox:
   ```
   npm run amplify:sandbox
   ```

3. Test the AI capabilities in the sandbox environment.

### Deployment

1. Deploy to AWS:
   ```
   npm run amplify:deploy
   ```

2. Update the `src/amplify-config.js` file with the actual values from the deployment.

## Adding to Your React Components

Import and use the AI components in your React application:

```jsx
import AIFashionAssistant from './components/AIFashionAssistant';

function MyPage() {
  return (
    <div>
      <h1>Fashion Design AI</h1>
      <AIFashionAssistant />
    </div>
  );
}
```