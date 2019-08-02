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

server.use(express.urlencoded({ extended: false }));
server.use(staticMiddlewareFunction);

server.listen(3001, function () {
    console.log('Listened to port 3001 successfully.');
});


server.get('/getStudentsQuestions', function (request, response) { // endpoint to get student Questions
  console.log('/getStudentsQuestions started');
  // console.log('what is db:', db);
  db.connect(function () {
    const query = `SELECT questionsQueue.id, questionsQueue.question, studentUsers.twitchUserName as author
                   FROM questionsQueue
                   JOIN studentUsers
                   ON questionsQueue.studentUser_id = studentUsers.id`;
    db.query(query, function (error, data) {
      if (!error) {
        response.send({
          success: true,
          data
        });
      }
    });
  });
});

server.get('/getAdminQuestions', function (request, response) {
  db.connect(function () {
    const query = `SELECT q.id, q.question, q.questionOwner_id as admin_id, GROUP_CONCAt(a.id) AS answer_ids, GROUP_CONCAT(a.answer) as answers
                  FROM questionsAdmin as q
                  JOIN answerOptions as a
                  ON q.id = a.question_id
                  WHERE q.questionOwner_id = 1
                  GROUP BY q.id`;
    db.query(query, function (error, data) {
      if (!error) {
        response.send({
          success: true,
          data
        });
      }
    });
  });
});

server.delete('/adminQuestion', function (request, response) {
  db.connect(function () {
    const adminQuestionID = parseInt(request.query.adminQuestionID);
    const query = `DELETE answerOptions, questionsAdmin
                   FROM answerOptions
                   JOIN questionsAdmin ON questionsAdmin.id = answerOptions.question_id
                   WHERE questionsAdmin.id = ${adminQuestionID}`


    // let query = 'DELETE FROM ?? WHERE ?? = ?; DELETE FROM ?? WHERE ?? = ?;';
    // let inserts = ['answerOptions', 'question_id', adminQuestionID, 
    //                'questionsAdmin', 'id', adminQuestionID];
    // // let query = 'DELETE FROM ?? WHERE ?? = ?';
    // // let inserts = ['answerOptions', 'question_id', adminQuestionID, 
    // //                'questionsAdmin', 'id', adminQuestionID];
    // let sql = mysql.format(query, inserts);


    // console.log('this is the formatted SQL:', sql);
    
    db.query(query, function (error, data) {
      if (!error) {
        const output = {
          success: true,
          data
        };
        response.send( output );
      }
    });
  });
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
