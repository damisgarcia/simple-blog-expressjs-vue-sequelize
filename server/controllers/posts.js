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
        Post.create(req.body.post).then(post => {
            res.status(Status.OK).send(post);
        }).catch(err => {
            res.status(Status.OK).send(err);
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

module.exports = PostsController;