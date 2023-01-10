// 1. Declaring packages
const express = require('express')
const app = express()
const bodyParser = require('body-parser') 
const mysql = require('mysql')
const cors = require('cors')

// 2. Cross server communication
app.use(cors())
app.use(express.json())
bodyParser.urlencoded({extended: false})

// 3. defining mysql constraints & http
const port = 3000
const hostname = 'localhost'
const db = "nodeDb"
const tbl = "users"

// 5. Connectivity with mysql db
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: db // 7. adding your database name
})

// 6. Connection with mysql
con.connect((err) => {
    if (err) throw err
    console.log("Mysql connected")
})

// 8. Defining Routes
app.get('/', (req,res) => {
    con.query("SELECT * FROM " + tbl, (err, result) => {
        res.status(200)
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify(result))
    })
})

app.post('/new', (req,res) => {
    var resp = req.body // making use of bodyParser
    // con.query("INSERT into users VALUES (" + resp['id'] + ",'" + resp['name'] + "','" + resp['email'] + "','" + resp['item'] + "'," + resp['amount'] + ",'" + resp['status'] + "')" , (err, result) => {
    con.query("Insert into " + tbl + " VALUES (?,?,?,?,?,?)", [req.body.id,req.body.name,req.body.email,req.body.item,req.body.amount,req.body.status] , (err,result) => {
        res.status(200)
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify(result))
    })
})

// 4. Http server
app.listen(port,hostname, () => {
    console.log("Server Running at 3000")
})