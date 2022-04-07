require('dotenv').config();
// const http = require('http');

const app = require('./backend/app');

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
// app.set('port', process.env.PORT || 4000)
// const server = http.createServer(app);
// server.listen(process.env.PORT || 4000, () =>{
//     console.info(`App is running: http://localhost:${process.env.PORT || 3000}`);
// })