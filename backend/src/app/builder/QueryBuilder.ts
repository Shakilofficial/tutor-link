import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search across multiple fields, including nested fields
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      const searchQuery = searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      }));

      this.modelQuery = this.modelQuery.find({
        $or: searchQuery,
      });
    }

    return this;
  }

  // Filter the query based on the provided filters in query object
  filter() {
    const queryObj = { ...this.query };

    // Exclude non-filterable fields like searchTerm, sort, limit, etc.
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    // Apply filters for any field, including nested fields
    Object.keys(queryObj).forEach((key) => {
      // If the key is a nested field (e.g., 'user.name'), apply regex search
      if (queryObj[key] && typeof queryObj[key] === 'string') {
        queryObj[key] = { $regex: queryObj[key], $options: 'i' };
      }
    });

    // Apply the filtering to the model query
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  // Sort the results based on the sort query
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);

    return this;
  }

  // Paginate the query results
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // Select specific fields for the query result
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // Count the total number of documents matching the query
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }

  // Optional: Apply price range filter
  priceRange(minPrice?: number, maxPrice?: number) {
    const priceFilter: Record<string, unknown> = {};
    if (minPrice !== undefined) priceFilter.$gte = minPrice;
    if (maxPrice !== undefined) priceFilter.$lte = maxPrice;

    if (minPrice !== undefined || maxPrice !== undefined) {
      this.modelQuery = this.modelQuery.find({
        hourlyRate: priceFilter,
      } as FilterQuery<T>);
    }

    return this;
  }
}

export default QueryBuilder;
