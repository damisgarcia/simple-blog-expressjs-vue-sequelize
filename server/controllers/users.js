const faker = require('faker');

const { Status } = require('../index.const');

const UsersController = (app) => {
    app.get('/user', (req, res) => {
        let data = createUser();

        res.status(Status.OK).send(data);
    });

    app.get('/users/:num', (req, res) => {
        var users = [];
        var num = req.params.num;

        if (isFinite(num) && num > 0) {
            for (i = 0; i <= num - 1; i++) {
                users.push(createUser());
            }

            res.status(Status.OK).send(users);

        } else {
            res.status(Status.FAIL).send({ message: 'Número informar é inválido' });
        }
    });
}

function createUser() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatarUrl: faker.image.avatar()
    };
}

module.exports = UsersController;