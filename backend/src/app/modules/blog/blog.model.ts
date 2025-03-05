import { model, Schema } from 'mongoose';
import { BlogCategory, IBlog } from './blog.interface';

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default:
        'https://mailrelay.com/wp-content/uploads/2018/03/que-es-un-blog-1.png',
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(BlogCategory),
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

BlogSchema.pre<IBlog>('validate', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

export const Blog = model<IBlog>('Blog', BlogSchema);
