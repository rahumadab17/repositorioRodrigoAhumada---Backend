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
