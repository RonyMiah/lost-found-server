import env from 'dotenv'
import path from 'path'

env.config({path: path.join(process.cwd(), '.env')})

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,



}