const fetch = require("node-fetch");
const express = require("express");
const app = express();
const module_queries = require("./utils/queries");
const module_validation = require("./utils/validation");
const data = require("./utils/data_list");
let allusers = [];
app.get("/api/surprise", async (req, res) => {
  const name = req.query.name;
  const birth_year = req.query.birth_year;
  const value = await module_validation.authSchema.validate(req.query);
  if (value.error) {
    res.status(400).send(value.error.details[0].message);
    return;
  }
  const response = await module_queries.getResponse(data, name, birth_year);
  res.status(200).json(response);
  allusers.push({
    username: name,
    useryear: birth_year,
    userapi: response.type,
  });
});

app.get("/api/all", (req, res) => {
  res.status(200).json(allusers);
});

app.delete("/api/deletebyyear", (req, res) => {
  res.status(200);
  const year = req.query.year;
  const new_allusers = allusers.filter((a) => a.useryear != year);
  allusers = new_allusers;
});
app.get("/api/stats", async (req, res) => {
  const sumRequests = module_queries.getRequests(data);
  res.status(200).json({
    requests: sumRequests,
    distribution:
      sumRequests == 0
        ? []
        : data.map((item) => {
            return {
              type: item.key,
              count: item.count,
            };
          }),
  });
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log("listening on port", port));

module.exports = server;
