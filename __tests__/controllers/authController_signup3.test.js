const {signup_post} = require('../../controller/authController');
const User = require('../../model/User');

// Test 2 for login system
jest.mock('../../model/User',()=>{
    return jest.fn().mockImplementation(()=>{
        return {
            signup:()=>{
                return ''
            }
        }
    })
});

const request = {
    body:{
        email: 'fake_email@fakemail.com',
        password: 'fake_password',
        phone_number: '9836252255'
    }
}

const response = {
    status: jest.fn(()=>response),
    json: jest.fn(),
    cookie:jest.fn()
}

it('If no user is created send 400 status code',async ()=>{
    data = await signup_post(request, response)
    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledTimes(1)
})
