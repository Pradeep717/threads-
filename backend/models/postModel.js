import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            maxlenght: 500,
        },
        img: {
            type: String,
            default: "",
        },
        likes: {
            //Array of user ids who liked the post
            type:[mongoose.Schema.Types.ObjectId],
            default: [],
        },
        replies: {
            type: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        required: true,
                        ref: "User",
                    },
                    text: {
                        type: String,
                        required: true,
                    },
                    userProfilePic: {
                        type: String,
                    },
                    userName: {
                        type: String,
                        required: true,
                    },  
                }
            ]
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;