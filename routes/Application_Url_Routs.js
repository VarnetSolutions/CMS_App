import { Router } from 'express';
import Appliction from '../controllers/Add_Application_controller.js';
import GetApplication from '../controllers/Get_Application_url.js';
import DeleteApplication from '../controllers/Delete_Url_application.js';
import Get_All_Application_url from '../controllers/Get_All_Application_urls.js';
const router = Router();
router.post('/AddApplication', Appliction);
router.get('/GetAllapplications',Get_All_Application_url);


router.get('/GetApplication',GetApplication)
router.delete('/deleteApplication', DeleteApplication);

export default router;

