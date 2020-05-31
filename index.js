const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");



inquirer
    .prompt([
        {
            type: "input",
            message: "Title of project?",
            name: "title"
        },

    ]).then(function (data) {

        let stream = fs.createWriteStream("README.md");
        stream.write("# " + data.title);
    }).catch(function (error) {
        console.log("An error occured:", error);
    });

