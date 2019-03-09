const express = require('express')
const router = express.Router()
const Exercise = require('../models/exercise')
const path = require('path')

router.get('/*',(req,res) => {
    res.sendFile('/Users/kristianss27/Desktop/mern-project/src/public')
})

router.get('/api/exercise', async (req,res) => {
    const exercise = await Exercise.find()
    console.log(exercise)
    res.json({...exercise})
    
})

router.get('/api/exercise/:id', async (req,res) => {
    const exercise = await Exercise.findById(req.params.id)
    res.json({exercise})
})

router.post('/api/exercise', async (req,res) =>{
    const { title, description, muscles } = req.body
    const exercise = new Exercise({
        title,
        description,
        muscles
    })
    
    await exercise.save()
    res.json(exercise)
})

router.put('/api/exercise/:id', async (req,res) =>{
    const { title, description, muscles } = req.body
    const exercise = {
        title, 
        description, 
        muscles
    }
    await Exercise.findByIdAndUpdate(req.params.id,exercise)
    res.json({id: req.params.id, ...exercise})
})

router.delete('/api/exercise/:id', async (req,res) =>{
    await Exercise.findByIdAndDelete(req.params.id)
    res.json({status: `Exercise ${req.params.id} erased`})
})


module.exports = router