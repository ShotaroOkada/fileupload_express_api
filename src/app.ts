import Express from 'express';
import { db } from './firebase';
import { getDatabaseController } from './controller/database/getDatabaseContller';
import bodyParser from 'body-parser';

const app = Express();
const portNumber = 8000;

// CORSを許可する
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// post dataを受け取れるようにする
app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.send('hello world')
    db.ref('files').ref.on("value", response => {
    console.log(response.val());
    }, 
    errorObject => {
    console.log("The read failed: " + errorObject.code);
    });
});

app.get('/files', getDatabaseController);

// app.post('/files', postStorageController);

app.post('/files', (req, res) => {
  console.log(`body:${JSON.stringify(req.body)}`)
  console.log(`query:${JSON.stringify(req.query)}`)
})


app.listen(portNumber, () => {
    console.log(`listen on port ${portNumber}`)
})

export default app;