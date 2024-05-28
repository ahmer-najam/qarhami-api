const sendStatus = (res, status, message, success) => {
  return res
    .status(status)
    .send({ message, success, source: process.env.API_NAME });
};

module.exports = { sendStatus };
