FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm i

FROM node:18-alpine
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]