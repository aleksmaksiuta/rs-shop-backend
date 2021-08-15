class InternalServerError extends Error {
  public statusCode: number;

  constructor(name = 'Internal Server Error', statusCode = 500) {
    super(name);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export default InternalServerError;
