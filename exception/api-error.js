module.exports = class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static UnauthorizedError(message) {
    return new ApiError(401, message);
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }

  static ConflictError(message) {
    return new ApiError(409, message);
  }

  static ForbiddenError(message) {
    return new ApiError(403, message);
  }

  static NotFound(message) {
    return new ApiError(404, message);
  }
};
