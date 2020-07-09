var express = require('express')
const app = express();
var bodyParser = require('body-parser')
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//set up view engine
app.set('view engine', 'ejs');

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);
// });

//create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.post('/getmeeting', (req, res) => {
    var meetingId = req.body.meetingid
    console.log(meetingId)
    res.redirect('/'.concat(meetingId))
});

app.get('/:meetingId', (req, res) => {
    var meetingId = req.params.meetingId
    console.log(meetingId)
    io.on('connection', (socket) => {
        socket.on(meetingId, (msg) => {
            io.emit(meetingId, msg);
        });
    });
    io.of('/').in(meetingId).clients(function (error, clients) {
        console.log(clients.length)
    });
    res.render('chat', { meetingId: meetingId })
})

http.listen(3000, () => {
    console.log('app now listening on port 3000');
});