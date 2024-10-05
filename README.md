# http-home-assistant
Node JS Webserver that takes simple HTTP requests, and coverts them to Home Assistant service calls

# Setup
Download project source, and extract the files to a memorable destination.

Install all the packages in package.json

Navigate to the directory via Terminal (Or command prompt for windows)

Run `node .`

# Auto restart
If you want the server to auto restart after a crash / error, install forever
`npm install forever -g` 

Then to run the server, in your CLI, type `forever .`
