const {posts_post} = require('../../controller/authController');
const User = require('../../model/User');

// Test 2 for login system
jest.mock('../../model/User',()=>{
    return jest.fn().mockImplementation(()=>{
        return {
            updatePost:()=>{
                return 'test'
            }
        }
    })
});

const request = {
    params:{
       postId:1
    },
    body:{
        post:'sdf'
    }
}

const response = {
    locals:{user:{
        email:'test@test.com',
        password: 'sdf',
        phone_number: 'sdfsd'
    }},
    status: jest.fn(()=>response),
    json: jest.fn(),
    cookie:jest.fn()
}

it('status code 200 if successfully inserts the post',async ()=>{
    data = await posts_post(request, response)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledTimes(1)
})
