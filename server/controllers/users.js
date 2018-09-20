const { User } = require('../database/models');
const { Status } = require('../index.const');

const { pick} = require('lodash');

const permitParams = ['name', 'email'];

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
        let body = pick(req.body.user, permitParams);
        
        User.create(body).then(user => {
            res.status(Status.OK).send(user);
        }).catch(err => {
            res.status(Status.OK).send(err);
        });
    });

    app.put('/users/:id', (req, res) => {
        let body = pick(req.body.user, permitParams);
        // get user
        User.findById(req.params.id).then(user => {
            // update user from database
            user.update(body).then((data) => {
                res.status(Status.OK).send(data);
            }).catch(err => {
                res.status(Status.FAIL).send(err)
            });
        }).catch(err => {
            res.status(Status.FAIL).send(err);
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