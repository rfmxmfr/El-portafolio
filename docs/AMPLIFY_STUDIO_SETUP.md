# Setting Up AWS Amplify Studio

This guide explains how to set up and configure AWS Amplify Studio for your Fashion Portfolio project.

## Prerequisites

- AWS account with appropriate permissions
- AWS CLI installed and configured
- Node.js and npm installed

## Setup Instructions

1. Make the configuration script executable:

```bash
chmod +x configure-amplify-studio.sh
```

2. Run the configuration script:

```bash
./configure-amplify-studio.sh
```

3. Follow the prompts during the setup process.

## What the Script Does

The `configure-amplify-studio.sh` script automates the following tasks:

- Checks for required tools (AWS CLI, Amplify CLI)
- Installs necessary dependencies
- Initializes Amplify Studio if not already set up
- Configures authentication with Amazon Cognito
- Sets up an AppSync GraphQL API
- Configures S3 storage for design images
- Enables Amplify Studio UI features
- Creates a custom theme for your UI components
- Updates your React application to use Amplify Studio

## Using Amplify Studio

After setup is complete, you can:

1. Open Amplify Studio locally:

```bash
amplify studio
```

2. Design UI components visually in the Amplify Studio interface
3. Generate and export UI components:

```bash
amplify pull
```

4. Import and use the generated components in your React application:

```jsx
import { MyComponent } from './ui-components';

function App() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}
```

## Customizing UI Components

You can customize the theme in `src/amplify-studio-config.js` to match your brand:

```js
export const studioTheme = createTheme({
  name: 'fashion-portfolio-theme',
  tokens: {
    colors: {
      brand: {
        primary: { value: '#YOUR_PRIMARY_COLOR' },
        secondary: { value: '#YOUR_SECONDARY_COLOR' }
      },
      // Add more customizations here
    }
  }
});
```

## Troubleshooting

If you encounter issues:

1. Ensure AWS CLI is properly configured with `aws configure`
2. Check Amplify status with `amplify status`
3. View Amplify logs with `amplify console`
4. For authentication issues, check Cognito settings in the AWS Console