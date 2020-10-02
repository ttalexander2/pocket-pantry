# Pocket Pantry
Okay, here's some quick notes on how to get all this shit up and running.

## Prerequisites
1. Install Node.js. See [nodejs.org](https://nodejs.org/en/download/)
2. Install expo-cli:
	`npm install --global expo-cli`

## Clone the repo

    git clone https://github.com/ttalexander2/pocket-pantry.git

## Run the node module installation script

    npm run installer

## Start the development environment

	npm run dev
    
    
This will start the development environment and the Node.Js server. 
The backend server will be running at [localhost:3000](http://localhost:3000). The client can be accessed at [localhost:19002](http://localhost:19002).The expo development interface will automatically rebuild the client interface upon code change. The development version does not need to be changed. The back end serves the built version of the client, and will need to be restarted in order to view changes.

## To run the server

	npm start
  
This will supply the REST api as well as serve the built version of the client. In order to build the client, consider running `npm run build:web`.
