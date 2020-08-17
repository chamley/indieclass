// include model

// CLASSES - TEACHER
// Create class
// Creates a new database entry in classes table, and in the teacher-class binding table
exports.createClass = async (req, res) => {
  try {
    console.log('create a new class');
    res.send('Create a class');
    res.status(201);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}

// Delete Class
// Removes a new database entry in classes table, and in the teacher-class binding table
exports.deleteClass = async (req, res) => {
  try {
    console.log('delete a class');
    res.send("Class deleted")
    res.status(204);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}

// Get Classes
// Looks up all class ID's in the teacher-class binding table that relate to the teacher ID, and then returns the class entries from the class table for relating the the class IDs
exports.getClasses = async (req, res) => {
  try {
    console.log('getting all class');
    res.send('All classes');
    res.status(200);
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
    res.status(500);
    res.json(error);
  }
}

// CLASSES - STUDENT