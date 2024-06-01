const User = require("../models/User");

const userController = {
    //get all users
    getAllUsers : async(req, res) =>{
        try{
            const user = await User.find();
            res.status(200).json(user);
        } catch(err){
           return res.status(500).json(err);
        };
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
}

module.exports = userController;