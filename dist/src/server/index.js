import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
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
app.prepare().then(()=>{
    createServer((req, res)=>{
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl).catch((err)=>{
                console.error('Error occurred handling', req.url, err);
                res.statusCode = 500;
                res.end('internal server error');
            });
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    }).once('error', (err)=>{
        console.error(err);
        process.exit(1);
    }).listen(port, ()=>{
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});

//# sourceMappingURL=index.js.map