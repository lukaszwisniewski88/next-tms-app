import { Client } from 'faunadb'

export default function GetFaunaClient () {
    
    return  new Client({
         secret:process.env.FAUNA_SECRET
    })
}