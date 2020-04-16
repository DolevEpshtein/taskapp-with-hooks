const express = require('express');
require('./db/mongoose');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', taskRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve the static files from the React app
  // app.use(express.static(path.join(__dirname, '../client/build')));
  app.use(express.static('client/build'));
  app.get('*', (req,res) =>{ 
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
};

app.listen(port, (err) => {
  if (err)
    console.log(err);

  console.log('Server is up on port ' + port);
});

