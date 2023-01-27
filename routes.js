import express from 'express'
import { createOrUpdate, deleteById, getById, readAll } from './db.js'

const router = express.Router()

// READ ALL
router.get('/users', async (req, res) => {
    const { success, data } = await readAll()

    if (success) {
        return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: "Error" })
})

// Get by ID
router.get('/user/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await getById(id)
    console.log(data)
    if (success) {
        return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: "Error" })
})


// Create User
router.post('/user', async (req, res) => {
    const { success, data } = await createOrUpdate(req.body)

    if (success) {
        return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: 'Error' })
})


// Update by ID
router.put('/user/:id', async (req, res) => {
    const user = req.body
    const { id } = req.params
    user.id = parseInt(id)

    const { success, data } = await createOrUpdate(user)

    if (success) {
        return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: "Error" })
})


// Delete by Id
router.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await deleteById(id)
    if (success) {
        return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error' })
})


export default router