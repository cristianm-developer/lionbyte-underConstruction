from node:20-alpine as builder
workdir /app
copy package*.json ./
run npm install
copy . .
run npm run builder
from node:20-alpine as runner

workdir /app
copy --from=builder /app/node_modules ./node_modules
copy --from=builder /app/.next ./.next
copy --from=builder /app/public ./public
copy --from=builder /app/package*.json ./package.json

expose 3000
cmd ["npm", "start"]