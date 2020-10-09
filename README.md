# Pocket Pantry
Okay, here's some quick notes on how to get all this shit up and running.

## Prerequisites
1. Install Node.js. See [nodejs.org](https://nodejs.org/en/download/)
3. Install yarn. See [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
2. Install expo-cli:
	`npm install --global expo-cli`

I *think* thats all you need, I'll have to double check.


## Client Commands

Start the development server
`expo start`

Build the expo distributions:
`expo build:web`
`expo build:android`
`expo build:ios`

Compile and start Electron
`yarn expo-electron start`

Idk how to build electron distributions yet lmao


For most of this, the [expo documentation](docs.expo.io) will be useful.

## Development Notes

The ios, android, and web versions will all be written in javascript with react native.

`foo.js`
To write web specific code, put in `foo.web.js`
To write desktop specific code, put in `foo.electron.js`
