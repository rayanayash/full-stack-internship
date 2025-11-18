const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
function loadUsers() {
    try {
        const data = fs.readFileSync('users.json', 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

let users = loadUsers();

// CRUD Routes
app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    saveUsers(users);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    saveUsers(users);
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'User not found' });

    const deletedUser = users.splice(index, 1)[0];
    saveUsers(users);
    res.json(deletedUser);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
