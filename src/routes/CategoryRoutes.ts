import { NextFunction, Request, Response, Router } from 'express';

const categoryRoutes = Router();

categoryRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send('Lista todas as categorias');
});

categoryRoutes.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Detalhes de uma categoria');
  }
);

categoryRoutes.get(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Página de criação de categoria');
  }
);

categoryRoutes.post(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Criação de categoria');
  }
);

categoryRoutes.get(
  '/:id/update',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Página de atualização de categoria');
  }
);

categoryRoutes.post(
  '/:id/update',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Atualização de categoria');
  }
);

categoryRoutes.get(
  '/:id/remove',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Página de remoção de categoria');
  }
);

categoryRoutes.post(
  '/:id/remove',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Remoção de categoria');
  }
);

export default categoryRoutes;
