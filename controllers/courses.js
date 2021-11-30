const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const CourseModel = mongoose.model("Course");

router.get("/add", (req, res)=>{
    res.render("add-course");
});
router.post("/add", (req, res)=>{
    // console.log(req.body);

    var course = new CourseModel();
    course.courseName = req.body.courseName;
    course.courseDuration = req.body.courseDuration;
    course.courseFee = req.body.courseFee;
    course.courseId = Math.ceil(Math.random() * 100000000)+ "";
    course.save((err, docs)=>{
        if(!err) {
            // res.redirect("/course/list");
            res.json({ message: "Successfull", status: "OK" });
        } else {
            res.send("Error Occured");
        }
    });
});

router.get("/list", (req, res)=>{

    // seeting
    // var course = new CourseModel();
    // course.courseName = "Node JS";
    // course.courseId = "2";
    // course.save();

    // getting
    CourseModel.find((err, docs)=>{
        if(!err) {
            console.log(docs);
            res.render("list", {
                result: docs
            });
        } else {
            res.send("Error");
        }
    })    
});

module.exports = router;