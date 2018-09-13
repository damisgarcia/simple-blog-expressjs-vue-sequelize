const faker = require('faker');

const Const = require('./index.const');

const Router = (app) => {
    app.get('/', (req, res) => {
        res.status(Const.Status.OK).send('Hello my API!');
    });

    app.get('/user', (req, res) => {
        let data = createUser();

        res.status(Const.Status.OK).send(data);
    });

    app.get('/users/:num', (req, res) => {
        var users = [];
        var num = req.params.num;

        if (isFinite(num) && num > 0) {
            for (i = 0; i <= num - 1; i++) {
                users.push(createUser());
            }

            res.status(Const.Status.OK).send(users);

        } else {
            res.status(Const.Status.FAIL).send({ message: 'Número informar é inválido' });
        }
    });
};

function createUser(){
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar()
    };
}

module.exports = Router;