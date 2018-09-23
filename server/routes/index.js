const express = require('express');
const UsersController = require('../controllers/users');
const PostsController = require('../controllers/posts');

const Router = (app) => {
    const router = express.Router();
    
    UsersController(router);
    PostsController(router);
    
    app.use('/api', router);
};

module.exports = Router;