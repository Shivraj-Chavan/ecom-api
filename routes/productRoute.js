import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js'
const productRoute=express.Router()


productRoute.get("/",getAllProducts)
productRoute.get("/:id",getProductById)
productRoute.post("/",createProduct)
productRoute.patch("/:id",updateProduct)
productRoute.delete("/:id",deleteProduct)


export default productRoute