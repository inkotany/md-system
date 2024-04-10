const mongoose = require('mongoose');
const { Student, generateUniqueStudentCode } = require('./models/student');

mongoose.connect('mongodb://localhost/materDei')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

// function t() {
//     let count = Student.estimatedDocumentCount();
//     return count;
// }

console.log(t());