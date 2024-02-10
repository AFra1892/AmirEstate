import { errorHandler } from "../utils/error";
import bcryptjs from 'bcryptjs'
import User from "../models/user.model";
export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async(req,res,next)=>{
  //this has a extra step (authenticate)
  if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only update your own account'))
  try {
    if(req.body.passwaord){
      req.body.passwaord =  bcryptjs.hashSync(req.body.passwaord,10)
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id ,{
      $set:{
        username:req.body.username,
        email:req.body.email,
        passwaord:req.body.passwaord
      }
    },{new:true})

    const {passwaord,...rest} = updateUser._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}