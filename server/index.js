//requires
const express = require('express');
const server = express();
const cors = require('cors');
const ServerError = require('./error');
const path = require('path');
const mysql = require('mysql');
const creds = require('./mysql_credentials');
const db = mysql.createConnection(creds);
const pubDirectory = path.join(__dirname, '/public');

//socket.IO
const http = require('http').createServer(server);
const io = require('socket.io')(http);

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(pubDirectory));
server.use(express.json());

// endpoint to get student questions
server.get('/getStudentsQuestions',(request, response, next) => {
  db.connect(function () {
    const query = `SELECT questionsQueue.id, questionsQueue.question, questionsQueue.studentUser_id as author
                   FROM questionsQueue
                   `;
    db.query(query, function (error, data) {
      if (!error) {
        response.send({
          success: true,
          data
        });
      }
      next(error);
    });
  });
});

// endpoint to get admin questions
server.get('/getAdminQuestions',(req, res, next) => {
  db.connect(function () {
    const query = `SELECT q.id, q.question, q.questionOwner_id as admin_id, GROUP_CONCAt(a.id) AS answer_ids, GROUP_CONCAT(a.answer) as answers
                  FROM questionsAdmin as q
                  JOIN answerOptions as a
                  ON q.id = a.question_id
                  WHERE q.questionOwner_id = 1
                  GROUP BY q.id`;
    db.query(query, function (error, data) {
      if (!error) {
        res.send({
          success: true,
          data
        });
      }
      next(error);
    });
  });
});

// endpoint to delete admin question by id
server.delete('/adminQuestion',(req, res, next) => {
  if (!req.query.adminQuestionID)
    next('Must provide admin question ID to delete.')
  const adminQuestionID = parseInt(req.query.adminQuestionID);
  if (typeof adminQuestionID === NaN)
    next('Admin question ID must be a number.');

  db.connect(function () {
    const query = `DELETE answerOptions, questionsAdmin
                   FROM answerOptions
                   JOIN questionsAdmin ON questionsAdmin.id = answerOptions.question_id
                   WHERE questionsAdmin.id = ${adminQuestionID}`
    db.query(query, function (error, data) {
      if (!error) {
        const output = {
          success: true,
          data
        };
        res.send( output );
      }
      next(error);
    });
  });
});

// endpoint to add admin question
server.post('/addAdminQuestion', (req,res, next)=>{
  if(!req.body.correctAnswer ) next('Must provide correct answer in request body.');
  if(!req.body.adminID) next('Must provide admin ID of question in request body.');
  if(!req.body.question) next('Must provide question text in request body.');
  if(!req.body.answers) next('Must provide 4 answers options.');

  let {correctAnswer, adminID, question} = req.body;
  let ansArray = req.body.answers.split(',');
  let [ans0, ans1, ans2, ans3] = ansArray;
  let questionID;
  let firstAnswerID;
  let insertQuestionQuery = `
      INSERT INTO questionsAdmin ( question, questionOwner_id, correctAnswer )
          VALUES
          (?, ?, ?)
      `;
  let params1 = [question, adminID, correctAnswer];
  console.log('params1: ', params1)
  db.query(insertQuestionQuery, params1, (error, results, fields)=>{
      if (error) {
          console.error(error);
          next(error);
      }

      questionID = results.insertId;
      let insertAnswersQuery = `
        INSERT INTO answerOptions ( question_id, answer )
          VALUES (?, ?),
              (?, ?),
              (?, ?),
              (?, ?)
      `;
      let params2= [questionID, ans0, questionID, ans1, questionID, ans2, questionID, ans3];
      console.log('params2: ', params2 );
      db.query(insertAnswersQuery, params2, (error, results, fields) => {
          if (error) {
              console.error(error);
              next(error);
          }
          firstAnswerID = results.insertId;
          res.send({success: 'true', questionID, firstAnswerID});
      });
  })
});

server.post('/addQuestionQ', (req, res, next) => {
    let { studentUsername, question } = req.body;
    let insertQuestionQQuery = `
        INSERT INTO questionsQueue ( question, studentUser_id)
            VALUES
            ('${question}', '${studentUsername}')
        `;
    db.query(insertQuestionQQuery, (error, results, fields) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        res.send({success: true, data:{newID: results.insertId}});
    })
});

server.delete('/studentQuestion', (req, res, next) => {
  db.connect(function () {
    const { studentQuestionID } = req.query;
    let query = 'DELETE FROM ?? WHERE ?? = ?';
    let inserts = ['questionsQueue', 'id', studentQuestionID];
    let sql = mysql.format(query, inserts);
    db.query(sql, (error, data) =>  {
      if (!error) {
        const output = {
          success: true,
          data
        };
        res.send( output );
      }
    });
  });
});

//socketio listeners
server.get('/', (req,res, next)=>{
  res.send({succes: true, message: 'socketIO listener success'});
});

io.on('connection',(socket)=> {console.log('a user has connected!')});

//listen for broadcast question, send it back to front end to reach all listeners
io.on('connection', (socket) => {
  socket.on('broadcast', (question) => {
    console.log('backend socket received. question data: ', question);
    io.emit('questionToBroadcast', question);
  });
});

let questionData = {
  a: 0,
  b:0,
  c:0,
  d:0
};

//js chart data object
var answerData = {
  labels: ['A', 'B', 'C', 'D'],
  datasets: [
    {
      label: 'Answers',
      backgroundColor: 'rgba(154, 18, 179, 0.2)',
      borderColor: 'rgba(154, 18, 179, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(102, 51, 153, 0.4)',
      hoverBorderColor: 'rgba(102, 51, 153, 1)',
      data: [0, 0, 0, 0]
    }
  ]
};

//listen for question reponses, send back to front end to trigger render that shows answers
io.on('connection', (socket)=>{
  socket.on('answerData', (answer)=>{
    console.log('student answer received, data: ', answer);
    switch(answer){
      case 'A': answerData.datasets[0].data[0] += 1;
        break;
      case 'B': answerData.datasets[0].data[1] += 1;
        break;
      case 'C': answerData.datasets[0].data[2] += 1;
        break;
      case 'D': answerData.datasets[0].data[3] += 1;
        break;
      default: console.error('Question answer data not sent/stored properly.');
    };
    console.log('questionData after increment: ');
    console.log(answerData);

    io.emit('answer', answerData);
  })
});

//listen for QQ additions
io.on('connection', (socket)=>{
  socket.on('QQadd', (question, studentUsername, id)=>{
    console.log('backend QQadd socket reached. question: ', question, studentUsername, id);
    io.emit('Qsend', question, studentUsername, id);
  });
});

//listen for QQ deletions
io.on('connection', (socket)=>{
  socket.on('QQdelete', (questionID)=>{
    console.log('backend QQdelete socket reached. question: ', questionID);
    io.emit('deleteQQ', questionID);
  });
});

io.on('connection', (socket) => {
  socket.on('resetAnswerData', () => {
    answerData.datasets[0].data = [0, 0, 0, 0];
  })
});

//express error handling
server.use((err, req, res, next)=>{
  console.error();

  if(next === 'route'){
    console.error(err);
    res.status(500).send('Internal server error: ');
  }
    

  res.status(400).send(next);
})

http.listen(3001, () => {
  console.log('Node server listening on port 3001 successfully.')
});
