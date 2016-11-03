const request = require('request-promise');

function wikipediaShow(req, res) {
  request({
    url: "https://en.wikipedia.org/w/api.php",
    method: "GET",
    qs: {
      format: 'json',
      action: 'query',
      prop: req.query.prop,
      titles: req.query.titles
    },
    json: true
  })
  .then((data) => {
    res.json(data);
  });
}

module.exports = {
  show: wikipediaShow
};
