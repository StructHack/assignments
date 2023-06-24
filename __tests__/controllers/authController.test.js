const {login_post} = require('../../controller/authController');
const User = require('../../model/User');

// Test 1 for login system
jest.mock('../../model/User',()=>{
    return jest.fn().mockImplementation(()=>{
        return {
            login:()=>{
                return 'Email or Password Incorrect.'
            }
        }
    })
});

const request = {
    body:{
        email: 'fake_email@fakemail.com',
        password: 'fake_password'
    }
}

const response = {
    status: jest.fn(()=>response),
    json: jest.fn()
}

it('Should send a status code of 400 if user\'s email/password is wrong when logging in.',async ()=>{
    data = await login_post(request, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledTimes(1)
})
