const route = require('express').Router()
const CommandCenter = require('../controller/CommandCenter')

route.get('/', CommandCenter.showBooks)
route.get('/buy/:id', CommandCenter.buyBooks)
route.get('/add', CommandCenter.addForm)
route.post('/add', CommandCenter.add)
route.get('/emptyList', CommandCenter.emptyList)
route.get('/restock/:id', CommandCenter.restockForm)
route.post('/restock/:id', CommandCenter.restock)
route.get('/delete/:id', CommandCenter.delete)

module.exports = route