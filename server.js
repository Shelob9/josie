var express = require('express');
var path = require('path');

var server = express();
server.use(express.static(__dirname + '/public'));
server.use(express.static(path.join(__dirname, 'public')));

server.get('*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');

});

var port = 10001;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});
