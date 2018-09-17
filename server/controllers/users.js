const { User } = require('../database/models');
const { Status } = require('../index.const');

const UsersController = (app) => {   
    app.get('/users/:id', (req, res) => {
        // res.send(req.params.id);
        User.findById(req.params.id).then(user => {
            res.status(Status.OK).send(user);
        }).catch(err => {
            res.status(Status.OK).send({ message: 'Usuário não exite ou não encotrado!' });
        });
    });

    app.get('/users', (req, res) => {
        User.findAll().then(users => {
            res.status(Status.OK).send(users);
        });        
    });

    app.post('/users', (req, res) => {
        User.create(req.body.user).then(user => {
            res.status(Status.OK).send(user);
        }).catch(err => {
            res.status(Status.OK).send(err);
        });
    });

    app.delete('/users/:id', (req, res) => {
        // get user
        User.findById(req.params.id).then(user => {
            // delete user from database
            user.destroy().then(() => {
                res.status(Status.OK).send({ success: true });
            }).catch(err => {
                res.status(Status.FAIL).send(err)
            });
        }).catch(err => {
            res.status(Status.FAIL).send(err);
        });
    });
}

module.exports = UsersController;