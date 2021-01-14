const fs = require("fs");
const path = require("path");
const { parseJsonToObject } = require("./helpers");

// Container for module (to be exported)
const lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, "/../.data/");

// Write data to a file
lib.create = (dir, file, data, callback) => {
  // Open the file for writing
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // Convert data to string
        const stringData = JSON.stringify(data);

        // Write to file and close it
        fs.writeFile(fileDescriptor, stringData, (err) => {
          console.log("fileDescriptor = ", fileDescriptor);
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing new file");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("Could not create new file, it may already exist");
      }
    }
  );
};

//Read data from a file
lib.read = (dir, file, callback) => {
  fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf8", (err, data) => {
    if (!err && data) {
      const pasrsedData = parseJsonToObject(data);
      callback(false, pasrsedData);
    } else {
      callback(err, data);
    }
  });
};

// Update data inside a file
lib.update = (dir, file, data, callback) => {
  //open the file for writing
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        //convert Data to string
        const stringData = JSON.stringify(data);

        //truncate the file
        fs.ftruncate(fileDescriptor, (err) => {
          if (!err) {
            //write to the file and close it
            fs.writeFile(fileDescriptor, stringData, (err) => {
              if (!err) {
                fs.close(fileDescriptor, (err) => {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Error closing file");
                  }
                });
              } else {
                callback("Error Writing to existing file");
              }
            });
          } else {
            callback("Error Truncating file");
          }
        });
      } else {
        callback("could not open the file for updating, it may not exist yet");
      }
    }
  );
};

lib.delete = (dir, file, callback) => {
  //Unlink the file
  fs.unlink(lib.baseDir + dir + "/" + file + ".json", (err) => {
    if (!err) {
      callback(false);
    } else {
      callback("Error deleting file");
    }
  });
};

//list all the items in a directory
lib.list = (dir, callback) => {
  fs.readdir(lib.baseDir + dir + "/", (err, data) => {
    if (!err && data && data.length > 0) {
      const trimemedFileNames = [];

      data.forEach((fileName) => {
        trimemedFileNames.push(fileName.replace(".json", ""));
      });

      callback(false, trimemedFileNames);
    } else {
      callback(err, data);
    }
  });
};

module.exports = lib;
