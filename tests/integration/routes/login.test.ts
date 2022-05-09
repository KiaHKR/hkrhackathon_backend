import request from 'supertest'
import { populateDatabase } from "../databasePopulater";
import { depopulateDatabase } from "../databaseDepopulater";

import app from '../../../src/index';

let server;

describe('/login', () => {
    let email;
    let password;

    beforeEach(async () => {
        server = app;
        await populateDatabase();
        email = "test@example.com";
        password = "12345678";
    });

    afterEach(async () => {
        server.close();
        await depopulateDatabase();
    });

    const exec = async () => {
        return await request(server)
            .post('/login')
            .send({
                email,
                password
            })
    };

    it('should return a 400 when invalid req.body', async function () {
        email = '';
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return a 400 when email not found', async function () {
        email = 'wrong@example.com';
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return a 400 when password is wrong', async function () {
        password = 'wrongPassword';
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return a 200 and token if valid login', async function () {
        const res = await exec();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});

describe('/login/reset', () => {
    let email;

    beforeEach(async () => {
        server = app;
        await populateDatabase();
        email = "hkr.hackathon.tester@outlook.com";
    });

    afterEach(async () => {
        server.close();
        await depopulateDatabase();
    });

    const exec = async () => {
        return await request(server)
            .post('/login/reset')
            .send({
                email
            })
    };

    it('should return 400 with invalid email', async function () {
        email = '';
        const res = await exec();

        expect(res.body.error).toMatch('email');
        expect(res.status).toBe(400);
    });

    it('should return 400 with invalid email', async function () {
        email = 'wrong@example.com';
        const res = await exec();

        expect(res.body.error).toMatch('Failed to send mail');
        expect(res.status).toBe(400);
    });

    // it('should return 400 with failed to send mail', async function () {
    //     jest
    //         .spyOn(sendEmail, 'sendEmail')
    //         .mockImplementation(() => {
    //            return new Promise((resolve) => {
    //                resolve({ success: false, message: "Failed to send mail" })
    //            })
    //         });
    //     const res = await exec();
    //
    //     expect(res.body.error).toMatch('to send mail');
    //     expect(res.status).toBe(400);
    // });

    // it('should return 200 with success to send mail', async function () {
    //     jest
    //         .spyOn(sendEmail, 'sendEmail')
    //         .mockImplementation(() => {
    //             return new Promise((resolve) => {
    //                 resolve()
    //             })
    //         });
    //     const res = await exec();
    //
    //     expect(res.body).toEqual('');
    //     expect(res.status).toBe(200);
    // });

});
