#!/usr/bin/env bash
set -ex
if [ ! -d "/app/node_modules" ]
then
    npm install
fi
npm run docker:storybook