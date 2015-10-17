
//importing models
var sequelize = require('./sequelize');
var onlineUsers = require('./lib/onlineUsers.js');
var Announce = require('./models/announcement.js');
var Msg = require('./models/message.js');

module.exports = function(io) {

// Handle socket traffic
io.on('connection', function(socket){
  console.log('a user connected');
   
   socket.on('new announcement', function(data) {
	   console.log("******** Handling new announcement!");
	   console.log("current_user: "+data.publisher_username);
   		Announce.create({ 
   			publisher_username: data.publisher_username,
   			content: data.content,
			createdAt: data.createdAt
   		}).then(function() {
   			console.log("Announcement created!");
			io.sockets.emit('new annoucement', {
   			publisher_username: data.publisher_username,
   			content: data.content,
				createdAt: data.createdAt
			});
   		});
   });
	 
	 
    socket.on('new message', function(data) {
			console.log("******** Handling new message!");
			date = new Date();
   		Msg.create({ 
      	chatauthor: data.chatauthor,
        timestamp: date,
        chatmessage: data.chatmessage  			
   		}).then(function() {
   			console.log("Msg created!");
				io.sockets.emit('new message', {
   				chatauthor: data.chatauthor,
   				chatmessage: data.chatmessage,
					createdAt: date
				});
   		});
    

 
    });


});


};
