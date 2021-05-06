import { Tedis } from 'tedis'

const getClient = () => new Tedis({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
    tls:{}
})

const getValue = async (key) => {
    const redis = getClient()
    const ex = await redis.exists(key)
    if (ex > 0) {
        const value = await redis.get(key)
        return value
    }
    return null
}
const setExpValue = async (key,exp,value) => {
    const redis = getClient()
    return redis.setex(key, exp, value)
}

export {
    getValue,
    getClient,
    setExpValue
}