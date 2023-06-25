class FOBIDDEN_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = FOBIDDEN_ERROR;
