const express = require('express')
const app = express()
const db = require('./db')

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

//Grabs all created Users from api
app.get('/api/users', (req, res, next) => {
  db.getUsers()
    .then(response => res.send(response))
    .catch(next)
})

const port = process.env.PORT || 3000

//Wakes up the database and creates server.
db.sync().then(() => {
  app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
  })
})