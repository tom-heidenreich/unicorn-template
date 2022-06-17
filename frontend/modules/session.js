import clientHash from "./clienthash"

export function getSession(context) {
    return new Promise(async(resolve) => {

        const client = clientHash(context)

        const apiRes = await fetch(`${process.env.API_URL}/session/${client}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if(apiRes.status === 200) {
            const json = await apiRes.json()
            resolve(json)
        }

        resolve(null)
    })
}