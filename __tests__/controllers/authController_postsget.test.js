const {posts_get} = require('../../controller/authController');
const User = require('../../model/User');

// Test 2 for login system
jest.mock('../../model/User',()=>{
    return jest.fn().mockImplementation(()=>{
        return {
            getPosts:()=>{
                return 'test'
            }
        }
    })
});

const request = {
    params:{
       postId:1
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

it('status code 200 if successfully retrieves the post',async ()=>{
    data = await posts_get(request, response)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledTimes(1)
})
