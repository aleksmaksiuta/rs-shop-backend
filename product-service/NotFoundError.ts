class NotFoundError extends Error {
  public statusCode: number;

  constructor(name, statusCode = 404) {
    super(name);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export default NotFoundError;
