import Express from 'express';
import { db } from './firebase';
import { getDatabaseController } from './controller/database/getDatabaseContller';
import bodyParser from 'body-parser';
import { postStorageController } from './controller/storage/postStorageController';
import multer from 'multer';


const app = Express();
const portNumber = 8000;
const upload = multer({ dest: './uploads/' });

// CORSを許可する
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// post dataを受け取れるようにする
app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.send('file upload api')
});

app.get('/files', getDatabaseController);

app.post('/files', upload.fields([ { name: 'Files' } ]), postStorageController);

app.listen(portNumber, () => {
    console.log(`listen on port ${portNumber}`)
})

export default app;