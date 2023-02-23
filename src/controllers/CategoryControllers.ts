import async from 'async';
import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';
import Category, { CategoryType } from '../models/Category';
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
export const category_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Novas categorias precisam ter um nome'),

  body('description').optional().trim().escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('category_create', {
        category: req.body,
        errors: errors.array(),
      });
      return;
    }

    const newCategory = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    newCategory.save((err) => {
      if (err) return next(err);
      res.redirect(newCategory.url);
    });
  },
];

/** Retorna página com formulário para atualização de categoria */
export const category_update_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Category.findById(req.params.id).exec((err, category) => {
    if (err) return next(err);
    if (!category) return res.render('404');

    return res.render('category_update', { category });
  });
};

/** Recebe dados para atualização de uma categoria */
export const category_update_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('A categoria precisa ter um nome'),

  body('description').optional().trim().escape(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('category_update', {
        category: req.body,
        errors: errors.array(),
      });
      return;
    }

    const updatedCategory = new Category({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
    });

    Category.findByIdAndUpdate(req.params.id, updatedCategory, {}, (err) => {
      if (err) return next(err);
      res.redirect(updatedCategory.url);
    });
  },
];

/** Retorna página com formulário de confirmação de exclusão de categoria */
export const category_remove_get = (
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
      return res.render('category_remove', {
        category: results.category,
        items_count: results.items_count,
      });
    }
  );
};

/** Remove categoria com o respectivo id passado */
export const category_remove_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Category.findByIdAndRemove(req.params.id, (err: any) => {
    if (err) return next(err);
    return res.redirect('/category');
  });
};
