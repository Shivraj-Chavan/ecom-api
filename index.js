import express from 'express'
import dotenv from 'dotenv'
import connectToMongo from './db/dbConfig.js'
import categoryRouter from './routes/productCategoryRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'

dotenv.config()
const app=express()
app.use(cors())
const port=process.env.PORT || 3000

app.use(express.json())

app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/product',productRoute)


connectToMongo()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((error)=>{
    console.error('Failed to start server:', error.message);
})