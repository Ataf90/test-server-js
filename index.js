
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
    { id: 4, name: "course4" },
    { id: 5, name: "course5" }
]
app.get('/', (req, res) => {
    res.send("Hello World !")
});
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send("The course with given ID was not found.")
    res.send(course)
});
app.post('/api/courses', (req, res) => {
    const schema = {
        name:Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
});
//update data
app.put('/api/courses/:id',(req,res)=>{
    // Look up the course is exist
   // if not existing, return 404
    const course = courses.find(c=> ci.id=== parseInt(req.params.id));
    if(!course) res.status(400).send("The course with given ID was not found.")
    res.send(course)
    //Validate
    // If invalid, return 400 -Bad request
    const schema = {
        name:Joi.string().min(3).required()
    }
    const result = validateCourse(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
    }
    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course)
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}