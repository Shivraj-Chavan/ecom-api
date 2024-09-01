import express from 'express'
import { createCategory, deleteCategory, editCategory, getAllCategory } from '../controllers/productCategoryController.js'

const categoryRouter=express.Router()


categoryRouter.get("/",getAllCategory)
categoryRouter.post("/",createCategory)
categoryRouter.patch("/:id",editCategory)
categoryRouter.delete("/:id",deleteCategory)


export default categoryRouter