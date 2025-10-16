import { HTTP_STATUS_CODES } from '../constants/http.js';

export class ApiResponse {

  constructor(statusCode, message, data = null, success = true) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
    this.timestamp = new Date().toISOString();
  }

  static success(data = null, message = 'Success', statusCode = HTTP_STATUS_CODES.OK) {
    return new ApiResponse(statusCode, message, data, true);
  }

  static accepted(data = null, message = 'Accepted', statusCode = HTTP_STATUS_CODES.ACCEPTED) {
    return new ApiResponse(statusCode, message, data, true);
  }

  static created(data = null, message = 'Created', statusCode = HTTP_STATUS_CODES.CREATED) {
    return new ApiResponse(statusCode, message, data, true);
  }

  static error(data = null, message = 'Internal Server Error', statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
    return new ApiResponse(statusCode, message, data, false);
  }

  static unauthorized(data = null, message = 'Unauthorized', statusCode = HTTP_STATUS_CODES.UNAUTHORIZED) {
    return new ApiResponse(statusCode, message, data, false);
  }

  static forbidden(data = null, message = 'Forbidden', statusCode = HTTP_STATUS_CODES.FORBIDDEN) {
    return new ApiResponse(statusCode, message, data, false);
  }
  
  static badRequest(data = null, message = 'Bad Request', statusCode = HTTP_STATUS_CODES.BAD_REQUEST) {
    return new ApiResponse(statusCode, message, data, false);
  }

  static notFound(data = null, message = 'Not Found', statusCode = HTTP_STATUS_CODES.NOT_FOUND) {
    return new ApiResponse(statusCode, message, data, false);
  }

  toJSON() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp
    };
  }
}