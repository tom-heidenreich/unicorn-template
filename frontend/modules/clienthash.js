import Cookies from 'cookies'
import { randomUUID, createHash } from 'crypto';

export default function clientHash(context) {

    const req = context.req;

    const cookies = new Cookies(context.req, context.res)

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const id = randomUUID()
    
    cookies.set('session', id, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'strict',
    })

    const hashString = 'Kn575A6rb7' + ip + userAgent + id + 'tI4UyNgjFB';
    const hash = Buffer.from(hashString.split('').reduce((a,b) => { a=((a<<5)-a)+b.charCodeAt(0); return a&a }, 0).toString(36), 'base64').toString();

    return hash;
}