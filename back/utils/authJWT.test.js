const authJWT = require("./authJWT");

describe('authJWT', () => {
    const res = {
        status: jest.fn(() => res),
        send: jest.fn()
    };
    const next = jest.fn();
    test('accessToken이 지급되지 않았을 경우에 에러를 응답해야함', () => {
        const req = {
            headers: {
                authorization: ""
            }
        };
        authJWT(req, res, next)
        expect(res.status).toBeCalledWith(401);
        expect(res.send).toBeCalledWith({ok: false, message: 'accessToken이 지급되지 않았습니다'});
    })
    
    test('token이 검증되었으면 req에 값을 세팅하고, next를 호출해야 함', () => {
        const req = {
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzNTQ3OTA5LCJleHAiOjE2OTUwODM5MDl9.Pz5vWQn8qK8Hm5D9azPouvFZvhYPOa3XC-gLkotJQh4"
            }
        };
        authJWT(req, res, next)
        expect(next).toBeCalledTimes(1);
    })

    test('accessToken이 만료되었을 경우 에러를 응답해야함', () => {
        const req = {
            headers: {
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzNTQ3NzQwLCJleHAiOjE2NjM1NDc3NDF9.IfRAUjX8sPcbaN8re04SYcFp0uyl0xpwDgVQp8sMMVQ"
            }
        };
        authJWT(req, res, next)
        expect(res.status).toBeCalledWith(402);
        expect(res.send).toBeCalledWith({ok: false, message: 'jwt expired'});
    })
})