import express from 'express'
import mongoose from 'mongoose'
import { Power } from './model.js'

const app = express()
app.use(express.json())


app.get('/power', async (req, res) => {
    const branch_status = await Power.aggregate([
        { '$sort': { 'createdAt': -1 }},
        {'$group': { '_id': '$branch', 'createdAt': { $first: '$createdAt'}, status: { $first: '$status' }}}
    ])
    return res.send(branch_status)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    console.log('listeninng on port: ', PORT)
    try {
        await mongoose.connect('mongodb+srv://power_app:stanbic123@cluster0.wzrueuy.mongodb.net/?retryWrites=true&w=majority')
        console.log('db connection successful')
    } catch (error) {
        console.log(error)
    }
    
})