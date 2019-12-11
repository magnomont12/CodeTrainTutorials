var express = require('express')
var serveStatic = require('serve-static')
 
var app = express()
 
app.use(serveStatic('Session3/', { 'index': ['index.html'] }))
app.listen(8080)