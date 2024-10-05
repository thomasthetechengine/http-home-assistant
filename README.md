# http-home-assistant
Node JS Webserver that takes simple HTTP requests, and coverts them to Home Assistant service calls

# Setup
Download project source, and extract the files to a memorable destination.

Edit configuration.json to match your Home Assistant server, and create an API Key

Install all the packages in package.json

Navigate to the directory via Terminal (Or command prompt for windows)

Run `node .`

# Auto restart
If you want the server to auto restart after a crash / error, install forever
`npm install forever -g` 

Then to run the server, in your CLI, type `forever .`

# Usage

HTTP Request can be made from any device & web browser, example:
`http://192.168.0.9:30003/ha/switch.plug2/switch/turn_off?apikey=YOURAPIKEY`

Format:
`http://WEBSERVERIP:PORT/ha/:entity/:domain/:servicetype?apikey=YOURAPIKEY`
