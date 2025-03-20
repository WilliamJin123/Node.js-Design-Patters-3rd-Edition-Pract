import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import {Level} from 'level'
import { levelSubscribe } from './level-subscribe.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'db')
const db =  new Level(dbPath, { valueEncoding: 'json' })
levelSubscribe(db)
db.subscribe({ doctype: 'tweet', language: 'en' },
    (k, val) => console.log(val))

await db.put('1', { // (4)
    doctype: 'tweet',
    text: 'Hi',
    language: 'en'
})
await db.put('2', {
    doctype: 'company',
    name: 'ACME Co.'
})