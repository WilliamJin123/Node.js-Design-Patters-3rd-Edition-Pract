import crypto from 'crypto'

const SECRET_KEY = crypto.randomBytes(32);

export default SECRET_KEY