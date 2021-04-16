var express = require('express')
var { getPapiTasks, postPapiTask, putPapiTask, deletePapiTask } = require('./papi')
var router = express.Router()


router.use(function (req, res, next) {
  const token = req.cookies['AuthToken']
  if (!token) return res.send(403, 'no')
  req.token = token
  next()
})

router.get('/', function(req, res) {
  getPapiTasks(req.token).then(({data}) => res.send(data))
})

router.post('/', function(req, res) {
  postPapiTask(req.token, req.body).then(({data}) => res.send(data))
})

router.put('/:pkey', function(req, res) {
  putPapiTask(req.token, req.params.pkey, req.body).then(({data}) => res.send(data))
})

router.delete('/:pkey', function(req, res) {
  deletePapiTask(req.token, req.params.pkey).then(({data}) => res.send(data))
})

module.exports = router
