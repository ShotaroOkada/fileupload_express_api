import { Request, Response, NextFunction } from 'express';
import { db } from '../../firebase';

// dbに保存されたファイルURLを取得する
export function getDatabaseController(req: Request, res: Response, next: NextFunction) {
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