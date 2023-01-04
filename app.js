import request from "request";
import fs from "fs";
import { tickets } from "./tickets.js";

var data = [];

var out = fs.createWriteStream("tickets.txt", { flags: "a" });

for (let i = 0; i < tickets.length; i++) {
  request(
    `https://numfin.com/uk/${tickets[i]}/overview`,
    function (error, response, body) {
      if (error) {
        console.log("Err: " + error);
        return false;
      }

      if (
        response.statusCode == 200 ||
        response.statusCode == 201 ||
        response.statusCode == 202
      ) {
        console.log(
          `https://numfin.com/uk/${tickets[i]}/overview` + " is alive!!"
        );

        return false;
      }

      if (response.statusCode == 301 || response.statusCode == 302) {
        console.log(
          `https://numfin.com/uk/${tickets[i]}/overview` +
            " is redirecting us!!"
        );
        return false;
      }

      if (response.statusCode == 401) {
        console.log(
          "you are unauthorized to " +
            `https://numfin.com/uk/${tickets[i]}/overview`
        );
        return false;
      } else {
        // IF TICKET === 500 status code, I will write this ticket to file
        console.log(
          `https://numfin.com/uk/${tickets[i]}/overview` + " is dead!!"
        );
        data.push(tickets[i]);
        console.log("data length", data.length);
        out.write(tickets[i].toString());
      }
    }
  );
}

out.end();
