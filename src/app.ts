import Express from 'express';
import { db } from './firebase';
import { getDatabaseController } from './controller/database/getDatabaseContller';
import { postDatabaseController } from './controller/database/postDatabaseController';
import { postStorageController } from './controller/storage/postStorageController';

const app = Express();
const portNumber = 8000;

// CORSを許可する
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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

app.post('/files', postDatabaseController);

app.get('/storage', postStorageController);


app.listen(portNumber, () => {
    console.log(`listen on port ${portNumber}`)
})

export default app;