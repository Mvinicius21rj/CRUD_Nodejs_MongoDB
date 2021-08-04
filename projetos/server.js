const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://marcos:123@nodejs.ujh8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


MongoClient.connect(uri, (err, client) =>{
    if (err) return console.log(err)
    db = client.db('cluster0') //nome do banco de dados


    app.listen(3001, function(){
        console.log('server running on port 3001')
    })
})

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err,result) =>{
        if (err) return console.log(err)

        console.log('salvo no banco de dados')
        res.redirect('/show')
    })
})


app.post('/show', (req,res) => {
    console.log(req.body)
})

app.post('/show', (req, res) =>{
    console.log('Hello again..')
})