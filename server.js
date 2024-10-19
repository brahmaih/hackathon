const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/courseSelectionDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Teacher Schema
const teacherSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    researchProjects: String,
    patents: String,
    academicBackground: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);

// API to get all teachers
app.get('/api/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
   });

// API to submit course selection
app.post('/api/submitSelection', (req, res) => {
    // Assuming you'd like to save this data into a CourseSelection model
    const { theoryCourse, teacher } = req.body;
    console.log(`Selected Course: ${theoryCourse}, Teacher: ${teacher}`);
    res.json({ message: 'Course selection submitted successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
