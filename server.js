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

const clientUpdatedSourceCode = (id, sourceCode)=> {
    if (beamer && beamer.socket) {
        beamer.socket.emit('receive_upload', {id, sourceCode});
    }
    if (admin && admin.socket) {
        admin.socket.emit('receive_upload', {id, sourceCode});
    }
};

const clientDisconnected = (id)=> {
    if (beamer && beamer.socket) {
        beamer.socket.emit('client_disconnected', {id});
    }
    if (admin && admin.socket) {
        admin.socket.emit('client_disconnected', {id});
    }
};

// GENERAL -------------------------------
io.on('connection', (socket)=> {
    console.log('connected', socket.id, socket.type);

    // CLIENT -------------------------------
    if (socket.type === 'client') {
        socket.on('client_upload', (data)=> {
            console.log('client.upload', data.id, data.sourceCode.length);
            socket.sourceCode = data.sourceCode;
            clientUpdatedSourceCode(data.id, data.sourceCode);
        });
        socket.on('disconnect', (data)=> {
            console.log('client.disconnected', socket.id);
            clientDisconnected(socket.id);
        });
    } else if (socket.type === 'beamer') {
        beamer = {socket, type: 'beamer'};
    } else if (socket.type === 'admin') {
        admin = {socket, type: 'admin'};
    }
});

io.use(function (socket, next) {
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
server.listen(8080, '192.168.3.223');