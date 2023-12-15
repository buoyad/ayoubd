FROM oven/bun:alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# the bun image already has this
# RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app


COPY --from=builder --chown=bun:bun /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=bun:bun /app/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static

USER bun
EXPOSE 3000/tcp
ENV NODE_ENV=production
CMD ["node", "server.js"]