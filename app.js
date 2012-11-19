
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var group = 'group';
io.sockets.on('connection', function(socket) {
  console.log('connection', socket.id);
  socket.join(group);

  // when one presses play, broadcast play to all
  socket.on('play', function(data) {
    console.log(socket.id, 'pressed play');
    io.sockets.in(group).emit('play');
  });
  socket.on('stop', function(data) {
    console.log(socket.id, 'pressed stop');
    io.sockets.in(group).emit('stop');
  });
});
