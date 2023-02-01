FROM node:14

# Set the working directory in the container to /app
WORKDIR /client

# Copy the package.json file to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the rest of the app's files to the container
COPY . . 

# Specify the command to run when the container starts
CMD ["npm", "run", "dev"]