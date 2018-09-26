const { pick } = require('lodash');
const { Post } = require('../database/models');
const { Status } = require('../index.const');

const PostsController = function(app){
    app.get('/posts/:id', (req, res) => {
        // res.send(req.params.id);
        Post.findById(req.params.id).then(post => {
            res.status(Status.OK).send(post);
        }).catch(err => {
            res.status(Status.OK).send({ message: 'Post não exite ou não encotrado!' });
        });
    });

    app.get('/posts', (req, res) => {
        Post.findAll().then(posts => {
            res.status(Status.OK).send(posts);
        });        
    });

    app.post('/posts', (req, res) => {
        let payload = permit_params(req.body.post);
        Post.create(payload).then(post => {
            res.status(Status.OK).send(post);
        }).catch(err => {
            res.status(Status.OK).send(err);
        });
    });

    app.put('/posts/:id', (req, res) => {
        let payload = permit_params(req.body.post);
        // get post
        Post.findById(req.params.id).then(post => {
            // delete post from database
            post.update(payload).then(() => {
                res.status(Status.OK).send(post);
            }).catch(err => {
                res.status(Status.FAIL).send(err)
            });
        }).catch(err => {
            res.status(Status.FAIL).send(err);
        });
    });

    app.delete('/posts/:id', (req, res) => {
        // get post
        Post.findById(req.params.id).then(post => {
            // delete post from database
            post.destroy().then(() => {
                res.status(Status.OK).send({ success: true });
            }).catch(err => {
                res.status(Status.FAIL).send(err)
            });
        }).catch(err => {
            res.status(Status.FAIL).send(err);
        });
    });
}

function permit_params(post) {
    return pick(post, ['title', 'body', 'status']);
}

module.exports = PostsController;