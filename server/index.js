const express = require('express');
const server = express();
const cors = require('cors');
const ServerError = require('./error');
const path = require('path');
const mysql = require('mysql');
const creds = require('./mysql_credentials');
const db = mysql.createPool(creds);
const pubDirectory = path.join(__dirname, '/public');
const bodyParser = require('body-parser');
const http = require('http').createServer(server);
const io = require('socket.io')(http);
server.use(bodyParser.json());
server.use(cors());
server.use(express.static(pubDirectory));
server.use(express.json());

server.get('/students-questions',(req, res, next) => {
  const query = `
    SELECT questionsQueue.id, questionsQueue.question, questionsQueue.studentUserId as author
      FROM questionsQueue`;
  db.query(query, (error, data) => {
    if (error){
      console.error(error);
      return next(new ServerError('Internal server error.'), 500);
    }  
    res.send({
      success: true,
      data
    });
  });
});

server.get('/admin-questions', (req, res, next) => {
  const {adminID} = req.body || 1;
  if(!adminID) return next(new ServerError('Must provide admin ID', 400));
  const query = 
    `SELECT q.id, q.question, q.questionOwnerId as adminId, GROUP_CONCAt(a.id) AS answerIds, GROUP_CONCAT(a.answer) as answers
      FROM questionsAdmin as q
      JOIN answersOptions as a
      ON q.id = a.questionId
      WHERE q.questionOwnerId = ?
      GROUP BY q.id`;
  const params = [adminID];

  db.query(query, params, (error, data) => {
    if (error) {
      console.error(error);
      return next(new ServerError('Internal server error.', 500));
    }
    const output = {
      success: true,
      data: output
    };
    res.send(output);
  });
});

server.delete('/admin-question', (req, res, next) => {
  let adminQuestionID = req.query.adminQuestionID;
  if (!adminQuestionID) return next(new ServerError('Must provide question ID for deletion.', 400));
  adminQuestionID = parseInt(adminQuestionID);
  if (Number.isNaN(adminQuestionID)) return next(new ServerError('Admin question ID must be a number.', 400));
  const query = 
    `DELETE answerOptions, questionsAdmin
      FROM answerOptions
      JOIN questionsAdmin ON questionsAdmin.id = answerOptions.questionId
      WHERE questionsAdmin.id = ?`;
  let params = [adminQuestionID];

  db.query(query, params, (error, data) => {
    if (error) {
      console.error(error);
      return next(new ServerError('Internal server error.', 500));
    }
    const output = {
      success: true,
      data
    };
    res.send(output);
  });
});

server.post('/admin-question', (req,res, next)=>{
  if(!req.body.correctAnswer ) return next(new ServerError('Must select correct answer.', 400));
  if(!req.body.adminID) return next(new ServerError('Must provide admin ID.', 400));
  if(!req.body.question) return next(new ServerError('Must provide question text.', 400));
  if(!req.body.answers) return next(new ServerError('Must provide 4 answers options.', 400));
  const {correctAnswer, adminID, question} = req.body;
  const ansArray = req.body.answers.split(',');
  const [ans0, ans1, ans2, ans3] = ansArray;
  let questionID;
  const query1 = `
    INSERT INTO questionsAdmin ( question, questionOwnerId, correctAnswer )
      VALUES (?, ?, ?)`;
  const params1 = [question, adminID, correctAnswer];

  db.query(query1, params1, (error, data)=>{
    if (error) {
      console.error(error);
      next(new ServerError('Internal server error.', 500));
    }
    questionID = data.insertId;
    const query2 = `
      INSERT INTO answerOptions ( question_id, answer )
        VALUES (?, ?),
          (?, ?),
          (?, ?),
          (?, ?)`;
    const params2= [questionID, ans0, questionID, ans1, questionID, ans2, questionID, ans3];

    db.query(query2, params2, (error, data) => {
      if (error) {
        console.error(error);
        next(new ServerError('Internal server error.', 500));
      }
      const firstAnswerID = data.insertId;
      const output = {
        success: true,
        questionID,
        firstAnswerID
      };
      res.send(output);
    });
  })
});

server.post('/student-question', (req, res, next) => {
  const { studentUsername, question } = req.body;
  if(!studentUsername) return next(new ServerError('Must provide student username.', 400));
  if(!question) return next(new ServerError('Must provide question.', 400));
  const query = `
    INSERT INTO questionsQueue ( question, studentUser_id)
      VALUES
      (?, ?)`;
  const params = [question, studentUsername];

  db.query(query, params, (error, data) => {
    if (error) {
      console.error(error);
      next(new ServerError('Internal server error.', 400));
    }
    const output = {
      success: true,
      data: {
        questionID: data.insertId
      }
    };
    res.send(output);
  })
});

server.delete('/student-question', (req, res, next) => {
  const { studentQuestionID } = req.query;
  if(!studentQuestionID) return next(new ServerError('Must provide a question ID.', 400));
  const query = `
    DELETE FROM questionsQueue 
      WHERE id = ?`;
  const params = [studentQuestionID]; 

  db.query(query, params, (error, data) =>  {
    if (error) {
      console.error(error);
      return new ServerError('Internal server error.', 500);
    }
    const output = {
      success: true,
      data
    };
    res.send(output);
  });
});

//socket.io block
io.on('connection', (socket) => {console.log('A client has connected!')});

server.post('/broadcast', (req, res, next) =>{
  const question = req.body.question;
  if(!question) return new ServerError('Must select question to broadcast.', 400);
  io.emit('broadcastQuestion', question);
});

let questionData = {
  a: 0,
  b:0,
  c:0,
  d:0
};

const answerChartData = {
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

server.post('answer-chart-data', (req, res, next) => {
  const answer = req.body.answer;
  if(!answer) return next(new ServerError('Must provide answer data.', 400))
  switch (answer) {
    case 'A': answerChartData.datasets[0].data[0] += 1;
      break;
    case 'B': answerChartData.datasets[0].data[1] += 1;
      break;
    case 'C': answerChartData.datasets[0].data[2] += 1;
      break;
    case 'D': answerChartData.datasets[0].data[3] += 1;
      break;
    default: console.error('Question answer data not sent/stored properly.');
  };

  io.emit('answerChartData', answerChartData);
})

server.post('add-question-queue',(req, req, next) => {
  const {question, studentUsername, id} = req.body;
  if(!question) return new ServerError('Must provide question.', 400);
  if(!studentUsername) return new ServerError('Must provide student username.', 400);
  if(!id) return new ServerError('Must provide student ID.', 400);

  io.emit('updateStudentQuestions', question, studentUsername, id);
});

server.post('delete-question-queue', (req, res, next) => {
  const {questionID} = req.body;
  if(!questionID) return next(new ServerError('Must provide question ID.', 400));

  io.emit('deleteQuestionQueue', questionID);
});

server.post('reset-chart-data',(req, res, next) => {
  answerChartData.datasets[0].data = [0, 0, 0, 0];
});

server.use('/*', (req, res, next) => {
  next(new ServerError(`Cannot ${req.method} ${req.originalUrl}.`, 404));
});

server.use(errorHandler);

http.listen(3001, () => {
  console.log('Server listening on port 3001 successfully.');
});