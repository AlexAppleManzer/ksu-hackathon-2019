console.log(`Config in ${process.env.NODE_ENV} mode`);

const config = {
  // riot stuff
  incomm: {
    ApiKey: "",
  },
  mongoDB: {
    connectionString: "",
  },
  google: {
    clientId: "",
  },
};

module.exports = config;
