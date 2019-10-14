import Express from 'express';
import * as admin from 'firebase-admin'
import { getFilesController, postFilesController } from './controller/filesController';

const app = Express();
const portNumber = 3001;

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://react-upload-file.firebaseio.com/'
})

export const db = admin.database();

app.get('/', (_req, res) => {
    res.send('hello world')
    db.ref('files').ref.on("value", response => {
    console.log(response.val());
    }, 
    errorObject => {
    console.log("The read failed: " + errorObject.code);
    });
});

app.get('/files', getFilesController);

app.post('/files', postFilesController);


app.listen(portNumber, () => {
    console.log(`listen on port ${portNumber}`)
})

export default app;