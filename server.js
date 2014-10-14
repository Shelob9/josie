var express = require('express');

var server = express();
server.use(express.static(__dirname + '/public'));
server.use('/js', express.static(__dirname + '/public/js'));
server.use('/img', express.static(__dirname + '/public/img'));
server.use('/css', express.static(__dirname + '/public/css'));
//server.use('/partials', express.static(__dirname + '/public/partials'));
//server.use('/templates', express.static(__dirname + '/public/templates'));

server.get('*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');

});

var port = 10001;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});
