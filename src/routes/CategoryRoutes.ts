import { NextFunction, Request, Response, Router } from 'express';
import * as categoryController from '../controllers/CategoryControllers';

const categoryRoutes = Router();

categoryRoutes.get('/', categoryController.categories_list_get);

categoryRoutes.get('/:id', categoryController.category_detail_get);

categoryRoutes.get('/create', categoryController.category_create_get);
categoryRoutes.post('/create', categoryController.category_create_post);

categoryRoutes.get('/:id/update', categoryController.category_update_get);
categoryRoutes.post('/:id/update', categoryController.category_update_post);

categoryRoutes.get('/:id/remove', categoryController.category_remove_get);
categoryRoutes.post('/:id/remove', categoryController.category_remove_post);

export default categoryRoutes;
