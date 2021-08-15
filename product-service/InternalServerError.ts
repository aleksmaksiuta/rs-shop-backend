class InternalServerError extends Error {
  public statusCode: number;

  constructor(name: string, statusCode = 500) {
    super(name);
    this.name = `Internal Server Error: ${name}`;
    this.statusCode = statusCode;
  }
}

export default InternalServerError;
