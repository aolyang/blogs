#!/usr/bin/env bash
pm2 stop aolyang.me
git pull
pnpm build
pm2 restart aolyang.me
