import { Router } from "express"
import { readFile, writeFile } from "fs/promises"

const router = Router()

const dataSoure = './data/list.txt'

router.get('ping', (req, res) => {
    console.log("teste")
    return res.json('pong')
})

router.post('contato', async (req, res) => {
    const { name } = req.body

    if (!name || name.length < 2) {
        return res.json('Nome precisa ter pelo menos 2 caracteres.')
    }

    let list: string [] = []
    try {
        const data  = await readFile(dataSoure, { encoding: 'utf8' }) 
        list = data.split('/n')
    } catch (error) {}

    list.push(name)
    await writeFile(dataSoure, list.join('/n'))

    return res.status(201).json({ contato: name })
})

export default router