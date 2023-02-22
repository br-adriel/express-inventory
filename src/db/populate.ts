#! /usr/bin/env node

import { Types } from 'mongoose';
import Category, { CategoryType } from '../models/Category';
import Item, { ItemType } from '../models/Item';
import async from 'async';

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const categories: (CategoryType & { _id: Types.ObjectId })[] = [];
const items: (ItemType & { _id: Types.ObjectId })[] = [];

function categoryCreate(name: string, description: string, cb: Function) {
  const categoryDetail = { name, description };
  const category = new Category(categoryDetail);

  category.save((err: any) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(
  name: string,
  description: string,
  category: Types.ObjectId[],
  price: number,
  stock: number,
  cb: Function
) {
  const itemDetail = {
    name,
    description,
    category,
    price,
    stock,
  };

  const item = new Item(itemDetail);
  item.save((err: any) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New item: ' + item);
    items.push(item);
    cb(null, item);
  });
}

function createCategories(cb: any) {
  async.series(
    [
      function (callback: Function) {
        categoryCreate('Caderno', '', callback);
      },
      function (callback: Function) {
        categoryCreate('Escrita', '', callback);
      },
      function (callback: Function) {
        categoryCreate('Pintura e arte', '', callback);
      },
      function (callback: Function) {
        categoryCreate('Papel', '', callback);
      },
      function (callback: Function) {
        categoryCreate(
          'Organização',
          'Produtos que te ajudam a manter tudo no seu devido lugar',
          callback
        );
      },
      function (callback: Function) {
        categoryCreate('Bolsas', 'Mochilas e bolsas de lápis', callback);
      },
      function (callback: Function) {
        categoryCreate('Livros', '', callback);
      },
    ],
    cb
  );
}

function createItems(cb: any) {
  async.parallel(
    [
      function (callback: Function) {
        itemCreate(
          'Caneta azul BIC',
          'Caneta esferográfica de cor azul com ponta 0.7mm',
          [categories[1]._id],
          1.8,
          200,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Caneta preta BIC',
          'Caneta esferográfica de cor preta com ponta 0.7mm',
          [categories[1]._id],
          1.8,
          200,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Caneta vermelha BIC',
          'Caneta esferográfica de cor vermelha com ponta 0.7mm',
          [categories[1]._id],
          1.8,
          200,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Lápis comum',
          'Lápis de madeira',
          [categories[1]._id],
          1.4,
          200,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Lapiseira Faber Castell 0.5',
          'Lapiseira Faber Castell com ponta de 0.5mm',
          [categories[1]._id],
          6.35,
          150,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Lapiseira Faber Castell 0.7',
          'Lapiseira Faber Castell com ponta de 0.7mm',
          [categories[1]._id],
          6.35,
          150,
          callback
        );
      },
      function (callback: Function) {
        itemCreate('Borracha', '', [categories[1]._id], 3, 300, callback);
      },
      function (callback: Function) {
        itemCreate(
          'Conjunto com 12 pontas 0.5',
          '',
          [categories[1]._id],
          5.4,
          300,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Conjunto com 12 pontas 0.7',
          '',
          [categories[1]._id],
          5.8,
          300,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Caderno de desenho 90 folhas',
          '',
          [categories[0]._id, categories[2]._id],
          5.23,
          150,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Caderno 20 matérias tilibra',
          '',
          [categories[0]._id, categories[3]._id],
          30,
          300,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Caderno 15 matérias tilibra',
          '',
          [categories[0]._id, categories[3]._id],
          20,
          300,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Caderno 10 matérias tilibra',
          '',
          [categories[0]._id, categories[3]._id],
          14.9,
          300,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Tinta guaxe coala',
          '6 potes de tinta nas cores vermelho, branco, preto, verde, azul e amarelo',
          [categories[2]._id],
          9.89,
          100,
          callback
        );
      },
      function (callback: Function) {
        itemCreate(
          'Pasta de plástico',
          '',
          [categories[4]._id],
          4,
          130,
          callback
        );
      },
    ],
    cb
  );
}

async.series([createCategories, createItems], function (err: any) {
  if (err) console.log('FINAL ERR: ' + err);
  mongoose.connection.close();
});
