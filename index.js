var express = require('express')
var WebSocketServer = require('ws').Server;
var dgram = require('dgram');
var udpserver = dgram.createSocket('udp4');


//Web Socket 
var wss = new WebSocketServer({port: 40510})
wss.on('connection', function (ws) {
	  ws.on('message', function (message) {
		      console.log('received: %s', message)
		    })

})

//UDP server
udpserver.on('error', (err) => {
	  console.log(`server error:\n${err.stack}`);
	  udpserver.close();
});

udpserver.on('message', (msg, rinfo) => {
	  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
	  ws.send(`${msg}`)
});

udpserver.on('listening', () => {
	  const address = udpserver.address();
	  console.log(`server listening ${address.address}:${address.port}`);
});

//Web Server Setup
var app = express();
app.get('/', function (req, res) {
	    res.sendFile(__dirname + '/ws.html');
})

app.listen(3000, function () {
	  console.log('Example app listening on port 3000!')
})

