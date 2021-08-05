const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { MongoClient, ObjectId } = require('mongodb');

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

app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if (err) return res.send(err)
        res.render('edit.ejs', {data: result})
    })
})

.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname

    db.collection('data').updateOne({_id: ObjectId(id)}, {
        $set: {
            name:name,
            surname:surname
            }
        }, (err, result) => {
            if (err) return res.send(err)
            res.redirect('/show')
            console.log('atualizado no Banco de Dados')
    })

})

app.route('/delete/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('data').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('Deletado do Banco de Dados!')
        res.redirect('/show')
    })
})




app.post('/show', (req,res) => {
    console.log(req.body)
})

app.post('/show', (req, res) =>{
    console.log('Hello again..')
})