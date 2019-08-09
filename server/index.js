//requires
const express = require('express');
const server = express();
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const creds = require('./mysql_credentials.js');
const db = mysql.createConnection(creds);
const pubDirectory = path.join(__dirname, '/public');

//socket.IO
const http = require('http').createServer(server);
const io = require('socket.io')(http);

//server uses
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(pubDirectory));
server.use(express.json());


// endpoint to get student questions
server.get('/getStudentsQuestions',(request, response) => {
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

// endpoint to get admin questions
server.get('/getAdminQuestions',(req, res) => {
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
    });
  });
});

// endpoint to delete admin question by id
server.delete('/adminQuestion',(req, res) => {
  db.connect(function () {
    const adminQuestionID = parseInt(req.query.adminQuestionID);
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
    });
  });
});

server.post('/addAdminQuestion', (req,res)=>{
    let {correctAnswer, adminID, question} = req.body;
    let ansArray = req.body.answers.split(',');
    let [ans0, ans1, ans2, ans3] = ansArray;
    let regex = /(['])/g;
    //this regex stuff is to accommodate apostraphes into the mysql queries
    for(let index = 0; index > 4; i++){
      switch(index){
        case 0: ans0 = ans0.search(regex).replace("/'");
          break;
        case 1: ans1 = ans1.search(regex).replace("/'");
          break;
        case 2: ans2 = ans2.search(regex).replace("/'");
          break;
        case 3: ans3 = ans3.search(regex).replace("/'");
          break;
      }  
    }
    
    // this^ is meant to accommodate for apostrophes in the question text, but
    // problematic code, gives type error even though im checking that question variable is 
    // a string before calling .search().replace() like i did on the answer strings 
    // question = question.toString().search(regex).replace("/'");
    

    let questionID;
    let firstAnswerID;
    let insertQuestionQuery = `
        INSERT INTO questionsAdmin ( question, questionOwner_id, correctAnswer )
            VALUES
            ('${question}', ${adminID}, '${correctAnswer}')
        `;
    db.query(insertQuestionQuery, (error, results, fields)=>{
        if (error) {
            console.error(error);
            process.exit(1);
        }
        questionID = results.insertId;
        let insertAnswersQuery = `
          INSERT INTO answerOptions ( question_id, answer )
            VALUES (${questionID}, "${ans0}"),
                (${questionID}, "${ans1}"),
                (${questionID}, "${ans2}"),
                (${questionID}, "${ans3}")
        `;
        db.query(insertAnswersQuery, (error, results, fields) => {
            if (error) {
                console.error(error);
                process.exit(1);
            }
            firstAnswerID = results.insertId;
            res.send({success: 'true', questionID, firstAnswerID});
        });
    })
});

server.post('/addQuestionQ', (req, res) => {
    let { studentID, question } = req.body;
    let insertQuestionQQuery = `
        INSERT INTO questionsQueue ( question, studentUser_id)
            VALUES
            ('${question}', ${studentID})
        `;
    db.query(insertQuestionQQuery, (error, results, fields) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        res.send({success: true, data:{message: 'question added'}})
    })
});

server.delete('/studentQuestion', (req, res) => {
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
server.get('/', (req,res)=>{
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

io.on('connection', (socket)=>{
  socket.on('resetAnswerData', ()=>{
    questionData= {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    };
  })
});

//listen for QQ additions
io.on('connection', (socket)=>{
  socket.on('QQadd', (question)=>{
    console.log('backend QQadd socket reached. question: ', question);
    io.emit('Qsend', question);
  });
});

//listen for QQ deletions
io.on('connection', (socket)=>{
  socket.on('QQdelete', (questionID)=>{
    console.log('backend QQadd socket reached. question: ', questionID);
    io.emit('deleteQQ', questionID);
  });
});

http.listen(3001, () => {
  console.log('Node server listening on port 3001 successfully.')
});