export const requestURL = `https://api.edamam.com/search?app_id=${
  process.env.APP_ID
}&app_key=${process.env.API_KEY}&from=0&to=50&q=`;
export const param = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
};

export function randomGenerator(limit, count) {
  let numList = [];
  for (let i = 0; i < count; i++) {
    let random = Math.floor(Math.random() * limit);
    while (numList.indexOf(random) !== -1) {
      random = Math.floor(Math.random() * limit);
    }
    numList.push(random);
  }
  return numList;
}
