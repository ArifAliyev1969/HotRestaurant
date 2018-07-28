const express = require('express')
const bodyParser = require("body-parser")
const path = require('path')
const app = express()
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const htmlFiles = [
    { routeName: 'home', name: 'home.html'},
    { routeName: 'tables', name: 'tables.html'},
    { routeName: 'reserve', name: 'reserve.html'}
]
let tables = []
let waitingList = []

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'home.html'))
})
 
app.get("/:htmlFile", function(req, res) {
    let routeName = req.params.htmlFile
    console.log(routeName)
    res.sendFile(path.join(__dirname, `${routeName}.html`))
})

app.get("/api/tables", function(req, res) {
    res.send(tables)
})

app.get("/api/waitlist", function(req, res) {
    res.send(waitingList)
})

app.post("/api/tables", function(req, res) {
    if(tables.length < 5) {
    tables.push(req.body)
    res.send(true)
    }
    else {
        waitingList.push(req.body)
        res.send(false)
    }
})

app.post("/api/clear", function(req, res) {
    tables = []
    waitingList = []
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`)
})
