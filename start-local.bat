@echo off
echo Starting development server...

:: Check if node_modules exists
if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
)

:: Start the development server
call npm run dev -- --open