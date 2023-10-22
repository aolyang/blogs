#!/usr/bin/env bash
git checkout -f
pm2 stop aolyang.me
git pull
pnpm build
pm2 restart aolyang.me
