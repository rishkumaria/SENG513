//taken from: https://socket.io/get-started/chat/
//socket io chat tutorial
var express = require('express');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 3000;

var cookie = require('cookies');
var cookieParser = require('cookie-parser');

var userList = [];
var userMessages = [];
var userName = null;

var words;
var nick;
var userColor
var newUser;
var index;
var userTime;
var messageSent;


http.listen( port, function () {
    console.log('Connected on port: ', port);
});
app.use(cookieParser());


// listen to 'chat' messages
io.on('connection', function(socket){


    //get current time from server
    userTime = currentTime();

    socket.on('addUser', function(addID, userColor, userCount){
        //"user 1" gets pushed to the list of users
        //"user 1" gets pushed to the list of users
	socket.nick = addID;
        userList.push(addID);

        //usernames in list are sent to client.js
        io.emit('usernames', userList);

        //loadMessages sent to client.js
        socket.emit('loadMessages', userMessages);

        //changeID sent to client.js
        socket.emit('changeID', socket.nick);
    });

    socket.on('chat', function(chatMsg, addID, userColor){


        words = chatMsg.split(" ");
        //check the first word for either color or nick
        //to change color or nickname
        nick = words[0];

        if(nick === "/nickcolor") {
            socket.userColor = words[1];
            socket.emit('changeColour', userColor);
        }

        else if(nick === "/nick") {
            
            index = userList.indexOf(socket.nick);
	    socket.nick = words[1];
	    userList.splice(index);
	    userList.push(socket.nick);
            socket.emit('changeID', socket.nick);
            io.emit('usernames', userList);
        }

        messageSent = userTime + ": "  + '<span style="color:' + socket.userColor + ' ">' + socket.nick + " </span>" + chatMsg + "<br>" ;
        userMessages.push(messageSent);

        io.emit('chat', chatMsg, userTime, socket.nick, socket.userColor, '');
    });

    socket.on('disconnect', function(){
       userList.splice(userList.indexOf((socket.nick)));
       if(socket.nick!=null) userMessages.push(socket.nick + " has disconnected <br>");

        io.emit('changeList', userList);
    });


});


function currentTime() {
    var displayTime;
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();

    if(minute < 10)
    {
        minute = "0" + minute;
    }
    if (hour > 12){
        hour = hour -12;
        displayTime = hour + ":" + minute + "pm" + "   ";
    }
    else{
        displayTime = hour + ":" + minute + "am" + "   ";
    }
    return displayTime;
}
app.use(express.static(__dirname + '/public'));
