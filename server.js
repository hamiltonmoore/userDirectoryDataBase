var express = require("express");
const port = process.env.PORT || 8100
const path = require("path");
const app = express();
const data = require('./models/data');
const mustacheExpress = require("mustache-express");

//calling routes:
const indexroutes = require("./otherjsfiles/indexroutes");
const profileroutes = require("./otherjsfiles/profileroutes");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));
app.use("/", indexroutes);
app.use("/profile", profileroutes);

app.listen(port, function () {
    console.log(`server is running on port ${port}!`);
});
