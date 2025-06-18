# AWS Amplify Gen 2 Setup

This project uses AWS Amplify Gen 2 for backend services and AI capabilities.

## Quick Start

1. **Setup the project**:
   ```bash
   ./setup-amplify-gen2.sh
   ```

2. **Start the sandbox**:
   ```bash
   cd amplify && npm run sandbox
   ```

3. **Update configuration**:
   Copy the generated values to `src/amplifyconfiguration.ts`

4. **Start your app**:
   ```bash
   npm run dev
   ```

## Project Structure

- `amplify/` - Backend code
  - `auth/` - Authentication configuration
  - `data/` - Data models and API
  - `data/function/` - AI function handlers
  - `backend.ts` - Main backend definition

## AI Features

This project includes two AI capabilities:

1. **Chat** - Interactive conversation with an AI fashion assistant
2. **Generate** - Create fashion design ideas based on prompts

## Using AI in Components

```jsx
import { AIFashionAssistant } from './components/AIFashionAssistant';

function MyPage() {
  return (
    <div>
      <h1>Fashion Design AI</h1>
      <AIFashionAssistant />
    </div>
  );
}
```

## Deployment

When ready to deploy:

```bash
cd amplify && npm run deploy
```

## Learn More

- [Amplify Gen 2 Documentation](https://docs.amplify.aws/react/start/quickstart/)
- [Amplify AI Documentation](https://docs.amplify.aws/react/build-a-backend/generativeai/)