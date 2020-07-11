const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { createInflate } = require("zlib");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
class Team {
    constructor() {
        this.teamSize = 0;
        this.team = [];
    }
}
const teamMembers = [];

function start() {
    managerQuery();
    // addTeamMember();

}
console.log(teamMembers);

function managerQuery() {
    inquirer.prompt([{
                type: "input",
                name: "name",
                message: "What is the name of the team manager?"
            },
            {
                type: "input",
                name: "id",
                message: "Team Manager's ID number:"
            },
            {
                type: "input",
                name: "email",
                message: "Team Manager's email address:"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Team Manager's office number:"
            }
        ]).then(val => {
            const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
            console.log(manager);
            teamMembers.push(manager);
            console.log(teamMembers);
            addTeamMember();
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    
};

function addTeamMember() {
    inquirer.prompt([{
        type: "prompt",
        name: "add team member",
        message: "Would you like to add a team member?"
    },
    {
        type: "list",
        name: "what_type",
        message: "Add engineer or intern?",
        choices: ["Engineer", "Intern", "Not at this time"]
    }
    ]).then(val => {
        switch (val.what_type) {
            case "Engineer": 
                engineerQuery()
                break;
            case "Intern":
            internQuery()
            default:
                createFile()
                break;
        }
    }) 
}


function engineerQuery() {
    inquirer.prompt([{
                type: "input",
                name: "name",
                message: "Engineer's name?"
            },
            {
                type: "input",
                name: "id",
                message: "Engineer's ID number:"
            },
            {
                type: "input",
                name: "email",
                message: "Engineer's email address:"
            },
            {
                type: "input",
                name: "github",
                message: "What is the URL of the Engineer's GitHub profile?"
            }
        ]).then(val => {
                const engineer = new Engineeer(val.name, val.id, val.email, val.officeNumber);
                console.log(engineer);
                teamMembers.push(engineer);
                addTeamMember();
            })
            .catch(error => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else when wrong
                }
            });
        
};

function internQuery() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "Intern's ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Intern's email address:"
        },
        {
            type: "input",
            name: "school",
            message: "What school does/did the intern attend?"
        }
    ]).then(val => {
            const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
            console.log(manager);
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
    
};
function createFile() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "UTF-8");
}
start();

// const employee1 = new Manager("Dave", "666", "dave@company.com", "123-456-7890");
// const employee2 = new Engineer("Lucy", "123", "lucy@company.com", "lucy123");
// const employee3 = new Intern("Dan", "425", "dan@company.com", "UW");


// console.log(employee1)
// console.log(employee2)
// console.log(employee3)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```