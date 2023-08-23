/** @module Server */ import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
const port = parseInt(process.env.PORT ?? '3000', 10);
const hostname = 'localhost';
const dev = process.env.NODE_ENV !== 'production';
const app = next({
    dev,
    hostname,
    port
});
const handle = app.getRequestHandler();
// Initialize
Object.defineProperty(global, 'myvar', {
    value: {
        test: true
    },
    configurable: true
});
// Server
app.prepare().then(()=>{
    createServer((req, res)=>{
        try {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl).catch((err)=>{
                console.error(err);
                res.statusCode = 500;
                res.end('Internal server error');
            });
        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Internal server error');
        }
    }).listen(port);
    console.info(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
}).catch(console.error);
// Clean
const handleExit = (code)=>{
    console.info('> Server stopped');
    process.exit(code);
};
process.on('exit', (code)=>handleExit(code));

//# sourceMappingURL=index.js.map