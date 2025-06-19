#!/bin/bash

# Initialize Amplify Gen 2 project
npx create-amplify@latest

# Follow the prompts:
# 1. Choose "React" as your framework
# 2. Select "Add authentication" and "Add data"
# 3. For data, select "Create a model" and follow the prompts

echo "Amplify Gen 2 initialized!"
echo "Run 'npx amplify sandbox' to start the local sandbox"