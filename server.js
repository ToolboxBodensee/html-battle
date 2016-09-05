/**
 * Created by maluramichael on 25/08/16.
 */
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);
const _ = require('lodash');

// MIDDLEWARE -------------------------------
app.use(express.static(__dirname + '/public'));

// DATA -------------------------------
var beamer = null;
var admin = null;

// HELPR ---

const clientUpdatedSourceCode = (id, sourceCode) => {
    if (beamer) {
        io.to(beamer).emit('receive_upload', {
            id,
            sourceCode
        });
    }
};

const clientDisconnected = (id) => {
    if (beamer) {
        io.to(beamer).emit('client_disconnected', {
            id
        });
    }
};

const passEventToBeamer = (id, name, data) => {
	console.log(id, '> beamer', name)

    if (beamer) {
        io.to(beamer).emit(name, Object.assign({
            id
        }, data));
    } else {
		console.log('beamer is not defined');
	}
};

const passEventToClients = (name, data) => {
    const ids = _.chain(io.sockets.connected).values().filter({
        type: 'client'
    }).map('id').value();
    for (var index = 0, length = ids.length; index < length; index++) {
        const id = ids[index];
		console.log('beamer >', id, name)
        io.to(id).emit(name, data);
    }
};

const passEventToClient = (id, name, data) => {
	console.log('beamer >', id, name)
    io.to(id).emit(name, data);
};

// GENERAL -------------------------------
io.on('connection', (socket) => {
    console.log('connected', socket.id, socket.type);

    // CLIENT -------------------------------
    if (socket.type === 'client') {
        socket.on('client_upload', (data) => passEventToBeamer(socket.id, 'receive_upload', data));
        socket.on('disconnect', (data) => clientDisconnected(socket.id));
        socket.on('client_set_username', (data) => passEventToBeamer(socket.id, 'receive_username', data));
    } else if (socket.type === 'beamer') {
        beamer = socket.id;

		socket.on('client_add_points', (data) => passEventToClient(data.id, 'receive_points', data));
		socket.on('clear_code', (data) => passEventToClients('clear_code', data));
		socket.on('enable_lock', (data) => passEventToClients('lock_enabled', data));
		socket.on('disable_lock', (data) => passEventToClients('lock_disabled', data));
		socket.on('set_quest', (data) => passEventToClients('receive_quest', data));
        socket.on('full_reset', (data) => passEventToClients('full_reset', data));
    }
});

io.use(function(socket, next) {
    const id = socket.handshake.query.id;
    if (id === undefined || id === null || id === 'null' || id === 'undefined') {
        return next(new Error('id is not defined'));
    }

    const type = socket.handshake.query.type;
    if (type === undefined || type === null || type === 'null' || type === 'undefined') {
        return next(new Error('type is not defined'));
    }

    socket.id = id;
    socket.type = type;
    socket.points = 0;
    socket.sourceCode = '';

    return next();
});

// // ADMIN -------------------------------
// socket.on('admin.setChallenge', ()=> {
//     console.log('admin.setChallenge');
// });
//
// socket.on('admin.addPoints', (user, poinds)=> {
//     console.log('admin.addPoints');
// });
//
// socket.on('admin.clearPoints', ()=> {
//     console.log('admin.clearPoints');
// });


// RUN -------------------------------
server.listen(8080, 'localhost');
