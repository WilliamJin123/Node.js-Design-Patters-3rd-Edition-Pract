import { promises as fs } from 'fs'
import objectPath from 'object-path'
export class Config {
    constructor(formatStrategy) { // (1)
        this.data = {}
        this.formatStrategy = formatStrategy
    }
    get(configPath) { // (2)
        return objectPath.get(this.data, configPath)
    }
    set(configPath, value) { // (2)
        return objectPath.set(this.data, configPath, value)
    }
    async load(filePath) { // (3)
        console.log(`Deserializing from ${filePath}`)
        this.data = this.formatStrategy.deserialize(
            await fs.readFile(filePath, 'utf-8')
        )
    }
    async save(filePath) { // (3)
        console.log(`Serializing to ${filePath}`)
        await fs.writeFile(filePath,
            this.formatStrategy.serialize(this.data))
    }
}