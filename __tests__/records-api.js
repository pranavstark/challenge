"use strict";

/**
 * Dependencies
 */

const mongoose = require("mongoose");
const app = require('../server');
const request = require('supertest');
// const records = mongoose.model('records');
const agent = request.agent(app);

/**
 * Check records api
 */

describe("API:Records", () => {

    //route exists or not
    test("Route should exist", async () => {
        const data = await agent.post('/api/v1/records');
        expect(data.status).not.toBe(404);
    });

    //invalid request
    test("Should return bad request error on invalid request", async () => {
        const data = await agent.post('/api/v1/records').send({ 'invalidkey': 'invalidvalue' });
        expect(data.status).toBe(400);
    });

    //Start Date can not be greater than end date
    test("Should send appropriate error message if start date is greater than end date", async () => {
        const reqBody = {
            "startDate": "2020-01-26",
            "endDate": "2018-02-02",
            "minCount": 2700,
            "maxCount": 3000
        }
        const data = await agent.post('/api/v1/records').send(reqBody);
        expect(data.body.code).not.toBe(0);
        expect(data.body.msg).toBe("The endDate must be after startDate.");
    });


    //Min count can not be greater than end date
    test("Should send appropriate error message if minCount is greater than maxCount", async () => {
        const reqBody = {
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 3100,
            "maxCount": 3000
        }
        const data = await agent.post('/api/v1/records').send(reqBody);
        expect(data.body.code).not.toBe(0);
        expect(data.body.msg).toBe("The maxCount must be after minCount.");
    });
    
    //Fetch records on successfull request
    test("Should fetch records on successful request", async () => {
        const reqBody = {
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 0,
            "maxCount": 5
        };
        const data = await agent.post('/api/v1/records').send(reqBody);
        expect(data.body.code).toBe(0);
        expect(data.body.records).toEqual(expect.arrayContaining([]));
    });

    //Validate records payload on successfull request
    test("Should fetch valid records", async () => {
        const reqBody = {
            "startDate": "2016-01-26",
            "endDate": "2018-02-02",
            "minCount": 0,
            "maxCount": 5
        };
        const expectedRecords = [
            {
                "key": "HFrLrkmu",
                "createdAt": "2016-06-13T14:21:11.684Z",
                "totalCount": 4
            }
        ];
        const data = await agent.post('/api/v1/records').send(reqBody);
        expect(data.body.code).toBe(0);
        expect(data.body.records).toEqual(expect.arrayContaining(expectedRecords));
    });

});

/**
 * Close db connection on test completion
 */

afterAll(async done => {
    await mongoose.connection.close();
    done();
});


