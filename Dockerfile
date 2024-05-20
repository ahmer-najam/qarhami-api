# NEW VERSION
# Base image
FROM node:18-alpine as build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

#---OLD VERSION

# FROM node:18-alpine as builder

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./

# # RUN npm ci --production
# RUN npm install

# COPY . .

# RUN npm run build

# FROM node:18-alpine

# ENV NODE_ENV production
# USER node

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./

# # RUN npm ci --production
# RUN npm install

# COPY --from=builder /usr/src/app/dist ./dist

# CMD [ "node", "dist/main.js" ]