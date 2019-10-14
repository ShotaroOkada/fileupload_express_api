import Express, { Request, Response, NextFunction } from 'express';
import { db } from '../app';

// dbに保存されたファイルを取得する
export function getFilesController(req: Request, res: Response, next: NextFunction) {
    req.query
    db.ref('files').ref.on("value", response => {
        console.log(response.val());
        res.send(response.val());
        }, 
        errorObject => {
        console.log("The read failed: " + errorObject.code);
        res.send(404);
        });
}

// dbにファイルを保存する
export function postFilesController(req: Request, res: Response, next: NextFunction) {
    db.ref('files').update({
        "b1016117": {
            name: 'hoge'
        }
    } , error => {
        if(error) {
            console.log('failed files post');
        } else {
            console.log('success files post');
        }    
    }
    )
}