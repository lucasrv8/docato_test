const express = require('express')
const router = express.Router()

const crawlerService = require('../service/crawlerService')

router.get('/api/products/docato', async function (req, res) {
    const listProducts = await crawlerService.getAllProductsDocato()
    res.status(listProducts.status_code).json(listProducts)
})

module.exports = router