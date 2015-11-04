/**
 * Created by careuno on 28/3/15.
 */

// requerimos express y lo suministramos a un servidor http para manejar las conexiones.
// requerimos socket.io y le suministramos http
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// devolvemos index html
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
// implementamos el evento connection el cual se llamará cada vez que un usuario conecte y el de disconnect
io.on('connection', function(socket){
    console.log('un usuario conectado');
    socket.on('disconnect', function(){
        console.log('usuario desconectado');
    });
    // los mensajes que lleguen al evento mensaje los manejamos por aqui y con io.emit los emitimos a todo el mundo.
    socket.on('mensaje', function(mensaje){
        console.log('mensaje: ' + mensaje);
        io.emit('mensaje', mensaje);
    });
});
// iniciamos el servidor
http.listen(8080, function(){
    console.log('Servidor escuchando en puerto 8080');
});