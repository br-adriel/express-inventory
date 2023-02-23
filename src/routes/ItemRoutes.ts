import { Router } from 'express';
import * as itemController from '../controllers/ItemController';

const itemRoutes = Router();

itemRoutes.get('/', itemController.item_list_get);

itemRoutes.get('/create', itemController.item_create_get);
itemRoutes.post('/create', itemController.item_create_post);

itemRoutes.get('/:id', itemController.item_detail_get);

itemRoutes.get('/:id/update', itemController.item_update_get);
itemRoutes.post('/:id/update', itemController.item_update_post);

itemRoutes.get('/:id/remove', itemController.item_remove_get);
itemRoutes.post('/:id/remove', itemController.item_remove_post);

export default itemRoutes;
