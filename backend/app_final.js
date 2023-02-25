const express = require("express");
const { FronteggContext, withAuthentication } = require("@frontegg/client");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const port = 13000;

// app.use("/dashboard", withAuthentication({ roles: ["admin"] }));
app.use("/admin", withAuthentication({ roles: ["admin"] }));

// Set up a route to handle user authorization using Frontegg's withAuthentication middleware
app.get("/dashboard", withAuthentication({ roles: ["Admin"] }), (req, res) => {
  console.log("Frontegg context:", req.frontegg);
  const { email, roles } = req.frontegg.user;
  const fegg = req.frontegg.user;
  // for (var key in fegg) {
  //   if (fegg.hasOwnProperty(key)) {
  //     console.log(key);
  //   }
  // }
  // console.log("diff");
  // for (var key in res) {
  //   if (res.hasOwnProperty(key)) {
  //     console.log(key);
  //   }
  // }
  console.log(email, roles);
  res.send(
    `You did it, let's get dinner soon ?, and the user email is ${email} and they have roles ${roles}`
  );
});

// Set up a route to handle admin authorization using Frontegg's withAuthentication middleware
app.get(
  "/admin",
  withAuthentication({ roles: ["admin"], permissions: ["read"] }),
  (req, res) => {
    res.send("Welcome, Admin!");
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
