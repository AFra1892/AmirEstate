import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from  'jsonwebtoken'
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
  };

export const signin = async (req,res,next) =>{
  //get data from body
  //authenticate user 
  const {email,password} = req.body;
  // find matched email address in db
  try {
    //check email is exist or not
      const validUser = await User.findOne({email})
      if(!validUser) return next(errorHandler(404,'User not Found!'))
      //password stored in db is hashed so before compare we need to do smt about it
      const validPassword = bcryptjs.compareSync(password,validUser.password)
      if(!validPassword) return next(errorHandler(401,'Wrong Credential!'))
      //CREATING TOKEN
      const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
      const{password:pass,...rest} = validUser._doc
      //SAVE TOKEN AS COOKIE
      res
        .cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
    
  } catch (error) {
    next(error)
    
  }
}