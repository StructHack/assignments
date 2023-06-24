const pool=require('../config/dbConnection');
const bcrypt = require('bcrypt');
/**
 * User model for the database
 */

class User{
    constructor(email, password, phone_number=''){
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
    }

    async emailExists(email){
        const data = await pool.query(`
                                SELECT * FROM users
                                WHERE email = ?        
                                        `,[email]);
        return data[0]
    }
    /**
     * 
     * @param {email} email 
     * @param {string} password 
     * @param {string} phone_number 
     * @returns 
     */

    async signup(email, password, phone_number){
        const alreadyExists = await this.emailExists(email)
        if(alreadyExists.length > 0){
            return 'Email Already Exists';
        }
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash(password, salt)

        const data = await pool.query(`
                                INSERT INTO users(
                                email, password, phone_number
                                )
                                VALUES(?,?,?)
                                 `,[email, encryptedPassword, phone_number]);
        return data[0];
    }
    /**
     * 
     * @param {email} email 
     * @param {string} password 
     * @returns {Object}
     */

    async login(email, password){
       
        const emailData = await this.emailExists(email);
        if(emailData.length > 0){
           var authPass = emailData[0].password;
        }else{
            return 'Email or Password Incorrect.';
        }
        const auth = await bcrypt.compare(password, authPass);
        if(auth){
            const data = await pool.query(`
                                SELECT id,email,phone_number FROM users
                                WHERE email=? 
                                AND
                                password=?
                                `,[email, authPass]);
            console.log(data[0])
            return data[0]
        }else{
            return 'Email or Password Incorrect.';
        }
    }
    /**
     * update post
     * @param {string} post 
     * @param {int} user_id 
     * @returns {Object}
     */

    async updatePost(post, user_id){
        try{
            const data = await pool.query(`
                                INSERT INTO posts(user_id, posts)
                                VALUES(?,?)
                                    `,[user_id,post]);
            return data;
        }catch(err){
            console.log(err)
        }
    }

    /**
     * 
     * @param {Number} id 
     * @returns {Object}
     */

    async getPosts(id){
        try{
            if(id){
                const data = await pool.query(`
                                        SELECT * from posts
                                        WHERE post_id=?
                                        `,[id]);
                return data;
            }else{
                const data = await pool.query(`SELECT posts.post_id, posts.user_id, posts.posts, users.email from posts inner join users on posts.user_id=users.id`);
                return data;
            }
        }catch(err){
            console.log(err);
        }
    }


    /**
     * delte post 
     * @param {number} post_id 
     * @param {number} user_id 
     * @returns {Object}
     */

    async deletePost(post_id, user_id){
        try{
            if(post_id){
                const data = await pool.query('DELETE FROM posts WHERE post_id=? AND user_id=?',[post_id, user_id]);
                return data;
            }
        }catch(err){
            console.log(err);
        }
    }

    /**
     * 
     * @param {string} posts 
     * @param {number} post_id 
     * @param {number} user_id 
     * @returns {Object}
     */
    async editPost(posts,post_id, user_id){
        try{
            if(post_id){
                const data = await pool.query('UPDATE posts SET posts=? WHERE post_id=? AND user_id=?',[posts,post_id, user_id]);
                return data;
            }
        }catch(err){
            console.log(err);
        }
    }


}

module.exports = User;

