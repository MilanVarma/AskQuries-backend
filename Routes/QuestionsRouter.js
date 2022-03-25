import express from 'express';
import { downvote, getAllQuestions, getQueById, getyourquestions, postComment, postQuestion, upvote } from '../controller/Questions_controller.js';
import auth from '../middleware/auth.js'
const Router = express.Router();


Router
.route("/questions")
.post(auth,postQuestion)
.get(auth,getAllQuestions)

Router
.route("/questions/:id")
.get(auth,getQueById)

Router
.route("/like/:id")
.put(auth,upvote)

Router
.route("/dislike/:id")
.put(auth,downvote)

Router
.route("/comment/:id")
.put(auth,postComment)

Router
.route("/allques/:id")
.get(getyourquestions)

export default Router;