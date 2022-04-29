import request from 'supertest'
import {dbUser} from "../../../src/database/models/db_users";
import {User} from "../../../src/models/user";
let server;

describe('/user', () => {

    describe('GET', () => {
        let userDB;
        let email;
        let password;

        beforeEach(async () => {
            server = require('../../../src/index')
            userDB = new dbUser({
                name: "test",
                email: "test@example.com",
                password: "$2b$10$kPLid/ALLlbf27PW6l19GuG.oNZdL3gyFA9abXU4zj58yKMLjwIGW",
                year: 1,
                currentPuzzleId: "firstTestPuzzle"
            });
            await userDB.save();
            email = "test@example.com";
            password = "12345678";
        });

        afterEach(async () => {
            server.close();
            await dbUser.remove();
        });

        const exec = async () => {
            const token = new User("test", email, password, 1).generateAuthToken();
            return await request(server)
                .get('/user')
                .set('x-auth-header', token)
                .send()
        };

        it('should return 404 if no email is found',async function () {
            email = 'a';
            const res = await exec();
            expect(res.status).toBe(404)
        });

        it('should return 200 if email is found',async function () {
            const res = await exec();
            expect(res.status).toBe(200)
        });

    });
});
