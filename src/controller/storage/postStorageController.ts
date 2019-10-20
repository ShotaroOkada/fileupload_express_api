import { Request, Response, NextFunction } from "express";
import { bucket } from "../../firebase";

export function postStorageController(req: Request, res: Response, next: NextFunction) {
    const path = '/Users/ShotaroOkada/Downloads/images.jpeg';
    const filename = 'testImage'
    bucket.upload(path, {destination:`test/${filename}`}, error => {
        if(error) {
            console.log('failed storage post');
            console.log(error.message);
        } else {
            console.log('success storage post');
        }    
    })
}