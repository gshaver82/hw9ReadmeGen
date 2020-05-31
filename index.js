const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

// Title
// Description
// Table of Contents
// Installation
// Usage
// License
// Contributing
// Tests
// Questions


inquirer
    .prompt([
        {
            type: "input",
            message: "Title of project?",
            name: "title"
        },
        {
            type: "input",
            message: "Description?",
            name: "Description"
        },
        {
            type: "input",
            message: "Table of Contents?",
            name: "TableofContents"
        },
        {
            type: "input",
            message: "Installation?",
            name: "Installation"
        },
        {
            type: "input",
            message: "Usage?",
            name: "Usage"
        },
        {
            type: "input",
            message: "License?",
            name: "License"
        },
        {
            type: "input",
            message: "Contributing?",
            name: "Contributing"
        },
        {
            type: "input",
            message: "Tests?",
            name: "Tests"
        },
        {
            type: "input",
            message: "Questions?",
            name: "Questions"
        },


    ]).then(function (data) {

        let stream = fs.createWriteStream("README.md");
        stream.write("# " + data.title + "\n");
        stream.write("# Description" + data.Description + "\n");
        stream.write("# Table of Contents" + data.TableofContents + "\n");
        stream.write("# Installation" + data.Installation + "\n");
        stream.write("# Usage" + data.Usage + "\n");
        stream.write("# License" + data.License + "\n");
        stream.write("# Contributing" + data.Contributing + "\n");
        stream.write("# Tests" + data.Tests + "\n");
        stream.write("# Questions" + data.Questions + "\n");
        

    }).catch(function (error) {
        console.log("An error occured:", error);
    });

