import * as Express from 'express';

export default function hogeController(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    res.send('hoge');
}