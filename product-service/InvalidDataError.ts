class InvalidDataError extends Error {
  public statusCode: number;

  constructor(name = 'Invalid Data', statusCode = 400) {
    super(name);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export default InvalidDataError;
