const express = require('express')
const mongoose = require('mongoose')
const { Power } = require('./model')
var cors = require('cors');

const app = express()
app.use(express.json())


app.use(cors());


app.get('/power', async (req, res) => {
    const branch_status = await Power.aggregate([
        { '$sort': { 'createdAt': -1 }},
        {'$group': { '_id': '$branch', 'createdAt': { $first: '$createdAt'}, status: { $first: '$status' }}}
    ])
    branch_status.sort((a, b) => a._id.localeCompare(b._id))
    return res.send(branch_status)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    console.log('listening on port: ', PORT)
    try {
        await mongoose.connect('mongodb+srv://power_app:stanbic123@cluster0.wzrueuy.mongodb.net/?retryWrites=true&w=majority')
        console.log('db connection successful')
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = app