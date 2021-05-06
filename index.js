const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

inquirer
    .prompt([
        {
            type: "input",
            message: "Github username?",
            name: "userName",
            default: "gshaver82"
        },
        {
            type: "input",
            message: "Title of project?",
            name: "title"
        },
        {
            type: "input",
            message: "link to deployed app",
            name: "Link",
            default: "XXtempXX"
        },
        {
            type: "input",
            message: "Screenshot?",
            name: "Screenshot",
            default: "XXtempXX"
        },
        {
            type: "input",
            message: "Description?",
            name: "Description"
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
    ]).then(function (data) {
        let stream = fs.createWriteStream("./output/README.md");
        stream.write("# " + data.title + "\n");
        stream.write("# link to deployed app" + "\n" + "<a href='" + data.Link +  "'>gshaver82</a>" + "\n\n");
        stream.write("# Screenshot" + "\n" + "<img src='" + data.Screenshot +  "' alt=Screenshot>" + "\n\n");
        stream.write("# Description" + "\n" + data.Description + "\n");
        stream.write("# License" + "\n");
        if (data.License === "MIT") {
            stream.write("<a href='https://opensource.org/licenses/MIT'>" +
                "<img alt='Badge' src='https://img.shields.io/badge/License-MIT-yellow.svg'></a>\n\n");
        } else if (data.License === "GNU GPL v3") {
            stream.write("<a href='https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html'>" +
                "<img alt='Badge' src='https://img.shields.io/badge/License-GPLv3-blue.svg'></a>\n\n");
        } else if (data.License === "BSD 3") {
            stream.write("<a href='https://opensource.org/licenses/BSD-3-Clause'>" +
                "<img alt='Badge' src='https://img.shields.io/badge/License-BSD%203--Clause-blue.svg'></a>\n\n");
        } else if (data.License === "Do what the F you want.") {
            stream.write("<a href='http://www.wtfpl.net/about/'>" +
                "<img alt='Badge' src='https://img.shields.io/badge/License-WTFPL-brightgreen.svg'></a>\n\n");
        } else {
            stream.write("# License" + "\n" + data.License + "\n");
        }
        stream.write("# Contributing" + "\n" + data.Contributing + "\n");

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

