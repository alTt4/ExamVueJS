let express = require('express'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  database = require('./db/database'),
  bodyParser = require('body-parser'),
  createError = require('http-errors');

  const mongo_user = process.env.VUE_APP_MONGO_USER;
  const mongo_pass = process.env.VUE_APP_MONGO_PASS;
  const mongo_url = process.env.VUE_APP_MONGO_URL;
  const mongo_db = process.env.VUE_APP_MONGO_DB_NAME;

// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mongo_url}/${mongo_db}`, {
    user: mongo_user,
    pass: mongo_pass,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"),
error => console.log("Database could't be connected to: " + error)
)

// -- connect to DB Without Password -- \\
// mongoose.connect(database.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("Database connected"),
// error => console.log("Database could't be connected to: " + error)
// )

const todosAPI = require('./routes/todos.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// API
app.use('/api/todos', todosAPI)


// Find 404
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// // Create port
// const port = process.env.PORT || 4000;
// const server = app.listen(port, () => {
//   console.log('Connected to port ' + port)
// })
module.exports = app;

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/get-data', (req, res) => {
//   res.send('ini data!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })