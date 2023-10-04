const connectToMongo = require('./db');

connectToMongo();

const express = require('express')
const app = express()
const port = 5000

// app.get('/', (req, res) => {
//     res.send('This is my backend app')
// })

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/Notes', require('./Routes/Notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})