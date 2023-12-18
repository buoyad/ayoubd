import fs from 'fs'
import path from 'path'


function getPostFiles(dir: string) {
    return fs.readdirSync(dir).filter(file => path.extname(file) === '.mdx')
}
