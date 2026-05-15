FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json ./
RUN pnpm install --no-frozen-lockfile

COPY tsconfig.json ./
COPY src/ src/
RUN pnpm build

FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=builder /app/package.json ./
RUN pnpm install --no-frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
