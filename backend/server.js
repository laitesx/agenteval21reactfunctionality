const express = require('express');
const app = express();
const port = 8080;
const cors = require ('cors');

app.use(cors());

// Just simulate users for this; in a real application we'd have a database.
// We're just testing some stuff here so this will do.
const users = [{
    'userId': 0,
    'firstName': 'Eustace',
    'lastName': 'Lobsters',
    'occupation': 'Owner',
    'roles': ['admin', 'user']
}, {
    'userId': 1,
    'firstName': 'Leonard',
    'lastName': 'Justice',
    'occupation': '"Legal"',
    'roles': ['moderator', 'user']
}, {
    'userId': 2,
    'firstName': 'Muriel',
    'lastName': 'Container',
    'occupation': 'Baker',
    'roles': ['user']
}, {
    'userId': 3,
    'firstName': 'Gregory',
    'lastName': 'Maximus',
    'occupation': 'Warlord',
    'roles': ['user']
}, {
    'userId': 4,
    'firstName': 'Magnus',
    'lastName': 'the Questionable',
    'occupation': 'Banned',
    'roles': ['user', 'banned']
}];

app.get('/health', (req, res) => {
    res.send('Alive');
});

app.get('/users/list', (req, res) => {
    res.send(users);
});

// Just simulating this for now. A real application would use a database.
app.get('/users/user/:id', (req, res) => {
    const id = req.params.id;
    res.send(users[id]);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
