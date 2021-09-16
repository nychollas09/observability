const elasticApmAgent = require('elastic-apm-node');
const express = require('express');
const http = require('http');

elasticApmAgent.start({
    serviceName: 'my-api-nodejs',
    serverUrl: 'http://localhost:8200',
    // logLevel: 'debug'
})

const app = express();

app.get("/", (_, response) => {
    return response.json({ message: "Apm Observability" });
})

app.listen(3000, () => {
    console.log("Node Api is running on port 3000");
});

setInterval(() => {
    const request = http.get({ 
        host: 'localhost',
        port: 3000,
        path: '/',
     }, (response) => {
         response.on("data", (data) => {
            console.log(data.toString())
         })
     });

     request.end();
}, 3000);