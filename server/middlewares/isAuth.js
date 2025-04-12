import jwt from 'jsonwebtoken';
import { User } from "../models/User.js";


export const isAuth = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(403).json({
          message: 'Please Login',
        });
      }
  
      const decodeData = jwt.verify(token, process.env.jwt_secret);
      const user = await User.findById(decodeData.userId);
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error('JWT Verification Error:', error);
      res.status(500).json({
        message: 'Login first',
      });
    }
  };


export const isTeacher = (req, res, next) =>{
    try{
        if(req.user.role !== 'teacher'){
            return res.status(403).json({
                message: "You are not teacher", 
            });
        }
        next();
    }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}



export const isAdmin = (req, res, next) =>{
    try{
        if(req.user.role !== 'admin'){
            return res.status(403).json({
                message: "You are not admin", 
            })
        }
    }catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
}