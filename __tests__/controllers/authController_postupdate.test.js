const {post_update} = require('../../controller/authController');
const User = require('../../model/User');

// Test 2 for login system
jest.mock('../../model/User',()=>{
    return jest.fn().mockImplementation(()=>{
        return {
            editPost:()=>{
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
        post:'sdfsdf'
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

it('status code 200 if successfully deletes the post',async ()=>{
    data = await post_update(request, response)
    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.json).toHaveBeenCalledTimes(1)
})
