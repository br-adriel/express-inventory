import { Schema, Types, model } from 'mongoose';

export type CategoryType = {
  name: string;
  description?: string;
};

const CategorySchema = new Schema<CategoryType>({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, maxLength: 180 },
});

CategorySchema.virtual('url').get(function (
  this: CategoryType & { _id: Types.ObjectId }
) {
  return `/category/${this._id}`;
});

export default model<CategoryType>('Category', CategorySchema);
