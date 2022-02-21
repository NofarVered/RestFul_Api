const axios = require("axios");
const { func } = require("joi");
async function getResponse(data, name, birth_year) {
  const optional = data.filter(
    (item) => item.condition(name, birth_year) === true
  );
  const rndAns = optional[Math.floor(Math.random() * optional.length)];
  rndAns.count += 1;
  if (rndAns.id === 3) {
    const sum = alphNumbers(name);
    return {
      type: rndAns.key,
      result: sum,
    };
  } else {
    const res = await axios.get(`${rndAns.api}`);
    return {
      type: rndAns.key,
      result:
        rndAns.id === 1
          ? res.data.value
          : rndAns.id === 2
          ? res.data.quote
          : res.data.fact,
    };
  }
}

function alphNumbers(name) {
  let str = name.toUpperCase();
  let curent_sum = 0;
  for (let i = 0; i < name.length; i++) {
    if (name[i] !== " ") {
      curent_sum += str.charCodeAt(i) - 64;
    }
  }
  return curent_sum;
}
function getRequests(data) {
  const sumReq = data.reduce(function (sum, current) {
    return sum + current.count;
  }, 0);
  return sumReq;
}

module.exports = { getResponse, getRequests };
