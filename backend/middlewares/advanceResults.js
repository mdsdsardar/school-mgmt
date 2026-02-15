// //take model, populate

// const advanceResults = (model, populate) => {
//   return async (req, res, next) => {
//     let TeacherQuery = model.find();
//     if (req.query.name) {
//       TeacherQuery = TeacherQuery.find({
//         name: { $regex: req.query.name, $options: "i" },
//       });
//     }
//     //convert query strings to Number and enable pages into it.
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 2;
//     const skip = (page - 1) * limit;
//     //get total records.
//     const total = await model.countDocuments();
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     if (populate) {
//       TeacherQuery = TeacherQuery.populate(populate);
//     }
//     //pagination results.
//     const pagination = {};
//     //add next.
//     if (endIndex < total) {
//       pagination.next = {
//         page: page + 1,
//         limit,
//       };
//     }
//     //add previous.
//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit,
//       };
//     }
//     const teacher = await TeacherQuery.find().limit(limit).skip(skip);
//     res.results = {
//       status: "success",
//       message: `${model.modelName} fetched succesfully`,
//       total,
//       pagination,
//       results: teacher.length,
//       data: teacher,
//     };
//     next();
//   };
// };

// module.exports = advanceResults;

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.countQuery = null;
    this.resPerPage = null;
    this.currentPage = null;
  }
  search() {
    const keyword = this.queryStr.name
      ? {
          name: {
            $regex: this.queryStr.name,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });

    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    //remove feilds from Query? It'll remove from variable but not from actual req.query.
    const removeFields = ["name", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    //Advance filter for price, rating etc.
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    // Store count query BEFORE applying pagination
    this.countQuery = this.query.model.countDocuments(this.query.getQuery());
    this.resPerPage = resPerPage;
    this.currentPage = currentPage;
    // Apply pagination
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
  async execute() {
    // Execute both queries in parallel
    const [totalCount, data] = await Promise.all([this.countQuery, this.query]);
    const totalPages = Math.ceil(totalCount / this.resPerPage);

    return {
      data,
      pagination: {
        currentPage: this.currentPage,
        resPerPage: this.resPerPage,
        totalCount,
        totalPages,
        hasNextPage: this.currentPage < totalPages,
        hasPrevPage: this.currentPage > 1,
      },
    };
  }
}

module.exports = APIFeatures;

//This needs to be implemented in almost all the controller.