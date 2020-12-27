import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { resolve } from "path";

const extensions = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
    '.mp3',
    '.mp4',
];

const resolvePath = (file: string) => resolve(`./client/dist/TTS-Client/${file}`);


export class ClientMiddleware implements NestMiddleware {
    public use(req: Request, res: Response, next: NextFunction) {
        const reqUrl = req.headers.referer;
        console.log(reqUrl);

        if (process.env.NODE_ENV === 'production' && !reqUrl?.startsWith('https'))
           return res.redirect(reqUrl.replace("http", "https"));
       
        const { baseUrl: url } = req;

        if (url.startsWith('/api')) {
            // it starts with /api --> continue with execution
            next();
        }
        else if (extensions.filter(ext => url.indexOf(ext) > 0).length > 0) {
            // it has a file extension --> resolve the file
            res.sendFile(resolvePath(url));
        }
        else {
            // in all other cases, redirect to the index.html!
            res.sendFile(resolvePath('index.html'));
        }
    }
}
