const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = require('../controllers/product.js')
const { checkJwt, admin } = require('../utils/auth.js')

router.route('/').get(getProducts).post(checkJwt, admin, createProduct)
router.route('/:id/reviews').post(checkJwt, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(checkJwt, admin, deleteProduct)
  .put(checkJwt, admin, updateProduct)

module.exports = router