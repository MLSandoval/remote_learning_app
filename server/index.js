
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


server.get('/test', function (request, response) {
    console.log('this is your test endpoint. bro. sick.');
    response.send('this is your test endpoint. bro. sick: ' + Date.now());
});



//get all admin questions from specific admin
server.get('/getAdminQuestion/:id', (req, res)=> {
    if(req.params.id){

        let whereClause = `WHERE a.id = ${req.params.id}`

        let query = `
            SELECT a.id, a.channelName, a.twitchUser_id, q.question, q.questionOwner_id, ao.question_id,
                GROUP_CONCAT(ao.answer) AS answers
                FROM adminUsers AS a
                JOIN questionsAdmin AS q
                    ON a.id = q.questionOwner_id
                JOIN answerOptions AS ao 
                    ON q.id = ao.question_id AND a.id = q.questionOwner_id
                ${whereClause}
            `;

        db.query(query, function (error, data, fields) {
            if (error) {
                console.error(error)
                process.exit(1)
            }
            res.send({
                success: true,
                data
            })
        });
       

    }else{
        res.send('Please provide admin id.');
    }  
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

// server.get(`/getAllAdminQuestions/${id}`, function (request, response) {
//     db.connect(function () {
//         var query = 
//             `SELECT a.id, a.channelName, a.twitchUser_id, q.question,  q.id, q.questionOwner_id, ao.answer, ao.question_id,
//                 GROUP_CONCAT( ao.answer) AS answers
//                 FROM adminUsers AS a
//                 JOIN questionsAdmin AS q
//                     ON a.id = q.questionOwner_id
//                 JOIN answerOptions AS ao
//                     ON q.id = ao.question_id
//                 WHERE a.id = 1 
//                 GROUP BY q.id`; //need to add variable inthe the where clause to account for the id being searched for
        
//         db.query(query, function (error, data, fields) {
//             if (!error) {
//                 response.send({
//                     success: true,
//                     data
//                 })
//             } else {
//                 console.log('error: ', error);
//             }
//         })
//     });
    // dummyData example to make endpoint work from local file instead of a database
    // const data = fs.readFileSync(__dirname + '/dummydata/getstudents.json');
    // response.send(data);
// });