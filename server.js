let express = require("express");
let app = express();
let nodemailer = require("nodemailer");
// const path = require("path");

// const logger = require("morgan");
const cors = require("cors");
// var router = express.Router();
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

// Static folder
// app.use("/public", express.static(path.join(__dirname, "public")));
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const transporter = nodemailer.createTransport({
  service: "outlook",
  port: 461,
  secure: false,
  auth: {
    user: "talikhan@take4media.com",
    pass: "Starfish2019!33@021",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

app.post("/send", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var query = req.body.query;
  var subject = "Customer Query From Take4Media Website";
  var message = `Sender Email: ${email} \n \n message: ${query} `;

  var mail = {
    from: "talikhan@take4media.com",
    to: "tabish_akhan@outlook.com",
    subject: subject,
    text: message,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });

  console.log("Hello");
});

// serve PORT running here
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.info(`server has started on ${PORT}`));

// app.get("/express_backend", (req, res) => {
//   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
//
