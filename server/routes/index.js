
const express = require('express')
const path = require('path')
const user = require('./user')
const order = require('./order')
const product = require('./product')
const upload = require('./upload')

module.exports.init = (app) => {
  app.use('/api/products', product)
  app.use('/api/users', user)
  app.use('/api/orders', order)
  app.use('/api/upload', upload)

  const __dirname = path.resolve()
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
}