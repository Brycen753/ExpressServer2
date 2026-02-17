const request = require('supertest');
const {describe, it, expect } = require('@jest/globals');
const app = require('../../lib/app/app.js');

describe('end point testing', () => {
    it('should respond to /hello route', async () =>
        request(app).get('/hello')
            .expect(200)
            .expect('Content-Type', /text\/plain/)
            .expect(res => {
                expect(res.text).toMatchSnapshot();
            })
    );

    it('should respond with 404 for unknown routes', async () =>
        request(app).get('/unknown')
            .expect(404)
            .expect('Content-Type', /text\/plain/)
            .expect(res => {
                expect(res.text).toMatchSnapshot();
            })
    );
});