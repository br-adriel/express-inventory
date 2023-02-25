import async from 'async';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Category from '../models/Category';
import Item from '../models/Item';

/** Lista todos os items */
export const item_list_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Item.find()
    .populate('category')
    .exec((err, items) => {
      if (err) return next(err);
      return res.render('item/item_list', {
        items,
        activeLink: 'item',
        title: 'Itens - Inventory',
      });
    });
};

/** Retorna detalhes de um item específica */
export const item_detail_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Item.findById(req.params.id)
    .populate('category')
    .exec((err, item) => {
      if (err) return next(err);
      res.render('item/item_detail', {
        item,
      });
    });
};

/** Retorna página com formulário para criação de item */
export const item_create_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Category.find({}).exec((err, categories) => {
    if (err) return next(err);
    return res.render('item/item_create', {
      categories,
    });
  });
};

/** Recebe dados para criação de um item */
export const item_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 80 })
    .escape()
    .withMessage('Novos itens devem ter um nome de até 80 caracteres'),

  body('description').optional().trim().isLength({ max: 180 }).escape(),

  body('category').optional().toArray(),

  body('price').isNumeric().isFloat({ min: 0.01 }).escape(),

  body('stock').isNumeric().isInt({ min: 0 }),

  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.category);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('item/item_create', {
        errors: errors.array(),
        item: req.body,
      });
    }

    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });
    newItem.save((err) => {
      if (err) return next(err);
      return res.redirect(newItem.url);
    });
  },
];

/** Retorna página com formulário para atualização de item */
export const item_update_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  async.parallel(
    {
      categories(callback) {
        Category.find({}).exec(callback);
      },
      item(callback) {
        Item.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) return next(err);
      return res.render('item/item_update', {
        ...results,
      });
    }
  );
};

/** Recebe dados para atualização de um item */
export const item_update_post = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 80 })
    .escape()
    .withMessage('Itens devem ter um nome de até 80 caracteres'),

  body('description').optional().trim().isLength({ max: 180 }).escape(),

  body('category').optional().toArray(),

  body('price').isNumeric().isFloat({ min: 0.01 }).escape(),

  body('stock').isNumeric().isInt({ min: 0 }),

  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.category);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('item/item_update', {
        errors: errors.array(),
        item: req.body,
      });
    }

    const updatedItem = new Item({
      _id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    });

    Item.findByIdAndUpdate(req.params.id, updatedItem, {}, (err) => {
      if (err) return next(err);
      return res.redirect(updatedItem.url);
    });
  },
];

/** Retorna página com formulário de confirmação de exclusão de item */
export const item_remove_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Item.findById(req.params.id).exec((err, item) => {
    if (err) return next(err);
    return res.render('item/item_remove', { item });
  });
};

/** Remove item com o respectivo id passado */
export const item_remove_post = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Item.findByIdAndRemove(req.params.id, {}, (err) => {
    if (err) return next(err);
    return res.redirect('/item');
  });
};
