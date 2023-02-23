import async from 'async';
import { NextFunction, Request, Response } from 'express';
import Category from '../models/Category';
import Item from '../models/Item';

/** Lista todas as categorias */
export const categories_list_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Category.find().exec((err, categories) => {
    if (err) return next(err);
    return res.render('category_list', {
      categories,
    });
  });
};

/** Retorna detalhes de uma categoria específica */
export const category_detail_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback);
      },
      items_count(callback) {
        Item.find({ category: req.params.id }).count().exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      res.render('category_detail', {
        ...results,
      });
    }
  );
};

/** Retorna página com formulário para criação de categoria */
export const category_create_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.render('category_create');
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
