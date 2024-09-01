import Product from "../models/productModel.js";

const createProduct = async (req, res) => {
    const { name, price, description, images, category, rating, reviews, stock, brand, productStatus, tags } = req.body;

    try {
        // Validate required fields
        if (!name || !price || !description || !category || !stock || !brand) {
            return res.status(400).json({ success: false, message: 'Required fields are missing' });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            price,
            description,
            images,  // Expect an array of image URLs
            category,
            rating,
            reviews,
            stock,
            brand,
            productStatus,
            tags,
        });

        // Save the new product to the database
        await newProduct.save();

        return res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};


const getAllProducts = async (req, res) => {
    try {
        console.log('api hit');
        // const products = await Product.find().populate('category');  // Populate category for detailed info
        const products = await Product.find();  // Populate category for detailed info
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error retrieving products:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};


const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id).populate('category');  // Populate category for detailed info
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Error retrieving product:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
}



const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, images, category, rating, reviews, stock, brand, productStatus, tags } = req.body;

    try {
        // Find the existing product
        const oldProduct = await Product.findById(id);
        if (!oldProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if the new name already exists in another product
        if (name && name !== oldProduct.name) {
            const nameExists = await Product.findOne({ name });
            if (nameExists) {
                return res.status(400).json({ success: false, message: 'Product name already exists' });
            }
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name: name || oldProduct.name,
                price: price || oldProduct.price,
                description: description || oldProduct.description,
                images: images || oldProduct.images,
                category: category || oldProduct.category,
                rating: rating || oldProduct.rating,
                reviews: reviews || oldProduct.reviews,
                stock: stock || oldProduct.stock,
                brand: brand || oldProduct.brand,
                productStatus: productStatus !== undefined ? productStatus : oldProduct.productStatus,
                tags: tags || oldProduct.tags,
            },
            { new: true }  // Return the updated document
        );

        return res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};


const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the product
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};


export {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct}