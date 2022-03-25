import mongoose from "mongoose";

const QuestionsModel = mongoose.Schema({
    creatorId:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    username:String,
    question:String,
    description:String,
    upvote:{
        type:[String],
        default:[]
    },
    downvote:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    }

})

const Questions = new mongoose.model("Questions",QuestionsModel);
export default Questions;