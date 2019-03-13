import * as fs from 'fs';
import { ServerOptions } from 'https';

export function options(): ServerOptions {
    return {
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT)
    };
}