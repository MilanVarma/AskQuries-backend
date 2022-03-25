
import question from '../models/Questions.js';

export const postQuestion = async(req,res) =>{
    const data = req.body;
    const newpost = await question(data);
    try {
        newpost.save()
        res.status(200).send(newpost)
    } catch (error) {
        res.status(400).send({message:error.message})
    }

}

export const getAllQuestions = async(req,res) =>{
    const ques = await question.find({})
    try {
        res.status(200).send(ques)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}

export const getQueById = async(req,res) =>{
    const {id} = req.params;
    const ques = await question.findById({_id:id});

    try {
        res.status(200).send(ques);
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}

export const upvote = async(req,res) =>{
    const {id} = req.params;
    const ques = await question.findById(id);

    const index = ques.upvote.findIndex((id) => id === String(req.userId))

    if(index == -1){
        ques.upvote.push(req.userId);
    }
    else{
        ques.upvote = ques.upvote.filter((id) => id !== String(req.userId))
    }

    const updatelike = await question.findByIdAndUpdate(id,ques,{new:true})
    res.send(updatelike);
}

export const downvote = async(req,res) =>{
    const {id} = req.params;
    const ques = await question.findById(id);

    const index = ques.downvote.findIndex((id) => id === String(req.userId))

    if(index == -1){
        ques.downvote.push(req.userId);
    }
    else{
        ques.downvote = ques.downvote.filter((id) => id !== String(req.userId))
    }

    const updatelike = await question.findByIdAndUpdate(id,ques,{new:true})
    res.send(updatelike);
}

export const postComment = async(req,res) =>{
    const {id} = req.params;
    const data = req.body;
    console.log(data.com)

    const post = await question.findById({_id:id})

   
       
   try {
    post.comments.push(data.com);
    const updatedPost = await question.findByIdAndUpdate(id,post,{new:true});
    res.send(updatedPost);
   } catch (error) {
       res.send({message:error.message})
   }
   
}

export const getyourquestions = async(req,res) =>{
    const {id} = req.params;

    const ques = await question.find({creatorId:id})
    res.status(200).send(ques);

}