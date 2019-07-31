// All code here is copyapastya from the node we built for SGT, before the react-sgt
// strictly for reference



const express = require('express');
// const fs = require('fs');
const path = require('path')
const mysql = require('mysql');
const creds = require('./mysql_credentials.js');

const db = mysql.createConnection(creds);

const server = express();

//this creates an endpoint that allows us to load all the files from the html folder
const pubDirectory = path.join(__dirname, '/public');
const staticMiddlewareFunction = express.static(pubDirectory);

server.use(express.urlencoded({ extended: false }))
server.use(staticMiddlewareFunction);

server.listen(3002, function () {
    console.log('Listened to port 3002 successfully. must use 3002 outside the dev environment, set listen to 3001 for using dev environment.');
});

//endpoint training wheels, no real function to this 
server.get('/test', function (request, response) {
    console.log('this is your test endpoint. bro. sick.');
    response.send('this is your test endpoint. bro. sick: ' + Date.now());
});


// $query = "SELECT  a.id,  a.name,  a.price,  a.shortDescription,  p.site,  p.longDescription,
//     GROUP_CONCAT( i.imgUrl) AS imgUrl
//     FROM products AS p 
//     JOIN images AS  i 
//       ON p.id = i.productId
//     $whereClause     "WHERE p.id = $id";
//     GROUP BY p.id";

//grabs admin and their first question, but beyond that we need to get individual questions
// SELECT a.id, a.channelName, a.twitchUser_id, q.question, q.id, q.questionOwner_id, ao.question_id,
//     GROUP_CONCAT(ao.answer) AS answers
// FROM adminUsers AS a
// JOIN questionsAdmin AS q
// ON a.id = q.questionOwner_id
// JOIN answerOptions AS ao
// ON q.id = ao.question_id
// WHERE a.id = 2


//
// SELECT a.id, a.channelName, a.twitchUser_id, q.question, q.id, ao.question_id,
//     GROUP_CONCAT(ao.answer) AS answers
// FROM adminUsers AS a
// JOIN questionsAdmin AS q
// ON a.id = q.questionOwner_id
// JOIN answerOptions AS ao
// ON q.id = ao.question_id
// WHERE a.id = 1 AND q.id = 2
// GROUP BY q.id


//single question query by question ID
// SELECT a.id, a.channelName, a.twitchUser_id, q.question, q.questionOwner_id, ao.question_id,
// GROUP_CONCAT(ao.answer) AS answers
// FROM adminUsers AS a
// JOIN questionsAdmin AS q
// ON a.id = q.questionOwner_id
// JOIN answerOptions AS ao
// ON q.id = ao.question_id AND a.id = q.questionOwner_id
// WHERE q.id = 4

//grab all questions for an admin user
// SELECT a.id, a.channelName, a.twitchUser_id, q.questionOwner_id, q.questionOwner_id,
//     GROUP_CONCAT(q.question) AS questions
// FROM adminUsers AS a
// JOIN questionsAdmin AS q
// ON a.id = q.questionOwner_id
// WHERE a.id = 1

// SELECT a.id, a.channelName, a.twitchUser_id, q.questionOwner_id, GROUP_CONCAT(q.id) AS questionID,
//     GROUP_CONCAT(q.question) AS questions
// FROM adminUsers AS a
// JOIN questionsAdmin AS q
// ON a.id = q.questionOwner_id

// WHERE a.id = 1



server.get(`/getAllAdminQuestions/$id`, function (request, response) {
    db.connect(function () {
        var query = 
            `SELECT a.id, a.channelName, a.twitchUser_id, q.question,  q.id, q.questionOwner_id, ao.answer, ao.question_id,
                GROUP_CONCAT( ao.answer) AS answers
                FROM adminUsers AS a
                JOIN questionsAdmin AS q
                    ON a.id = q.questionOwner_id
                JOIN answerOptions AS ao
                    ON q.id = ao.question_id
                WHERE a.id = 1 
                GROUP BY q.id`; //need to add variable inthe the where clause to account for the id being searched for
        
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