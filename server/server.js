//const functions = require('firebase-functions');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var firebase = require('firebase');

var cors = require('cors');

app.use(cors())

var config = {
    apiKey: "AIzaSyC6zT9cYycz-EU-DNAQcaoO05DlTxmgfZg",
    authDomain: "client-server-e0e66.firebaseapp.com",
    databaseURL: "https://client-server-e0e66.firebaseio.com",
    projectId: "client-server-e0e66",
    storageBucket: "client-server-e0e66.appspot.com",
    messagingSenderId: "800996448549"
  };
  firebase.initializeApp(config);

//exports.api = functions.https.onRequest(app)


router.route('/students')
    .post(function (req, res) { 
        student_no = req.body.number;
        student_name = req.body.name;
        student_id = req.body.id;
        firebase.database().ref('students/' + student_no).set({
            number: student_no,
            name: student_name,
            id: student_id
        });
        res.json({ message: 'created!' });
    });

router.route('/students')
    .get(function (req, res) {
        var student_path = firebase.database().ref('students/');
        student_path.on('value', function (snapshot) {
            res.send(snapshot.val())
        });

    });

router.route('/students/:student_no')
    .get(function (req, res) {
        var number = req.params.student_no;
        var student_once_path = firebase.database().ref('/students/' + number)
        student_once_path.once('value', function (snapshot) {
            res.send(snapshot.val())
        });
    });

router.route('/students/:student_no')
    .put(function (req, res) {
        var number = req.params.student_no;
        var student_once_path = firebase.database().ref('/students/' + number)
        firebase.database().ref(student_once_path).update({
            name: req.body.name

        });
        res.json({ message: 'Updated!' });
    });

router.route('/students/:student_no')
    .delete(function (req, res) {
        var number = req.params.student_no;
        var student_once_path = firebase.database().ref('/students/' + number)
        firebase.database().ref(student_once_path).remove()
        res.json({ message: 'Deleted!' });

        });
        app.use(bodyParser.json(), router);
        app.listen(8000);