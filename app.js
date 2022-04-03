const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Code to use inquirer to gather information about the development team members,
// and to create objects for each team member.
const teamMembers = [];

function start() {
  managerQuery();
}

function managerQuery() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the team manager?",
      },
      {
        type: "input",
        name: "id",
        message: "Team Manager's ID number:",
      },
      {
        type: "input",
        name: "email",
        message: "Team Manager's email address:",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Team Manager's office number:",
      },
    ])
    .then((val) => {
      const manager = new Manager(
        val.name,
        val.id,
        val.email,
        val.officeNumber
      );
      console.log(manager);
      teamMembers.push(manager);
      addTeamMember();
    });
}

function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "what_type",
        message: "Add an engineer or intern to the team?",
        choices: ["Engineer", "Intern", "Not at this time"],
      },
    ])
    .then((val) => {
      if (val.what_type === "Engineer") {
        engineerQuery();
      } else if (val.what_type === "Intern") {
        internQuery();
      } else {
        createFile();
      }
    });
}

function engineerQuery() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Engineer's ID number:",
      },
      {
        type: "input",
        name: "email",
        message: "Engineer's email address:",
      },
      {
        type: "input",
        name: "github",
        message: "What is the Engineer's GitHub Username?",
      },
    ])
    .then((val) => {
      const engineer = new Engineer(val.name, val.id, val.email, val.github);
      console.log(engineer);
      teamMembers.push(engineer);
      addTeamMember();
    });
}

function internQuery() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "Intern's ID number:",
      },
      {
        type: "input",
        name: "email",
        message: "Intern's email address:",
      },
      {
        type: "input",
        name: "school",
        message: "What school does/did the intern attend?",
      },
    ])
    .then((val) => {
      const intern = new Intern(val.name, val.id, val.email, val.school);
      teamMembers.push(intern);
      addTeamMember();
    });
}

function createFile() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(teamMembers), "UTF-8");
}

start();
