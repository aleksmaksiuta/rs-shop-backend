class NotAuthorizedError extends Error {
  public statusCode: number;

  constructor(name = 'Not Authorized', statusCode = 401) {
    super(name);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export default NotAuthorizedError;
