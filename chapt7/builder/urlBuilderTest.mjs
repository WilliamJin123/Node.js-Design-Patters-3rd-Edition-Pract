import { UrlBuilder } from './urlBuilder.mjs'
const url = new UrlBuilder()
.setProtocol('https')
.setAuth('user', 'pass')
.setHostname('example.com')
.build()
console.log(url.toString())