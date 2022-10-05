const express = require('express'),
    app = express(),
    path = require('path');

//запускаем вебсервер на 3000 порту и отдаем статику фронта
app.use('/', express.static(path.join(__dirname, 'public')))
app.listen(3001, () => {
    console.log(`Start chat backend on port 3001`)
})

//слушаем сокеты на 8801 порту
const ws = require('ws');
let WS = new ws.Server({ port: 8801 });

//массив для хранения сессий клиентов
const sessions = new Set();
WS.on('connection', session => {
    // console.log('set connection', session);
    //сохраняем открытую сессию для отправки в нее сообщений
    sessions.add(session);
    //рассылаем сообщение всем сессиям чата
    session.on('message', (e) => {
        const data = JSON.parse(e);
        console.log("get message", data);
        sessions.forEach(sess => sess.send(JSON.stringify(data)))
    });
    //удаляем сессию при разрыве соединения
    session.on('close', () => sessions.delete(session))

});
