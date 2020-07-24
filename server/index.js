const express = require('express');
const conectDB = require('./config/db');
const cors = require('cors');
// create the server
const app = express();

const PORT = process.env.PORT || 4000;

// conect to the database
conectDB();

// enable cors
app.use(cors());

// enable express.json
app.use(express.json({ extended: true }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
    console.log('server runing on', PORT);
});
