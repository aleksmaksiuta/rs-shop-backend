class ForbiddenError extends Error {
  public statusCode: number;

  constructor(name = 'Forbidden', statusCode = 403) {
    super(name);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export default ForbiddenError;
