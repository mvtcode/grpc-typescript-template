ARG NODE_VERSION=14.19.3-alpine3.16

##### Building stage #####
FROM node:${NODE_VERSION} As builder

WORKDIR /app

# Install dependencies for build package C of node
# RUN apk update && \
#   apk --no-cache add make g++ gcc && \
#   rm -rf /var/lib/apt/lists/*

COPY . .

RUN npm i
RUN npm run build

##### Building the final image #####
FROM node:${NODE_VERSION}

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
CMD ["npm", "start"]