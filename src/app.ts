import Express from 'express';
import * as admin from 'firebase-admin'
import hogeController from './controller/hogeController';

const app = Express();
const portNumber = 3000;

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://react-upload-file.firebaseio.com/'
})

const db = admin.database();
const ref = db.ref();


app.get('/', (req, res) => {
    res.send('hello world')
    ref.on("value", response => {
    console.log(response.val());
    }, 
    function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    });
});

app.get('/hoge', hogeController)

app.listen(portNumber, () => {
    console.log('listen on port 3000')
})

export default app;