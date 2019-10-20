import * as admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://react-upload-file.firebaseio.com/',
    storageBucket: 'gs://react-upload-file.appspot.com/'
})

export const db = admin.database();
export const bucket = admin.storage().bucket();