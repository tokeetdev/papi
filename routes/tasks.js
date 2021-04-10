var express = require('express')
var router = express.Router()

let mongo = {} // kinda

router.get('/', function(req, res) {
  const tasks = Object.keys(mongo).map(key => mongo[key])
  res.send(tasks)
})

router.post('/', function(req, res) {
  const task = { ...req.body, pkey: Date.now() }
  mongo[task.pkey] = task
  res.send(task)
})

router.put('/:pkey', function(req, res) {
  mongo[req.params.pkey] = req.body
  res.send(req.body)
})

router.delete('/:pkey', function(req, res) {
  const task = mongo[req.params.pkey]
  delete mongo[req.params.pkey]
  res.send(task)
})

module.exports = router
