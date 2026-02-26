// const request = require('supertest');
// const {describe, it, expect } = require('@jest/globals');
// const app = require('../../lib/app/app.js');

// describe('feature testing', () => {
//     it('should mount on /secret', async () =>
//         request(app).get('/secret/play')
//             .expect(200)
//             .expect('Content-Type', /text\/plain/)
//             .expect(res => {
//                 expect(res.text).toMatchSnapshot();
//             })
//     );

//     it('should respond with 404 for unknown routes', async () =>
//         request(app).get('/unknown')
//             .expect(404)
//             .expect('Content-Type', /text\/plain/)
//             .expect(res => {
//                 expect(res.text).toMatchSnapshot();
//             })
//     );
// });