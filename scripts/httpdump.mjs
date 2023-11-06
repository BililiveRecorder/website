import { createServer } from 'http';

/**
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function requestListener(req, res) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    res.writeHead(200);
    res.end('Hello, World!');
    console.log(`===== \x1B[0;31mNEW REQUEST\x1B[0m == \x1B[0;36m${new Date().toISOString()}\x1B[0m =====
${req.method} ${req.url}
${req.rawHeaders.map((v, i) => i % 2 ? v + '\n' : v + ': ').join('')}
${body}
`);
  });
}

const server = createServer(requestListener);
console.log('listening on 8080');
server.listen(8080);
