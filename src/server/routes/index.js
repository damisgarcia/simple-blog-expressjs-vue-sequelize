const UsersController = require('../controllers/users');

const Router = (app) => {
    UsersController(app);
};



module.exports = Router;