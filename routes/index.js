const userRoutes = require('./users');
const todoRoutes = require('./todos');

module.exports = app => {
    app.use('/api/users', userRoutes);
    app.use('/api/todos', todoRoutes);

    
    app.use((req, res, next) => {
        res.status(404).json({ message: 'Route not found' });
    });
};