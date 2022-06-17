import fetch from 'node-fetch'

export default function handler(req, res) {
    switch (req.method) {
        case 'GET': return get(req, res);
        case 'POST': return post(req, res);
    default:
        res.writeHead(405, { 'Allow': 'GET, POST' });
        res.end();
    }
}

async function get(req, res) {

    const body = req.body;

    const sessionId = body['session_id'];

    if (!sessionId) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: `'session_id' is missing`
        }));
        return;
    }

    const apiRes = await fetch(`${process.env.API_URL}/session/${sessionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const apiResBody = await apiRes.json();

    res.writeHead(apiRes.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(apiResBody));

    return;
}

async function post(req, res) {
    
        const body = req.body;
    
        const sessionId = body['session_id'];
    
        if (!sessionId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: `'session_id' is missing`
            }));
            return;
        }
    
        try {
            const apiRes = await fetch(`${process.env.API_URL}/session/${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user": body['user'],
                    "todo": body['todo']
                })
            });

            const apiResBody = await apiRes.json();
        
            res.writeHead(apiRes.status, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(apiResBody));
        
            return;

        }catch(e) {
            console.log(e);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: `Internal server error`
            }));
            return;
        }
}