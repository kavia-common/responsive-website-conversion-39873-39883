#!/bin/bash
cd /home/kavia/workspace/code-generation/responsive-website-conversion-39873-39883/responsive_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

