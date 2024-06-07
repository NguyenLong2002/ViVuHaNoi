const router = require("express").Router();
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

// Route để kiểm tra xem người dùng có phải là admin không
router.get("/check-admin", middlewareController.verifyAdmin, (req, res) => {
    res.status(200).json({ role: req.user.role });
});

//update user
router.put("/:id",middlewareController.verifyUser,userController.updateUser)
//delete user
router.delete("/:id", middlewareController.verifyUser,userController.deleteUser),
//get all user
router.get('/', middlewareController.verifyAdmin, userController.getAllUsers),
//get single user
router.get("/:id",middlewareController.verifyUser, userController.getSingleUser),

module.exports = router;