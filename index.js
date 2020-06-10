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
            message: "Github username?",
            name: "userName"
        },
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
            name: "TableofContents",
            default: "none"
        },
        {
            type: "input",
            message: "Installation?",
            name: "Installation",
            default: "npm install"
        },
        {
            type: "input",
            message: "Usage?",
            name: "Usage",
            default: "node index.js"
        },
        {
            type: "list",
            message: "License?",
            name: "License",
            choices: [
                "MIT",
                "GNU GPL v3",
                "BSD 3",
                "Do what the F you want."
            ],
        },
        {
            type: "input",
            message: "Contributing?",
            name: "Contributing",
            default: "none"
        },
        {
            type: "input",
            message: "Tests?",
            name: "Tests",
            default: "none"
        },
        // {
        //     type: "input",
        //     message: "Questions?",
        //     name: "Questions"
        // },

    ]).then(function (data) {
        let stream = fs.createWriteStream("./output/README.md");
        stream.write("# " + data.title + "\n");
        stream.write("# Description" + "\n" + data.Description + "\n");
        stream.write("# Table of Contents" + "\n" + data.TableofContents + "\n");
        stream.write("# Installation" + "\n" + data.Installation + "\n");
        stream.write("# Usage" + "\n" + data.Usage + "\n");
        stream.write("# License" + "\n");

        if (data.License === "MIT") {
            stream.write("<a href='https://opensource.org/licenses/MIT'>" +
                "<img alt='Badge' src='https://img.shields.io/badge/License-MIT-yellow.svg'>\n\n");
        } else if (data.License === "GNU GPL v3") {
            stream.write("<a href='https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html'>" +
                "<img alt='Badge' src='https://img.shields.io/badge/License-GPLv3-blue.svg'>\n\n");
        } else if (data.License === "BSD 3") {
            stream.write("<a href='https://opensource.org/licenses/BSD-3-Clause'>" +
                "<img alt='Badge' src='https://img.shields.io/badge/License-BSD%203--Clause-blue.svg'>\n\n");
        } else if (data.License === "Do what the F you want.") {
            stream.write("<a href='http://www.wtfpl.net/about/'>" +
                "<img alt='Badge' src='https://img.shields.io/badge/License-WTFPL-brightgreen.svg'>\n\n");
        } else {
            stream.write("# License" + "\n" + data.License + "\n");
        }




        stream.write("# Contributing" + "\n" + data.Contributing + "\n");
        stream.write("# Tests" + "\n" + data.Tests + "\n");
        // stream.write("# Questions" + "\n" + data.Questions + "\n");

        const queryUrl = `https://api.github.com/users/${data.userName}`;
        axios
            .get(queryUrl)
            .then(function (response) {
                const githubProfileLink = "<a href='" + response.data.html_url + "'>" + response.data.login + "</a>"
                const githubProfilPic = "<img src='" + response.data.avatar_url + "' alt=Github profile picture width=100>";
                stream.write('# Questions' + '\n Questions may be forwarded to me at my Github profile' + "\n" + githubProfileLink + "\n" + "\n" + githubProfilPic);

                if (response.data.email !== null) {
                    stream.write("Email: " + response.data.email);
                };
                stream.end();
            });
    }).catch(function (error) {
        console.log("An error occured:", error);
    });

