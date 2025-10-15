FROM node:20-alpine

# Set production environment
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install dependencies using the lockfile for reproducible builds
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Run as non-root for better security
USER node

# Start the server
CMD ["node", "server.js"]

