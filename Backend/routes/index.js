import express from "express";
import { Register, Login, Logout, click, editUser, getUsers, deleteUser } from "../controllers/UserController.js";
import { openaiKey, openairequest } from "../controllers/ApiController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
const router = express.Router();
router.patch("/users/:id", editUser);
router.delete("/users/:id", deleteUser);
router.get('/users', verifyToken, getUsers);
router.get('/tes', getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/click', click);
router.get('/api/openai-key', openaiKey);
router.post('/api/openai-request', openairequest);





export default router;