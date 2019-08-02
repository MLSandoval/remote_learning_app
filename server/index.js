
const express = require('express');
const server = express();
const path = require('path')
const mysql = require('mysql');
const creds = require('./mysql_credentials.js');
const db = mysql.createConnection(creds);
const pubDirectory = path.join(__dirname, '/public');

server.use(express.urlencoded({ extended: false }))
server.use(express.static(pubDirectory));
server.use(express.json());
server.listen(3001, function () {
    console.log('Listened to port 3001 successfully.');
});

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




server.get('/test', function (request, response) {
    console.log('this is your test endpoint. bro. sick.');
    response.send('this is your test endpoint. bro. sick: ' + Date.now());
});

server.post('/addAdminQuestion', (req,res)=>{
    console.log('req.body:  ', req.body);
    let {correctAnswer, adminID, question} = req.body;
    let [ans0, ans1, ans2, ans3] = req.body.answers;
    let questionID;
    let insertQuestionQuery = `
        INSERT INTO questionsAdmin ( question, questionOwner_id, correctAnswer )
            VALUES
            ('${question}', ${adminID}, ${correctAnswer});
        `;
    
    db.query(insertQuestionQuery, (error, results, fields)=>{
        if (error) {
            console.error(error);
            process.exit(1);
        }
        
        questionID = results.insertId;

        let insertAnswersQuery = `
        INSERT INTO answerOptions ( question_id, answer )
            VALUES (${questionID}, '${ans0}'),
                (${questionID}, '${ans1}'),
                (${questionID}, '${ans2}'),
                (${questionID}, '${ans3}')
        `;
        
        db.query(insertAnswersQuery, (error, results, fields) => {
            if (error) {
                console.error(error);
                process.exit(1);
            }
    
            res.send('ok bowsssuuu adminQ added!')
        }); 
    })
});

server.post('/addQuestionQ', (req, res) => {

    let { studentID, question } = req.body;
    console.log('req.body:::: ', req.body);
    let insertQuestionQQuery = `
        INSERT INTO questionsQueue ( question, studentUser_id)
            VALUES
            ('${question}', ${studentID})
        `;
    console.log('insert questionsQ query: ', insertQuestionQQuery)
    db.query(insertQuestionQQuery, (error, results, fields) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        res.send('ok questionQ added!!')
    })
});

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