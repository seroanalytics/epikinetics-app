# base node image

FROM node:21-bullseye-slim AS base

# set for base and all layer that inherit from it

ENV NODE_ENV=production

# Install all node_modules, including dev dependencies

FROM base AS deps

WORKDIR /app

ADD package.json ./
RUN npm install --include=dev

# Setup production node_modules

FROM base AS production-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json ./
RUN npm prune --omit=dev

# Build the app

FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint

FROM base

WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules

COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .

CMD ["npm", "start"]
