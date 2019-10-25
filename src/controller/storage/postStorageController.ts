import { Request, Response, NextFunction } from "express";
import { bucket, db } from "../../firebase";
import fs from 'fs';

// storageに画像をアップロードする
export function postStorageController(req: Request, res: Response, next: NextFunction) {
    const files: Express.Multer.File[] = req.files['Files'];
    const STORAGE_ROOT = "https://firebasestorage.googleapis.com/v0/b";
    const bucketName = bucket.name;

    files.forEach(fileInfo => {
        console.log(`fileInfo${JSON.stringify(fileInfo)}`)
        const uploadFilePath = `files/${fileInfo.originalname}`
        console.log(`uploadFilePath:${uploadFilePath}`)
        bucket.upload(fileInfo.path, { destination: uploadFilePath, contentType: fileInfo.mimetype }, error => {
            if (error) {
                console.log(`failed storage post ${fileInfo.originalname}`);
                console.log(error.message);
                return res.sendStatus(404);
            } else {
                console.log(`success storage post ${fileInfo.originalname}`);

                // storageに画像をアップロードできた場合は、そのURLをrealtime databaseに保存する
                const dlPath = encodeURIComponent(uploadFilePath);
                const dlURL = `${STORAGE_ROOT}/${bucketName}/o/${dlPath}?alt=media`;

                db.ref('files').push(dlURL, error => {
                    if (error) {
                        console.log(`failed database post ${uploadFilePath}`);
                        return res.sendStatus(404);
                    } else {
                        console.log(`success database post ${uploadFilePath}`);
                        
                        // 一時的にサーバにおいたファイルを削除
                        fs.unlinkSync(fileInfo.path)
                    }
                }
                )
            }
        })
    })
    setTimeout(() => {
        console.log('send 200')
        return res.sendStatus(200);
    }, 2000)
    // return res.sendStatus(200);
}