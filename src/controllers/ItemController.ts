import { NextFunction, Request, Response } from 'express';

/** Lista todos os items */
export const item_list_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Lista todas os itens');
};

/** Retorna detalhes de um item específica */
export const item_detail_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Detalhes de um item');
};

/** Retorna página com formulário para criação de item */
export const item_create_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Página de criação de item');
};

/** Recebe dados para criação de um item */
export const item_create_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Criação de item');
};

/** Retorna página com formulário para atualização de item */
export const item_update_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Página de atualização de item');
};

/** Recebe dados para atualização de um item */
export const item_update_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Atualização de item');
};

/** Retorna página com formulário de confirmação de exclusão de item */
export const item_remove_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Página de remoção de item');
};

/** Remove item com o respectivo id passado */
export const item_remove_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Remoção de item');
};
