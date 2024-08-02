# Use a lean Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application for SSR production
RUN npm run build

# Expose the port
EXPOSE 4000

# Start the application
CMD [ "node", "dist/pdf-bot/server/server.mjs" ]
