var express = require("express");
const port = process.env.PORT || 8100
const path = require("path");
const app = express();
const data = require('./models/data');
const mustacheExpress = require("mustache-express");

const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const dbUrl = "mongodb://localhost:27017/userDirectory";

//calling routes:
const indexroutes = require("./otherjsfiles/indexroutes");
const profileroutes = require("./otherjsfiles/profileroutes");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));
app.use("/", indexroutes);
app.use("/profile", profileroutes);

app.get("/home", function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) {
            res.status(500).send(err);
        }

        let data = db.collection("data");

        data.insertMany(data, function (err, savedPeople) {
            if (err) {
                res.status(500).send(err);
            }

            res.send(savedPeople);
            db.close();
        });
    });
});

app.listen(port, function () {
    console.log(`server is running on port ${port}!`);
});
