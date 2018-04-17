var express = require('express');
var app = express();
var server= require('http').createServer(app);
var io = require('socket.io').listen(server);
users= [];
connections = [];

console.log('working');


app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});
console.log('ready , socket connect');
io.sockets.on('connection', function(socket){
console.log('socket connecct tested')  
    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length);

//disconnect
socket.on('disconnect', function(data){
    users.splice(users.indexOf(socket.username),1);
    updateusernames();
    connections.splice(connections.indexOf(socket),1);
    console.log('disconnected: %s socket disconnect', connections.length);    
}); 
//send message
socket.on('send message', function(data){
    console.log(data);
    io.sockets.emit('new message',{msg:data, })
});
socket.on('new user', function(data, callback){
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateusernames();
});
 function updateusernames(){
     io.sockets.emit('get users',users)
 }
});
console.log('server running!!!!!');

server.listen(process.env.PORT||3000);

