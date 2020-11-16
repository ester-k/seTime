const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes')
const bodyParser = require('body-parser');
const projectRoutes=require('./routes/projectRoutes')
const { connect } = require('./connect');
connect();
const app = express();
const port = process.env.PORT || 4000;
app.listen(port);
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/task', taskRoutes);
app.use('/project', projectRoutes);
console.log("before use project");     
console.log('setime RESTful API server started on: ' + port );
