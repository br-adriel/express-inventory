import { NextFunction, Request, Response, Router } from 'express';

const itemRoutes = Router();

itemRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send('Lista todas os itens');
});

itemRoutes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  return res.send('Detalhes de um item');
});

itemRoutes.get('/create', (req: Request, res: Response, next: NextFunction) => {
  return res.send('Página de criação de item');
});

itemRoutes.post(
  '/create',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Criação de item');
  }
);

itemRoutes.get(
  '/:id/update',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Página de atualização de item');
  }
);

itemRoutes.post(
  '/:id/update',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Atualização de item');
  }
);

itemRoutes.get(
  '/:id/remove',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Página de remoção de item');
  }
);

itemRoutes.post(
  '/:id/remove',
  (req: Request, res: Response, next: NextFunction) => {
    return res.send('Remoção de item');
  }
);

export default itemRoutes;
