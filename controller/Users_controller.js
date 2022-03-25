import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';



export const addUser = async(req,res) =>{
    const data = req.body;
    console.log(data)
    console.log(req.file);
    const username = await User.findOne({username:data.username})
    const email = await User.findOne({email:data.email})

    if(username){
        res.status(400).send({message:"User already exists"})
    }
    else if(email){
        res.status(400).send({message:"Email already exists"})
    }
    else{
        const saltRound = await bcrypt.genSalt(4);
        const hashPass = await bcrypt.hash(data.password,saltRound)
        const newuser = await User({...data,password:hashPass,profilephoto:req.file.filename});

        try {
            newuser.save()
            res.status(200).send(newuser);
        } catch (error) {
            res.status(400).send({message:error.message})
        }
    }

   

}



export const login = async(req,res) =>{
    const {username,password} = req.body;
    console.log(username)
    console.log(password)

    const checkUser = await User.findOne({username:username});
    

    if(checkUser){
        const StoredPassword = checkUser.password;
        const CorrectPassword = await bcrypt.compare(password,StoredPassword)

        if(CorrectPassword){
            const token = jwt.sign({id:checkUser._id},process.env.SECRET_KEY)
            res.send({
            message:"Logged in",
            token:token,
            id:checkUser._id,
            firstname:checkUser.firstname,
            lastname:checkUser.lastname,
            username:checkUser.username,
            dp:checkUser.profilephoto,
            email:checkUser.email
        });
        }
        else{
            res.status(400).send({message:"Invalid credentials"});
        }

    }
    else{
        res.status(400).send({message:"Invalid credentials"})
    }

}

export const getUser = async(req,res) =>{
    const {id} = req.params;
    const user = await User.findById({_id:id})
   try {
       res.status(200).send(user)
   } catch (error) {
       res.send({message:error.message})
   }
   
}