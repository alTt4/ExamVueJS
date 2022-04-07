const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todosSchema = new Schema({
  idtodos: {
    type: Number
  },
  desctodos: {
    type: String
  },
  isdone: {
    type: Boolean
  },
}, {
  collection: 'todos'
})

module.exports = mongoose.model('Todos', todosSchema)