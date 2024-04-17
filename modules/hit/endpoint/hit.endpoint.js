module.exports = function (app) {
  app.ws('/api/hit/', (req, res) => {
    return res.status(404).send(false);
  });
};
