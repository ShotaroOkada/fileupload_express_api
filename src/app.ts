import Express from 'express';
import * as admin from 'firebase-admin'
import hogeController from './controller/hogeController';

const app = Express();
const portNumber = 3000;

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://react-upload-file.firebaseio.com/'
})

export const db = admin.database();

app.get('/', (_req, res) => {
    res.send('hello world')
    db.ref('username').ref.on("value", response => {
    console.log(response.val());
    }, 
    errorObject => {
    console.log("The read failed: " + errorObject.code);
    });
});

app.get('/hoge', hogeController)

app.get('/put', (req, res) => {
    db.ref().update({
        puttest: 'hoge'
      });
})

app.listen(portNumber, () => {
    console.log(`listen on port ${portNumber}`)
})

export default app;