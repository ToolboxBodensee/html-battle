/**
 * Created by maluramichael on 25/08/16.
 */
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);
const _ = require('lodash');

const uuid = require('./lib/uuid');

// MIDDLEWARE -------------------------------
app.use(express.static(__dirname + '/public'));

// DATA -------------------------------
let clients = [];

// HELPR ---
const clientExists = (id)=> {
    return _.find(clients, {id}) !== null;
};

const removeClient = (id)=> {
    _.remove(clients, {id});
};

const addClient = (client)=> {
    clients.push(client);
};

// GENERAL -------------------------------
io.on('connection', (socket)=> {
    console.log('connected', socket.id, socket.type);
});

io.use(function (socket, next) {
    console.log('Query', socket.handshake.query);

    const id = socket.handshake.query.id;
    if (id === undefined || id === null || id === 'null' || id === 'undefined') {
        return next(new Error('id is not defined'));
    }

    const type = socket.handshake.query.type;
    if (type === undefined || type === null || type === 'null' || type === 'undefined') {
        return next(new Error('type is not defined'));
    }

    if (clientExists(id)) {
        removeClient(id);
    }

    addClient({socket, id, type, points: 0});

    socket.id = id;
    socket.type = type;

    return next();
});

setInterval(()=> {
    console.log(_.map(clients, 'id'));
}, 1000);

// CLIENT -------------------------------
// socket.on('client.upload', (id)=> {
//     console.log('client.upload');
// });
//
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