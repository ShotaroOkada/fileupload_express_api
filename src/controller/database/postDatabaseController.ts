import { Request, Response, NextFunction } from 'express';
import { db } from '../../firebase';

// dbにファイルを保存する
export function postDatabaseController(req: Request, res: Response, next: NextFunction) {
    db.ref('files').update({
        "b1016117": {
            name: 'hoge'
        }
    } , error => {
        if(error) {
            console.log('failed database post');
        } else {
            console.log('success database post');
        }    
    }
    )
}