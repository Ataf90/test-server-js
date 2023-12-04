
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
    const { error } = validateCourse(req.body);//result.error
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
});
//update data
app.put('/api/courses/:id', (req, res) => {
    // Look up the course is exist
    // if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
      return  res.status(404).send("The course with given ID was not found.")
    //Validate
    // If invalid, return 400 -Bad request
    const { error } = validateCourse(req.body);//result.error
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    // Update course
    course.name = req.body.name;
    // Return the updated course
    res.send(course)
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// function to validation the input
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //Not existing, return 404
    if (!course) 
    return res.status(404).send('The course with given ID was not found.');


    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course was deleted
    res.send(course)
})
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id))
    return res.status(404).send('The course with given ID was not found.');
    res.send(course)
})