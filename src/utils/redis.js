import { Tedis } from 'tedis'

const getClient = () => new Tedis({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
    tls:{}
})

const getValue = async (key) => {
    const client = getClient()
    const ex = await client.exists(key)
    if (ex > 0) {
        const value = await client.get(key)
        return value
    }
    return null
}
const setExpValue = async (key,exp,value) => {
    const client = getClient()
    
    return client.setex(key, exp, value)
}

export {
    getValue,
    getClient,
    setExpValue
}