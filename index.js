const express = require('express');
const app = express();
const courses = [
    {id:1, name:"course1"},
    {id:2, name:"course2"},
    {id:3, name:"course3"},
    {id:4, name:"course4"},
    {id:5, name:"course5"}
]

app.get('/', (req, res) => {
    res.send("Hello World !")
});
app.get('/api/courses', (req,res)=>{
    res.send(courses);
})
// /api/courses/1
app.get('/api/courses/:id',(req,res)=>{
   const cours =  courses.find(c => c.id === parseInt(req.params.id))
   if(!cours)res.status(404).send("The cours with given ID was not found.")
   res.send(cours)
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
