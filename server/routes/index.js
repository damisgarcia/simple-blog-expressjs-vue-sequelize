const UsersController = require('../controllers/users');
const PostsController = require('../controllers/posts');

const Router = (app) => {
    UsersController(app);
    PostsController(app);
};

module.exports = Router;