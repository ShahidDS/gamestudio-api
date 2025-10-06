FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S api -u 1001

# Change ownership
RUN chown -R api:nodejs /app
USER api

EXPOSE 3000

CMD ["node", "server.js"]