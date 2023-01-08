const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// get Section using async await method
app.get('/',async (request, response)=>{
    // Here we define our variables we will use
    // 1 - todoItems will find objects in our database and add them to the array
    const todoItems = await db.collection('todos').find().toArray()
    // 2 - itemsLeft will count the number of items that are not completed
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})

    // We respond by rendering or 'writing' all this new information in our index.ejs file
    response.render('index.ejs', { items: todoItems, left: itemsLeft })

    // 1 - Looks for the todos collection in database and turns it to an array
    db.collection('todos').find().toArray()
    .then(data => {         // 'data' is just the array holding the todos objects
        db.collection('todos').countDocuments({completed: false})
        .then(itemsLeft => {
            response.render('index.ejs', { items: data, left: itemsLeft })  // Passing data into our ejs template under the name 'items' (key value pair)
        })
    })
    .catch(error => console.error(error))
})

// post Section - rendering the user reponse
app.post('/addTodo', (request, response) => {
    // New 'item' from our form is added to the page and we ensure it is not completed
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})  // 'thing' is the name of our text entry in the form.
    .then(result => {
        // We respond with a message that the new item has been added
        console.log('Todo Added')
        // We redirect to a refreshed page -> this will trigger a get request (see above)
        response.redirect('/')
    })
    .catch(error => console.error(error))
})


app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false``
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    .catch(error => console.error(error))

})


app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})