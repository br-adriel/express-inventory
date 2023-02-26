import async from 'async';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { unlink } from 'fs/promises';
import multer from 'multer';
import Category from '../models/Category';
import Item from '../models/Item';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/item');
  },
  filename: function (req, file, cb) {
    cb(null, 'image-' + Date.now() + '.' + file.originalname.split('.')[1]);
  },
});
const upload = multer({ storage });

function generateItemImagePath(file: Express.Multer.File | undefined): string {
  if (file) {
    const fullPathArray = file.path.split('\\');
    fullPathArray.shift();
    return '/' + fullPathArray.join('/');
  }
  return '';
}

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
      if (!item)
        return res.render('404', {
          title: 'Item não encontrado',
          activeLink: 'item',
        });
      res.render('item/item_detail', {
        item,
        activeLink: 'item',
        title: `${item.name} - Inventory`,
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
      activeLink: 'item',
      title: 'Adicionar item - Inventory',
    });
  });
};

/** Recebe dados para criação de um item */
export const item_create_post = [
  upload.single('image'),

  body('name')
    .trim()
    .escape()
    .isLength({ min: 1, max: 80 })
    .withMessage('Novos itens devem ter um nome de até 80 caracteres'),

  body('description').optional().trim().isLength({ max: 180 }).escape(),

  body('category').optional().toArray(),

  body('price').isNumeric().isFloat({ min: 0.01 }).escape(),

  body('stock').isNumeric().isInt({ min: 0 }),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const categories = await Category.find({});

    if (!errors.isEmpty()) {
      return res.render('item/item_create', {
        title: 'Adicionar item',
        activeLink: 'item',
        categories,
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
      image: generateItemImagePath(req.file),
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
        activeLink: 'item',
        title: 'Editar item - Inventory',
      });
    }
  );
};

/** Recebe dados para atualização de um item */
export const item_update_post = [
  upload.single('image'),

  body('name')
    .trim()
    .isLength({ min: 1, max: 80 })
    .escape()
    .withMessage('Itens devem ter um nome de até 80 caracteres'),

  body('description').optional().trim().isLength({ max: 180 }).escape(),

  body('category').optional().toArray(),

  body('price').isNumeric().isFloat({ min: 0.01 }).escape(),

  body('stock').isNumeric().isInt({ min: 0 }),

  body('password')
    .trim()
    .isLength({ min: 8 })
    .escape()
    .custom((value) => process.env.ADMIN_PASSWORD === value)
    .withMessage('Chave de segurança incorreta'),

  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let categories = [];
      try {
        categories = await Category.find({});
        categories = categories.map((c) => {
          return {
            _id: c._id.toString(),
            name: c.name,
            description: c.description,
          };
        });
      } catch (err) {
        return next(err);
      }

      return res.render('item/item_update', {
        categories,
        title: 'Editar item - Inventory',
        activeLink: 'item',
        errors: errors.array(),
        item: { category: [], ...req.body },
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

    if (req.file) {
      try {
        const itemToUpdate = await Item.findById(req.params.id);
        if (itemToUpdate && itemToUpdate.image) {
          await unlink('public/' + itemToUpdate.image);
        }
        updatedItem.image = generateItemImagePath(req.file);
      } catch (err) {
        return next(err);
      }
    }
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
    return res.render('item/item_remove', {
      item,
      activeLink: 'item',
      title: 'Remover item - Inventory',
    });
  });
};

/** Remove item com o respectivo id passado */
export const item_remove_post = [
  body('password')
    .trim()
    .isLength({ min: 8 })
    .escape()
    .custom((value) => process.env.ADMIN_PASSWORD === value)
    .withMessage('Chave de segurança incorreta'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    Item.findById(req.params.id).exec(async (err, itemToDelete) => {
      if (err) return next(err);

      if (itemToDelete) {
        if (!errors.isEmpty()) {
          return res.render(`item/item_remove`, {
            errors: errors.array(),
            activeLink: 'item',
            title: 'Remover item - Inventory',
            item: itemToDelete,
          });
        }

        if (itemToDelete.image) await unlink('public/' + itemToDelete.image);
        itemToDelete.delete();
        return res.redirect('/item');
      }
      return res.render('404');
    });
  },
];
