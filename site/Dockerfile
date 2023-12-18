# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.0.14
FROM oven/bun:${BUN_VERSION} as base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install --frozen-lockfile

# Copy application code
COPY --link . .

# Build application
# Build arguments
ARG NEXT_PUBLIC_SITE_URL="https://new.ayoubd.com"
ARG NEXT_PUBLIC_API_URL="https://api.ayoubd.com"
ENV NEXT_TELEMETRY_DISABLED 1
RUN bun run build

# Remove development dependencies
RUN rm -rf node_modules && \
    bun install --ci


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

EXPOSE 3000
CMD [ "bun", "run", "start" ]
