import { Schema, Types, model } from 'mongoose';

export type ItemType = {
  name: string;
  description?: string;
  category: Types.ObjectId[];
  price: number;
  stock: number;
  url: string;
};

const ItemSchema = new Schema<ItemType>({
  name: { type: String, required: true, maxlength: 80 },
  description: { type: String, maxlength: 180 },
  category: [{ type: Types.ObjectId, ref: 'Category' }],
  price: { type: Number, min: 0.01, required: true },
  stock: { type: Number, required: true, min: 0 },
});

ItemSchema.virtual('url').get(function (
  this: ItemType & { _id: Types.ObjectId }
) {
  return `/item/${this._id}`;
});

export default model<ItemType>('Item', ItemSchema);
