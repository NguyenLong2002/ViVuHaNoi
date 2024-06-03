const router = require("express").Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");


//update user
router.put("/:id",middlewareController.verifyUser,userController.updateUser)
//delete user
router.delete("/:id", middlewareController.verifyUser,userController.deleteUser),
//get all user
router.get('/', middlewareController.verifyAdmin, userController.getAllUsers),
//get single user
router.get("/:id",middlewareController.verifyUser, userController.getSingleUser),

module.exports = router;