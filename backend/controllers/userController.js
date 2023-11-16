import User from '../models/userModel.js';
import bcrypt from "bcryptjs";
import generateTokenANdCookie from '../utils/helpers/generateTokenAndCookie.js';

// Get user profile
const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        if(!user){
            res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
        
    } catch (error) {
        console.log(`Error in getUserProfile : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

//signup user 
const signupUser = async (req, res) => {
    try {
        const { name,username, email, password } = req.body;
        const user = await User.findOne({$or: [{email}, {username}]}); // $or is a MongoDB operator that allows us to find documents where at least one of the conditions is true
        if (user) {
            res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10); // 10 is the number of rounds of salting that will be done on the password to make it more secure 
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt generated above 

        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: hashedPassword,
        });

        await newUser.save(); // Save the user to the database 

        if(newUser){
            generateTokenANdCookie(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            });
        }
        else{
            res.status(400).json({message: "Invalid user data"});
        }

    } catch (error) {
        console.error(`Error in signupUser : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

// Login user
const loginUser = async (req, res) => {
    try {
        const {username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // If user is null, then user.password will throw an error, so we use the optional chaining operator (?.) to check if user is null or not. If user is null, then we pass an empty string to the compare function. This will return false and the user will not be logged in.
        if (user && isPasswordCorrect) {
            generateTokenANdCookie(user._id, res);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
            });
        }
        else{
            res.status(400).json({message: "Invalid username or password"});
        }           
    } catch (error) {
        console.log(`Error in loginUser : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

// Logout user
const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge: 0}); // Set the cookie to an empty string and set the maxAge to 0 to delete the cookie 
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.log(`Error in logoutUser : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

// Follow/Unfollow user
const followUnFollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);
    if (id === req.user._id.toString()) {
        res.status(400).json({message: "You cannot follow/unfollow yourself"});
    }
    if(!userToModify || !currentUser){
        res.status(404).json({message: "User not found"});
    }
    const isFollowing = currentUser.following.includes(id);
    if(isFollowing){
        // Unfollow the user
        await User.findByIdAndUpdate(currentUser._id, {$pull: {following: id}});
        await User.findByIdAndUpdate(id, {$pull: {followers: currentUser._id}});
        res.status(200).json({message: "User unfollowed successfully"});
    } else{
        // Follow the user
        await User.findByIdAndUpdate(currentUser._id, {$push: {following: id}});
        await User.findByIdAndUpdate(id, {$push: {followers: currentUser._id}});
        res.status(200).json({message: "User followed successfully"});

    }
        
    } catch (error) {
        console.log(`Error in followUnFollowUser : ${error.message}`);
        res.status(500).json({message: error.message});
    }
}

// Update user
const updateUser = async (req, res) => {
   const { name, username, email, password, profilePic, bio } = req.body;
   const userId = req.user._id;

   try {
    let user = await User.findById(userId);
    if(!user){
        res.status(404).json({message: "User not found"});
    }

if(req.params.id !== userId.toString()){
    res.status(401).json({message: "You cannot update someone else's profile"});
}

    if(password){
        const salt = await bcrypt.genSalt(10); // 10 is the number of rounds of salting that will be done on the password to make it more secure
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt generated above
        user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    await user.save();

    res.status(200).json({message: "User updated successfully", user});

   } catch (error) {
    console.log(`Error in updateUser : ${error.message}`);
    res.status(500).json({message: error.message});
   }

}

export { signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile }