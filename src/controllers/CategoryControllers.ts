import { NextFunction, Request, Response } from 'express';

/** Lista todas as categorias */
export const categories_list_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Lista todas as categorias');
};

/** Retorna detalhes de uma categoria específica */
export const category_detail_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Detalhes de uma categoria');
};

/** Retorna página com formulário para criação de categoria */
export const category_create_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Página de criação de categoria');
};

/** Recebe dados para criação de uma categoria */
export const category_create_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Criação de categoria');
};

/** Retorna página com formulário para atualização de categoria */
export const category_update_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Página de atualização de categoria');
};

/** Recebe dados para atualização de uma categoria */
export const category_update_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Atualização de categoria');
};

/** Retorna página com formulário de confirmação de exclusão de categoria */
export const category_remove_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Página de remoção de categoria');
};

/** Remove categoria com o respectivo id passado */
export const category_remove_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.send('Remoção de categoria');
};
