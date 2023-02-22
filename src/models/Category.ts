import { Schema, Types, model } from 'mongoose';

type Category = {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
};

const CategorySchema = new Schema<Category>({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, maxLength: 180 },
});

CategorySchema.virtual('url').get(function (this: Category) {
  return `/category/${this._id}`;
});

export default model<Category>('Category', CategorySchema);
