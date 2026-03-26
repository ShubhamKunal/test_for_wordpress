const formatResponse = (success, data = null, message = '') => {
  return {
    success,
    data,
    message,
  };
};

module.exports = { formatResponse };
