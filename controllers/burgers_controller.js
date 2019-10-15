var burger = require("../models/burger.js");
var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {

    burger.burgerSelect((data) => {
        var hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });

});

router.post("/api/addburger", (req, res) => {
    burger.burgerInsert(req.body.burger_name, (result) => {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", (req, res) => {
    burger.burgerUpdate(req.body.burger_name, req.params.id, (result) => {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

router.put("/api/isdevoured/:id", (req, res) => {
    burger.eatUpdate(req.body.devoured, req.params.id, (result) => {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

module.exports = router;