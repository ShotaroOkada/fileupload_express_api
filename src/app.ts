import * as Express from 'express';
import hogeController from './controller/hogeController';

const app = Express();
const portNumber = 3000;

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/hoge', hogeController)

app.listen(portNumber, () => {
    console.log('listen on port 3000')
})

export default app;