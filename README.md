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
`http://192.168.0.9:30003/ha/switch.plug2/switch/turn_on?apikey=YOURAPIKEY`

Format:
`http://WEBSERVERIP:PORT/ha/:entity/:domain/:servicetype?apikey=YOURAPIKEY`

Properties of an entity can also be changed with your service call, example:

`http://192.168.0.9:30003/ha/switch.plug2/switch/turn_on?apikey=YOURAPIKEY&property=color_temp_kelvin&value=2700`

# Use cases

I quickly developed this plugin so I could trigger relays from my Yealink T46Us and T48Us around my house, since the Line Keys (also known as DSS or Shortcut keys) can send basic HTTP get requests.

Its not the most secure way of going about it, since the API Key is the only form of protection against unauthorised requests, which isn't a problem providing you do not port forward this server.
