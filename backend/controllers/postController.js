import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = async (req, res) => {
    try {
        const {postedBy, text, img} = req.body;
        if(!postedBy || !text){
            return res.status(400).json({message: "PostedBy and text field are required"});
        }
        const user = await User.findById(postedBy);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        if(user._id.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "You cannot create post for other users"});
        }

        const maxLength = 500;
        if(text.length > maxLength){
            return res.status(400).json({message: `Text cannot be more than ${maxLength} characters`});
        }

        const newPost = new Post({postedBy, text, img});

        await newPost.save();
        
        res.status(201).json({message: "Post created successfully", newPost});      
    } catch (error) {
        console.log(`Error in createPost : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({post});
        
    } catch (error) {
        console.log(`Error in getPost : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        if(post.postedBy.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "You cannot delete other user's post"});
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({message: "Post deleted successfully"});
        
    } catch (error) {
        console.log(`Error in deletePost : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

const likeUnLikePost = async (req, res) => {
    try {
        const {id:postId} = req.params;
        const userId = req.user._id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        if(!userId){
            return res.status(401).json({message: "You need to login to like/unlike a post"});
        }
        const userLikedPost = post.likes.includes(userId);
        if(userLikedPost){
            // Unlike the post
            await Post.updateOne({_id:postId}, {$pull:{likes: userId}});
            res.status(200).json({message: "Post unliked successfully"});
        } else{
            // Like the post
            post.likes.push(userId);
            await post.save();
            res.status(200).json({message: "Post liked successfully"});
        }
        
    } catch (error) {
        console.log(`Error in likeUnLikePost : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

const replyToPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const {text} = req.body;
        const userProfilePic = req.user.profilePic;
        const userName = req.user.username;
        console.log(req.user)
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        if(!userId){
            return res.status(401).json({message: "You need to login to reply to a post"});
        }
        if(!text){
            return res.status(400).json({message: "Text field is required"});
        }
        const reply = {
            userId,
            text,
            userProfilePic,
            userName,
        }
        post.replies.push(reply);
        await post.save();
        res.status(200).json({message: "Replied to post successfully", post});

        
    } catch (error) {
        console.log(`Error in replyToPost : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

const getFeedPost = async (req, res) =>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const following = user.following;
        const feedPosts = await Post.find({postedBy:{$in: following}}).sort({createdAt: -1});  
        res.status(200).json({feedPosts});

        
    } catch (error) {
        console.log(`Error in postFeedback getting : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}


export  {createPost, getPost, deletePost, likeUnLikePost, replyToPost, getFeedPost};