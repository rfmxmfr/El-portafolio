# Amplify Gen 2 Quick Start

## Option 1: Use the CLI directly

```bash
# Install Amplify libraries
npm install aws-amplify @aws-amplify/ui-react

# Initialize a new Amplify Gen 2 project
npx create-amplify@latest
```

## Option 2: Use the provided scripts

```bash
# Install dependencies
./setup.sh

# Initialize Amplify
./amplify-init.sh
```

## Start the sandbox

```bash
npx amplify sandbox
```

## Update your configuration

After the sandbox starts, update `src/amplifyconfiguration.ts` with the generated values.

## Start your app

```bash
npm run dev
```