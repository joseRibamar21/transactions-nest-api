FROM node:slim AS builder

WORKDIR /app

COPY package*.json ./
COPY yarn.lock* ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:slim AS production

WORKDIR /app

COPY package*.json ./
COPY yarn.lock* ./

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
