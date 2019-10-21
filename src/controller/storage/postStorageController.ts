import { Request, Response, NextFunction } from "express";
import { bucket, db } from "../../firebase";
import { util } from "@google-cloud/common";

// storageに画像をアップロードする
export function postStorageController(req: Request, res: Response, next: NextFunction) {
    let path = ''
    let uploadFilePath = ''
    // queryの型を宣言
    const query: { filePaths: string[] } = <{ filePaths: string[] }> req.query;
    console.log(`query:${JSON.stringify(req.query)}`)
    // console.log(`filePaths:${query.filePaths}`)
    req.query.map(filePath =>{
        console.log(`filePath:${filePath}`)
        path = filePath
        uploadFilePath = `files/${filePath}`
        bucket.upload(path, {destination: uploadFilePath}, error => {
            if(error) {
                console.log('failed storage post');
                console.log(error.message);
            } else {
                console.log('success storage post');
                
                // storageに画像をアップロードできた場合は、そのURLをrealtime databaseに保存する
                const STORAGE_ROOT = "https://firebasestorage.googleapis.com/v0/b";
                const bucketName = bucket.name;
                const dlPath = encodeURIComponent(uploadFilePath);
                const dlURL = `${STORAGE_ROOT}/${bucketName}/o/${dlPath}?alt=media`;
    
                db.ref('files').push().set(dlURL , error => {
                    if(error) {
                        console.log('failed database fileURL post');
                    } else {
                        console.log('success database fileURL post');
                    }    
                }
                )
            }    
        })
    })
}