//import { createRequire } from "module";
//const require = createRequire(import.meta.url)
var config = require('./configuration.json');
const Homeassistant = require('node-homeassistant')
const fs = require('fs')
var express = require("express");
var app = express();

var Cache = {} // Cahced devices and joins
var HACache = {}
var EntGot = false

// Auto configuration updater
var ConfigCooldown = false
fs.watch("configuration.json", (eventType, filename) => {
    if (eventType === "change") {
        if (ConfigCooldown === true) return
        (async function () {
            const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
            ConfigCooldown = true
            await sleep(300)
            if (config.Debug) { console.log("Updating config from configuration.json") } // Debug output
            delete require.cache[require.resolve('./configuration.json')]
            config = require('./configuration.json');
            Cache = {}
            EntGot = false
            await sleep(1000)
            ConfigCooldown = false
        })()
    }
});



let ha = new Homeassistant({ // Log into HA
    host: config.HomeAssistantConfig.Host,
    protocol: config.HomeAssistantConfig.Protocol, // "ws" (default) or "wss" for SSL
    retryTimeout: 1000, // in ms, default is 5000
    retryCount: 3, // default is 10, values < 0 mean unlimited
    //password: 'http_api_password', // api_password is getting depricated by home assistant
    token: config.HomeAssistantConfig.Token, // for now both tokens and api_passwords are suported
    port: config.HomeAssistantConfig.Port
})



// Connecting to HA
ha.connect().then(async () => {
    console.log(`Home Assistant | Connected to ${config.HomeAssistantConfig.Host} on port ${config.HomeAssistantConfig.Port}`)
    if (config.EntityGet !== "" && EntGot === false) {
        EntGot = true
        var content = ha.state(config.EntityGet)
        if (content !== "undefined" && typeof content !== "undefined") {
            if (content !== "undefined" && typeof content !== "undefined" && typeof content['state'] !== "undefined" && content.state === "off") {
                console.log("The EntityGet Device is currently in the off state, meaning some attributes will appear as null.")
            }
            fs.writeFile(config.EntityGet + ".txt", JSON.stringify(content, null, 2), err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Entity info for ${config.EntityGet} has been written to ${config.EntityGet}.txt`)
                }
            });
            if (config.Debug === true) {
                console.log(content)
            }
        }
    }



    app.get("/ha/:entity/:domain/:servicetype", async function (req, res) {
        var params = req.params;
        var qer = req.query;
        if((qer.apikey && qer.apikey === config.WebServerConfig.WebKey) && (params.entity && params.domain && params.servicetype)){
            var Data = {
                domain: params.domain,
                service: params.servicetype,
                target: {
                    "entity_id": params.entity
                },
            }
            if(qer.property && qer.value){
                Data.service_data = {
                    [qer.property]: qer.value,
                }
            }
            ha.call(Data).then(res2 => {
                if (config.Debug) {
                    console.log("Call feedback: ", res2)
                }
                if(res2.success){
                    res.sendStatus(200)
                }else{
                    res.sendStatus(400)
                }
            })
        }else{
            res.sendStatus(401)
        }
        
    
    });

    app.listen(config.WebServerConfig.Port);
    console.log("Express started on port %d", config.WebServerConfig.Port);
})




