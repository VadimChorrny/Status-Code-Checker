import request from "request";
import write from "write";

const tickets = [
  "WPAY",
  "WPB",
  "WPC",
  "WPH",
  "WPHB",
  "WPI",
  "WPIA",
  "WPIL",
  "WPK",
  "WPL",
  "WPM",
  "WPOB",
  "WPP",
  "WPR",
  "WPRT",
  "WPS",
  "WPU",
  "WPY",
  "WQ9",
  "WQG",
  "WR0",
  "WR1",
  "WR4F",
  "WRAP",
  "WRE",
  "WRG",
  "WRI",
  "WRK",
  "WRKS",
  "WRL",
  "WRLD",
  "WRM",
  "WRN",
  "WRT1V",
  "WRW",
  "WRX",
  "WRX1",
  "WS11",
  "WSBC",
  "WSBCP",
  "WSBF",
  "WSBN",
  "WSBP",
  "WSC",
  "WSE",
  "WSFIN",
  "WSFS",
  "WSG",
  "WSI",
  "WSIND",
  "WSKT",
  "WSL",
  "WSMK",
  "WSO1",
  "WSP",
  "WSR",
  "WSTCSTPAPR",
  "WSTEP",
  "WSTG",
  "WSU",
  "WSV2",
  "WT5",
  "WTAN",
  "WTB",
  "WTBA",
  "WTC",
  "WTCM",
  "WTCMP",
  "WTE",
  "WTER",
  "WTFC",
  "WTFCM",
  "WTFCP",
  "WTH",
  "WTJ",
  "WTK",
  "WTL",
  "WTMA",
  "WTMAR",
  "WTMAU",
  "WTN",
  "WTON",
  "WTRH",
  "WTS",
  "WTU",
  "WTW",
  "WU",
  "WU5",
  "WUC1",
  "WUF1V",
  "WUG",
  "WUG3",
  "WULF",
  "WUW",
  "WV8",
  "WVDA",
  "WVE",
  "WVFC",
  "WVH",
  "WVI",
  "WVJ",
];

var data = [];

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
          `https://numfin.com/uk/${tickets[i]}/overview` + " is up!!"
        );
        data.push(tickets[i]);
        console.log("data length", data.length);
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
        console.log(
          `https://numfin.com/uk/${tickets[i]}/overview` + " is down!!"
        );
      }
    }
  );
}

setTimeout(() => {
  write.sync("new.txt", data.toString(), { newline: true });
}, 30000);
