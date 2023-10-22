const db = require('../models');
const Category = db.Category;

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ status: 'success', data: { result: categories } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.addCategory = async (req, res) => {
    try {
        if (!req.body.name || req.body.name.trim() === '') {
            return res.status(400).json({ status: 'error', message: 'Category name cannot be empty.' });
        }
        
        const category = await Category.create(req.body);
        res.status(201).json({ status: 'success', data: { result: category } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const categoryExists = await Category.findByPk(req.params.id);
        if (!categoryExists) {
            return res.status(404).json({ status: 'error', message: 'Category not found.' });
        }

        await Category.update(req.body, { where: { id: req.params.id } });
        const updatedCategory = await Category.findByPk(req.params.id);
        res.status(200).json({ status: 'success', data: { result: updatedCategory } });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const categoryExists = await Category.findByPk(req.params.id);
        if (!categoryExists) {
            return res.status(404).json({ status: 'error', message: 'Category not found.' });
        }

        await Category.destroy({ where: { id: req.params.id } });
        res.status(204).json();  // 204 No Content for successful deletion without returning content
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
