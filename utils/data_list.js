const data = [
  {
    id: 1,
    key: "chuck-norris-joke",
    count: 0,
    api: "https://api.chucknorris.io/jokes/random",
    condition: function (name, year) {
      return parseInt(year) <= 2000;
    },
  },
  {
    id: 2,
    key: "kanye-quote",
    count: 0,
    api: "https://api.kanye.rest",
    condition: function (name, year) {
      return parseInt(year) > 2000 && name[0] != "A" && name[0] != "Z";
    },
  },
  {
    id: 3,
    key: "name-sum",
    count: 0,
    api: "",
    condition: function (name, year) {
      return name[0] != "Q";
    },
  },
  {
    id: 4,
    key: "panda-facts",
    count: 0,
    api: "https://some-random-api.ml/facts/panda",
    condition: function (name, year) {
      return name === "Nofar Vered";
    },
  },
];

module.exports = data;
