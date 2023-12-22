import crypto from 'crypto'

export const PORT = 8080
export const MONGODB_STR_CNX = 'mongodb+srv://rahumadab17:Coder12345@codercluster.5x64qjw.mongodb.net/sessions'
export const MONGODB_STR_CNX_DB = 'mongodb+srv://rahumadab17:Coder12345@codercluster.5x64qjw.mongodb.net/'
export function createSalt () {
    return crypto.randomBytes(128).toString('base64')
}

export const encriptedString = (salt, pass) => {
    return crypto.createHmac('sha256', salt).update(pass).digest('hex')
}

export const githubAppId = '730208'
export const githubClienteId = 'Iv1.821c91947bc12f1b'
export const githubClienteSecret = '4250ac5d2f4cbb05b2e1c1c15024abd649f0fc67'
export const githubCallbackUrl = 'http://localhost:8080/githubcallback'

/* App ID: 730208

Client ID: Iv1.821c91947bc12f1b

4250ac5d2f4cbb05b2e1c1c15024abd649f0fc67 */