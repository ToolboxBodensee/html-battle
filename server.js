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
const findBeamer = ()=> {
    return _.find(clients, {type: 'beamer'});
};

const findClientById = (id)=> {
    return _.find(clients, {id});
};

const clientExists = (id)=> {
    return findClientById(id) !== null;
};

const removeClientWithId = (id)=> {
    _.remove(clients, {id});
};

const addClient = (client)=> {
    clients.push(client);
};

const updateSourceCodeOfClient = (id, sourceCode)=> {
    const foundClient = findClientById(id);
    if (foundClient) {
        foundClient.sourceCode = sourceCode;
    }
};

const sendSourceToBeamer = (id, sourceCode)=> {
    const foundBeamer = findBeamer(id);
    if (foundBeamer) {
        foundBeamer.socket.emit('receive_upload', {id, sourceCode});
    }
};

// GENERAL -------------------------------
io.on('connection', (socket)=> {
    console.log('connected', socket.id, socket.type);

    // CLIENT -------------------------------
    if (socket.type === 'client') {
        socket.on('client_upload', (data)=> {
            console.log('client.upload', data.id, data.sourceCode.length);
            sendSourceToBeamer(data.id, data.sourceCode);
        });
    } else if (socket.type === 'beamer') {

    }
});

io.use(function (socket, next) {
    // console.log('Query', socket.handshake.query);

    const id = socket.handshake.query.id;
    if (id === undefined || id === null || id === 'null' || id === 'undefined') {
        return next(new Error('id is not defined'));
    }

    const type = socket.handshake.query.type;
    if (type === undefined || type === null || type === 'null' || type === 'undefined') {
        return next(new Error('type is not defined'));
    }

    if (clientExists(id)) {
        removeClientWithId(id);
    }

    addClient({
        socket,
        id,
        type,
        points: 0,
        sourceCode: '<html></html>'
    });

    socket.id = id;
    socket.type = type;

    return next();
});

// setInterval(()=> {
//     console.log(_.map(clients, 'id'));
// }, 1000 * 5);

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