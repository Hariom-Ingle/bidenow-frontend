import express from 'express';
import { getAllItems, getAllUsers, getAuctionDetail, updateAuctionStatus, toggleIsFeatured,getFeaturedAuctions} from '../controllers/admin.controller.js';
import { getUserById } from '../controllers/admin.controller.js';

const router = express.Router();
 
// Admin route to fetch all users
router.get('/users', getAllUsers);
router.get('/user-details/:id', getUserById);
router.get('/getAllItems',  getAllItems);
router.get('/auction-detail/:id',getAuctionDetail );
router.get('/featured-auctions',getFeaturedAuctions );
router.post('/update-status/:id',updateAuctionStatus );
router.post('/toogle-isfeatured/:id',toggleIsFeatured );

export default router;
