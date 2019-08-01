// All code here is copyapastya from the node we built for SGT, before the react-sgt
// strictly for reference



const express = require('express');
// const fs = require('fs');
const path = require('path')
const mysql = require('mysql');
const creds = require('./mysql_credentials.js');

// const db = mysql.createConnection(creds);

const server = express();

//this creates an endpoint that allows us to load all the files from the html folder
const pubDirectory = path.join(__dirname, '/public');
const staticMiddlewareFunction = express.static(pubDirectory);

server.use(express.urlencoded({ extended: false }))
server.use(staticMiddlewareFunction);

server.listen(3001, function () {
    console.log('Listened to port 3001 successfully.');
});

//endpoint training wheels, no real function to this 
server.get('/test', function (request, response) {
    console.log('this is your test endpoint. bro. sick.');
    response.send('this is your test endpoint. bro. sick: ' + Date.now());
});

server.get('/getstudents', function (request, response) {
    db.connect(function () {
        var query = "SELECT * FROM `grades`";
        db.query(query, function (error, data, fields) {
            if (!error) {
                response.send({
                    success: true,
                    data
                })
            } else {
                console.log('error: ', error);
            }
        })
    });
    // dummyData example to make endpoint work from local file instead of a database
    // const data = fs.readFileSync(__dirname + '/dummydata/getstudents.json');
    // response.send(data);
});
//subdomain.domain.tld/path/to/file/filename?a=1&b=2&c=3#somehash

// $.ajax({
//     url: 'subdomain.domain.tld/path/to/file/filename?a=1&b=2&c=3#somehash',
//     method: 'put',
//     data: {
//         a: 4,
//         yo: 'heya',
//         'we rock': 'hell yeah'
//     }
// })
// PUT path / to / file / filename ? a = 1 & b=2 & c=3#somehash
// Host: subdomain.domain.tld
// header1: header1value 

// a=4&yo=heya&we%20rock=hell%20yeah


// server.read('/readstudents', function(request, response){
//     const mysql = fs.readFileSync(__dirname + '/')
//     response.send(data);
// });

// server.put('/addstudent', function (request, response) {
//     db.connect(function () {

//         console.log('request.query:::::: ', request.body);

//         var { name, course, grade } = request.body;
//         // var query = "INSERT INTO `grades` (`name`, `course`, `grade`) VALUES ('" +name+"', "+course+"', '"+grade+"')";
//         var query = "INSERT INTO `grades` SET `name` = '" + name + "', `course` =  '" + course + "', `grade` = '" + grade + "'";
//         console.log(query);
//         db.query(query, function (error, data, fields) {
//             if (!error) {
//                 response.send({
//                     success: true,
//                     data: data,

//                 });
//             } else {
//                 console.log('error: ', error);
//             }
//         })
//     });
// });

// server.delete('/deletestudent', function (request, response) {
//     db.connect(function () {

//         console.log('request.query', request.body);

//         var id = request.body.student_id;
//         var query = "DELETE FROM `grades` WHERE `grades`.`id` = " + id;

//         console.log(query);

//         db.query(query, function (error, data, fields) {
//             if (!error) {
//                 response.send({
//                     success: true,
//                     data: data,

//                 });
//             } else {
//                 console.log('error: ', error);
//             }
//         })
//     });
// });