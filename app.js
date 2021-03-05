const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const templatesDir = path.resolve(__dirname, "./templates");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

let team = [];

const selectJobRole = [
    {
        type: "list",
        name: "role",
        message: "What is your job title?",
        choices: ["Manager", "Engineer", "Intern"],
    }
];

const questions = {
    Manager: [
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email address?",
        },
        {
            type: "input",
            name: "office",
            message: "What is the manager's office number?",
        },
        {
            type: "list",
            name: "newProfile",
            message: "Do you want to add another profile?",
            choices: ["yes", "no"]
        },
    ],

    Engineer: [
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
        },
        {
            type: "list",
            name: "newProfile",
            message: "Do you want to add another profile?",
            choices: ["yes", "no"]
        },
    ],

    Intern: [
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's ID number?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
        },
        {
            type: "input",
            name: "school",
            message: "What is the name of the intern's school?",
        },
        {
            type: "list",
            name: "newProfile",
            message: "Do you want to add another profile?",
            choices: ["yes", "no"]
        },
    ],
}

function addNewRole() {
    inquirer.prompt(selectJobRole)
        .then(answer => {
            if (answer.role === "Manager") {
                inquirer.prompt(questions.Manager)
                    .then(answer => {
                        const manager = new Manager (
                                answer.name,
                                answer.id,
                                answer.email,
                                answer.office
                            );

                        team.push(manager);
                        
                        if (answer.newProfile === "yes") {
                            addNewRole();
                        } else {
                            generate();
                        };
                    });
            };

            if (answer.role === "Engineer") {
                inquirer.prompt(questions.Engineer)
                    .then(answer => {
                        const engineer = new Engineer (
                                answer.name,
                                answer.id,
                                answer.email,
                                answer.github
                            );

                        team.push(engineer);

                        if (answer.newProfile === "yes") {
                            addNewRole();
                        } else {
                            generate();
                        };
                    });
            };


            if (answer.role === "Intern") {
                inquirer.prompt(questions.Intern)
                    .then(answer => {
                        const intern = new Intern (
                                answer.name,
                                answer.id,
                                answer.email,
                                answer.school
                            );

                        team.push(intern);

                        if (answer.newProfile === "yes") {
                            addNewRole();
                        } else {
                            generate();
                        };
                    });
            };
        });
    };

addNewRole();

