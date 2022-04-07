const express = require('express');
const todosRoute = express.Router();

// Todos model
let TodosModel = require('../models/Todos');

todosRoute.route('/').get((req, res) => {
    TodosModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

todosRoute.route('/get-id').get((req, res) => {
    TodosModel.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      }).sort({idtodos: -1}).limit(1)
 })

todosRoute.route('/create-todos').post((req, res, next) => {
    TodosModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

todosRoute.route('/edit-todos/:id').get((req, res) => {
   TodosModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update todo
todosRoute.route('/update-todos/:id').post((req, res, next) => {
  TodosModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Todos successfully updated!')
    }
  })
})

// Delete todo
todosRoute.route('/delete-todos/:id').delete((req, res, next) => {
  TodosModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = todosRoute;