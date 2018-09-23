const { User } = require('../database/models');
const { Status } = require('../index.const');

const { pick} = require('lodash');

const UsersController = (app) => {   
    app.get('/users/:id', (req, res) => {
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
        let user_params = permit_params(req.body.user);
        
        User.create(user_params).then(user => {
            res.status(Status.OK).send(user);
        }).catch(err => {
            res.status(Status.OK).send(err);
        });
    });

    app.put('/users/:id', (req, res) => {
        let user_params = permit_params(req.body.user);
        // get user
        User.findById(req.params.id).then(user => {
            // update user from database
            user.update(user_params).then((data) => {
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

function permit_params(user){
    return pick(user, ['name', 'email','role']);
}

module.exports = UsersController;