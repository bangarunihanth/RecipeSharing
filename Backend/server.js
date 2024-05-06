const exp = require('express');
const app = exp();
require('dotenv').config();
const mongoClient = require('mongodb').MongoClient;
const path = require('path');

app.use(exp.static(path.join(__dirname, '../frontend/build')));
app.use(exp.json());

mongoClient.connect(process.env.DB_URL)
  .then((client) => {
    const db = client.db('recipeDb');

    const usersCollection = db.collection('usersCollection');
    const recipeCollection = db.collection('recipeCollection');

    app.set('usersCollection', usersCollection);
    app.set('recipeCollection', recipeCollection);

    console.log('DB Connection success');
  })
  .catch((err) => console.log('Error in db connection', err));

const userApp = require('./api/userApi');
const recipeApp = require('./api/recipeApi');

app.use('/user-api', userApp);
app.use('/recipe-api', recipeApp);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(4000, () => console.log("Server running on port 4000..."));

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});
