import request from "request";
import fs from "fs";
import async from "async";
import { tickets } from "./tickets.js"; // array of company names

var data = [];

var out = fs.createWriteStream("tickets.txt", { flags: "a" });

async function checkUrl(url) {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error) {
        console.log("Err: " + error);
        resolve(false);
      }

      if (
        response.statusCode == 200 ||
        response.statusCode == 201 ||
        response.statusCode == 202
      ) {
        console.log(`${url} is alive!!`);
        resolve(false);
      }

      if (response.statusCode == 301 || response.statusCode == 302) {
        console.log(`${url} is redirecting us!!`);
        resolve(false);
      }

      if (response.statusCode == 401) {
        console.log(`You are unauthorized to ${url}`);
        resolve(false);
      } else {
        console.log(`${url} is dead!!`);
        resolve(true);
      }
    });
  });
}

async function main() {
  const requests = tickets.map((ticket) => {
    const url = `https://numfin.com/uk/${ticket}/overview`;
    return checkUrl(url);
  });

  const results = await Promise.all(requests);

  for (let i = 0; i < results.length; i++) {
    if (results[i]) {
      data.push(tickets[i]);
      out.write(tickets[i].toString());
    }
  }

  out.end();
}

main();
