#!/bin/bash
cd /home/kavia/workspace/code-generation/tic-tac-toe-online-27963-27982/frontend_next_js
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

