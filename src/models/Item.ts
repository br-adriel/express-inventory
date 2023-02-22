import { Schema, Types, model } from 'mongoose';

type Item = {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  category: Types.ObjectId[];
  price: number;
  stock: number;
};

const ItemSchema = new Schema<Item>({
  name: { type: String, required: true, maxlength: 80 },
  description: { type: String, maxlength: 180 },
  category: [{ type: Types.ObjectId, ref: 'Category' }],
  price: { type: Number, min: 0.01, required: true },
  stock: { type: Number, required: true, min: 0 },
});

ItemSchema.virtual('url').get(function (this: Item) {
  return `/item/${this._id}`;
});

export default model<Item>('Item', ItemSchema);
