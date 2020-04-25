const path = require('path')
const express = require('express')
const app = express()

const fetch = require('node-fetch');
require('dotenv').config();


const PORT = process.env.PORT || 5000
const FetchWeatherAPIKey = process.env.WEATHER_APP_ID

const TodolistModel = require('./TodolistModel')

const mongoose = require('mongoose')
const MongoDBURL = process.env.MONGODB_KEY
mongoose.connect(MongoDBURL,{useNewUrlParser: true})
const db = mongoose.connection

db.on('error', (error)=>{
  console.log(`Error:${error}`)
})
db.once('open',()=>{
  console.log('Sucessfully connected to MongoDB')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, ()=>{
    console.log(`Server running in PORT ${PORT}`)
})

app.use('/', express.static(path.join(__dirname, 'dist')))

app.get('/api', (req,res)=>{
  //Find all, convert it into array of object, parse it into JSON, response it back
  //print all in the test database, todolistmodels collection
  
  TodolistModel.find().then(doc=>{
    let NewDoc = doc.map(
      (object)=>{
        return {
          _id: object["_id"],
          key: object["key"],
          completed: object["completed"],
          title: object["title"],
        }
      }
    )
    return JSON.stringify(NewDoc)
  }).then(data=>{
    res.send(data)
  })

  //Get back a query
  //How to retrive useful information from query?
  //TodolistModel.find() return a promise
  
  //doc is object

  //For the return array, map each object, delete Createdat, updatedat, Updatedat, and _v
})

app.post('/api', (req,res)=>{
  let Todo = new TodolistModel({
    key: req.body.key,
    completed: req.body.completed,
    title: req.body.title,
  })
  Todo.save()
  res.end()
})

app.get('/api/changecompleted/:key',async(req,res)=>{
  const doc = await TodolistModel.findOne({
    key: req.params.key
  })

  doc.completed = !doc.completed
  await doc.save()
  res.end()
})

//Make POST request for the weather api

app.get('/api/deletedocument/:key',async(req,res)=>{
  let DeleteKey =  parseInt(req.params.key)
  let UpdateKey =  parseInt(req.params.key) + 1 //The key in which start the loop, the doc with key after the deleted doc
  await TodolistModel.deleteOne({
    key:DeleteKey
  })
  const DocCount = await TodolistModel.countDocuments(); //DocCount is the no of doc after deleting document
  const DocArray = await TodolistModel.find(); //DocArray is the array of doc after delete action
  //Loop from UpdateKey to DocCount
  let i = UpdateKey
  //If DocCount is equal to DeleteKey, no need to do
  //If DocCount is less than DeleteKey, update the key in the doc with key greater or equal to updatekey
  //Why the for loop is not called
  //Problem here
    for(i; i<=DocCount; i++){
      const doc = await TodolistModel.findOne({
        key: i
      })
      doc.key = doc.key - 1
      await doc.save()
   }
  res.end()
})

//Fetch Weather API
app.post('/api/fetchweather',async(req,res)=>{
  let lat = req.body.lat
  let lng = req.body.lng
  const WeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${FetchWeatherAPIKey}`).then(res=>{
    return res.json()
  }).then(data=>{
    let WeatherData = {
      WeatherIconID: data.weather[0].icon,
      Temperature: data.main.temp - 273.15,
      Humidity: data.main.humidity
    }
    return WeatherData
  }).catch(err=>{return err})
  res.send(JSON.stringify(WeatherData))
})



process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('MongoDB disconnected');
     process.exit(0);
    });
});







