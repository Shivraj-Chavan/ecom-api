import Category from "../models/categoryModel.js";

const createCategory = async (req, res) => {
    try {
       console.log(req.body);
      const { name, description, image, parentCategory } = req.body;
  
      // Validate required fields
      if (!name) {
        return res.status(400).json({ success: false, message: 'Name is required' });
      }
      
      const nameExist=await Category.findOne({name})
      if(nameExist){
        return res.status(400).json({ success: false, message: 'Category name already exist'})
      }
  
      // Check if the parent category exists, if provided
      if (parentCategory) {
        const parentExist = await Category.findById(parentCategory);
        if (!parentExist) {
          return res.status(400).json({ success: false, message: 'Parent category does not exist' });
        }
      }
  
      // Create a new category
      const newCategory = new Category({
        name,
        description:description || '', 
        image:image || '',
        parentCategory: parentCategory || null,  // Set to null if not provided
      });
  
      // Save the new category to the database
      await newCategory.save();
  
      return res.status(201).json({ success: true, message: 'New category created successfully' });
    } catch (error) {
      console.error('Error creating category:', error.message);
      return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
  };

  
const getAllCategory=async(req,res)=>{
    try {
        const allCategories=await Category.find({},{name:1,image:1,parentCategory:1})
        if (allCategories.length === 0) {
            return res.status(404).json({ success: false, message: "No data found" });
        }
        return res.status(200).json({success:true,data:allCategories})
    } catch (error) {
        console.error('Error retrieving categories:', error);  // Log the full error object
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
   }
}

const editCategory=async(req,res)=>{
    const { id } = req.params;  
    const { name, description, image, parentCategory } = req.body;

    try {
        // Find the existing category
        const oldCategory = await Category.findById(id);
        if (!oldCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        // Check if the parent category exists, if provided
        if (parentCategory) {
            const parentExist = await Category.findById(parentCategory);
            if (!parentExist) {
                return res.status(400).json({ success: false, message: "Parent category does not exist" });
            }
        }

        // Check if the new name already exists in another category
        if (name && name !== oldCategory.name) {
            const nameExists = await Category.findOne({ name });
            if (nameExists) {
                return res.status(400).json({ success: false, message: "Category name already exists" });
            }
        }

        // Update the category
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                name: name || oldCategory.name,  
                description: description || oldCategory.description,
                image: image || oldCategory.image,
                parentCategory: parentCategory || oldCategory.parentCategory,
            },
            { new: true }  
        );

        return res.status(200).json({ success: true, message: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        console.error('Error updating category:', error);  // Log the full error object
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
}


const deleteCategory=async(req,res)=>{
    const { id } = req.params;

    try {
        // Check if the category has subcategories
        const subcategories = await Category.find({ parentCategory: id });
        if (subcategories.length > 0) {
            return res.status(400).json({ success: false, message: "Cannot delete category with subcategories" });
        }

        // Delete the category
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        console.error('Error deleting category:', error);  // Log the full error object
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
    
}


export {createCategory,getAllCategory ,editCategory,deleteCategory};