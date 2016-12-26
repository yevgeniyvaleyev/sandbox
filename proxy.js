var http = require('http');

http.createServer(function(request, response) {

var proxy = http.createClient(9777, 'localhost');
var proxy_request = proxy.request(request.method, request.url, request.headers);

    console.log('REQUEST METHOD : ' + request.method + ', URL :', request.url);

    proxy_request.addListener('response', function(proxy_response) {
        proxy_response.addListener('data', function(chunk) {
            response.write(chunk, 'binary');
        });
        proxy_response.addListener('end', function() {
            response.end();
        });

        if ('OPTIONS' == proxy_response.connection._httpMessage.method) {
            proxy_response.statusCode = 200;
        }

        proxy_response.headers['Access-Control-Allow-Origin'] = '*';
        proxy_response.headers['Access-Control-Allow-Headers'] = 'x-requested-with, authorization';
        proxy_response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';

        response.writeHead(proxy_response.statusCode, proxy_response.headers);
    });
    request.addListener('data', function(chunk) {
        proxy_request.write(chunk, 'binary');
    });
    request.addListener('end', function() {
        proxy_request.end();
    });
}).listen(8888);
