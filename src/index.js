const express = require('express')
const colors= require('colors')
const morgan = require('morgan')
const path = require('path')
const app = express()

const { mongoose } = require('./database')

//Settings
//Set variable port to be used on our listener
app.set('port', process.env.PORT || 4000)

//Middlewares 
//[morgan to print in console the request is made from the app]
app.use(morgan('dev'))
//express.json() allows getting and sending json data
app.use(express.json())

//Routes
app.use(require('./routes/exercise.routes'))

//Static (in order to have no problems with the OS used We are going to use path.join to joing the root)
//console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')))

//Set up the port
app.listen(app.get('port'), () => console.log(`Listening port ${app.get('port')}....`.red))