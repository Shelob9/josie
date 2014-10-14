var express = require('express');

var server = express();
server.use(express.static(__dirname + '/public'));


server.get('*', function(req, res){
    if ( req.accepts( 'html' ) ) {
        res.sendFile( __dirname + '/public/index.html');
    }

});

var port = 10001;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});
