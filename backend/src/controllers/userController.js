const User = require("../models/User");

const userController = {

    //createUser
    createUser: async (req, res) => {
        const newUser = new User(req.body);
        try{
            const savedUser = await newUser.save();

            res.status(200).json({success:true,message:"Successfully create", data:savedUser,});
        }catch(err){
            res.status(500).json({success:false,message:"Failed to create. Try again",})
        }
    },
    //updateUser
    updateUser:async(req, res)=>{
        const id = req.params.id;
        try{
            const updatedUser = await User.findByIdAndUpdate(id,{
                $set : req.body
            },{new:true});
            res.status(200).json({success:true,message:"Successfully updated", data:updatedUser,});
        }catch(err){
            res.status(500).json({success:false,message:"Failed to update. Try again",})
        }
    },
    //delete user
    deleteUser: async(req,res)=>{
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    //getSingleUser
    getSingleUser:async(req, res)=>{
        const id = req.params.id;
        try{
            const user = await User.findById(id);
            res.status(200).json({success:true,message:"Successful ",data:user});
        }catch(err){
            res.status(404).json({success:false,message:"Not found",})
        }
    },
    //get all users
    getAllUsers : async(req, res) =>{
        try{
            const user = await User.find();
            res.status(200).json(user);
        } catch(err){
           return res.status(500).json(err);
        };
    },
}

module.exports = userController;