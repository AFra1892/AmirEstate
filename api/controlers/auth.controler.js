import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async(req,res) =>{
    const {username,email,password} = req.body; //getting data from browser
    const hashedPassword = bcryptjs.hashSync(password,10) //hashing password
    const newUser = new User({username,email,password:hashedPassword}); //create a user in db using data
    try {
        await newUser.save(); //using await becuase it might take some time for saving user
        res.status(201).json('User created successfuly!')
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}