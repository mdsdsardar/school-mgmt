// Reusable helper
exports.pickFields = (obj, fields) => {
  return fields.reduce((result, field) => {
    if (obj[field] !== undefined) {
      result[field] = obj[field];
    }
    return result;
  }, {});
};

// Helper function to filter allowed fields
exports.filterBodyBySchema = (body, model) => {
  const allowedFields = Object.keys(model.schema.paths);
  const filteredBody = {};

  Object.keys(body).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredBody[key] = body[key];
    }
  });
  return filteredBody;
};

//can find filtred MW example in exam controller, and pick MW example in admin/teacher controller.