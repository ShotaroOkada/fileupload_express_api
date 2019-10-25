import { Request, Response, NextFunction } from "express";
import { bucket, db } from "../../firebase";
import { util } from "@google-cloud/common";

// storageに画像をアップロードする
export function postStorageController(req: Request, res: Response, next: NextFunction) {
    const files: Express.Multer.File[] = req.files['Files']
    let uploadFilePath = ''
    
    files.forEach(fileInfo =>{
        uploadFilePath = `files/${fileInfo.originalname}`
        bucket.upload(fileInfo.path, {destination: uploadFilePath}, error => {
            if(error) {
                console.log('failed storage post');
                console.log(error.message);
                res.sendStatus(404);
                return;
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
                        res.sendStatus(404);
                        return;
                    } else {
                        console.log('success database fileURL post');
                    }    
                }
                )
            }    
        })
    })
    return res.sendStatus(200);
}