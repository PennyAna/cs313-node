var http = require('http');
var url = require('url');

http.createServer(onRequest).listen(8080);

const data = {"name":"Nicole Lawrence", "class":"cs313"};
const showData = String(JSON.stringify(data));

function onRequest(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.write("<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta name='viewport' content='width=device-width,initial-scale=1.0'>	<title>Document</title> </head>");
	res.write("<body>");
	if (req.url == '/getData') {
		res.write("<h1>My Data: </h1><p>");
		res.write(showData);
		res.write("</p>");
	}
	else if (req.url == '/home') {
		res.write("<h1>Welcome to the Home Page</h1>");
	}
	else {
		res.write("<h1>Error: 404</h1><br><p>Page Not Found</p>");
	}
	res.write("<p>Hello Puny Earthlings</p></body> </html>");

	res.end();
}