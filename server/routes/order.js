const express = require('express')
const router = express.Router()
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require('../controllers/order.js')
const { checkJwt, admin } = require('../utils/auth.js')

router.route('/').post(checkJwt, addOrderItems).get(checkJwt, admin, getOrders)
router.route('/myorders').get(checkJwt, getMyOrders)
router.route('/:id').get(checkJwt, getOrderById)
router.route('/:id/pay').put(checkJwt, updateOrderToPaid)
router.route('/:id/deliver').put(checkJwt, admin, updateOrderToDelivered)

module.exports = router