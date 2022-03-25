import express from 'express';
import auth from '../middleware/auth.js'
import { addUser, getUser, login } from '../controller/Users_controller.js';
import multer from 'multer';
import path from 'path';
const Router = express.Router();

var upload = multer({
    storage: multer.diskStorage({
        destination:(req,res,cb) =>{
            cb(null,"./uploads")
        },
        filename: function(req,file,callback){
            callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
        }
    })
})

Router
.route("/signup")
.post(upload.single("profilephoto"),addUser)

Router
.route("/login")
.post(login)

Router
.route("/getusers/:id")
.get(auth,getUser)


export default Router;
