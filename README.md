# messageGenerator

An app that can be used to generate custom messages for a company to send it's clients. Currently optimized for use in a hospitality setting.

## Installation 
Clone the repository and cd into project directory.
```bash
git clone https://github.com/bobbi-henderson/messageGenerator.git
cd messageGenerator
```
Install the required libraries and package dependencies.
```bash
npm install
```

## Run
```bash
npm start
```
Open [http://localhost:8000/](http://localhost:8000/) to view application.

## Programming Details
### Language Choice
This program was developed using ejs, Bootstrap 5, JavaScript, Express, and Node.js. The provided data structures are given in JSON.
* ejs
  * Chosen as the templating language to allow easy integration of JavaSript variables into the HTML, relayed from the backend.
* Bootstrap 5
  * Used as a quick and flexible css library to format and style the user views. Was mainly used to format the forms and style the buttons to make them easier to see.
* JavaScript
  * Used mainly for DOM manipulation.
* Express
  * Used to set up the server and routing.
* Node.js
  * Chosen as the backend language for its vast package library and it's familiarity to the developer. It is also built off of JavaScript, so it allows for object-oriented design.

### Design Decisions
The main logic of the app is handled on the backend. There are only two routes and views. The first route is established to get the landing page. This displays the index page and passes in the json data from the three files that contain the guest, company, and message choices. This data is used in the ejs to populate the form choices.

The majority of the logic happens on the post route, when the user submits the form. All of the functions and data that are used to create the message are stored in the messageData object. The first function nested inside of the object is designed to set the greeting based on the time the form is submitted. The second function is designed to parse the message string (using regex) which is formated like a template literal, but template literals cannot be used when received via JSON. Therefore, the parse string function finds the variables in the selected message and passes the variables in from the templateValues object. The only logic written outside of the main object is done to populate the variables needed to generate the message. Once all of the variables have been populated based on the user selections, the function to parse the message is called on the user selected message. The parsed string is saved to the result variable which is then passed to the result ejs template where it is displayed to the user.

The only logic that does not happen on the backend is the DOM manipulation that is used to show the custom message input if the user selects that option from the dropdown.

The user can currently pass their own messages using the custom message option, and the variables key where they can copy the properly formatted option for each variable.

All of the logic was designed to be linear in space-time complexity, to allow for optimal performance provided larger data sets.

### Testing
The application as it stands has gone through vigorous manual testing to ensure excellent functionality. Throughout the various stages of design the console was used to log errors and function/data outputs. Basic error handling has been implemented to log possible errors to the console in production.

### Future Goals
Given more time, the first thing to be addressed would be to create a better UI for populating variables in custom messages. Ideally, the user would be able to populate the formatted variable directly into their message by clicking the button, rather than the current copy and paste iteration.

Additionally, fully flushing out all of the possible edge cases for custom messages would be pertinent.

Lastly, it would be cool to build out authentication, and a database where users could sign in and store all of their own data along with their exclusive client data and their own custom message templates.

## Link to Hosted Project
The current version of this project has been deployed to heroku, and can be found at the following link: 
[https://hotel-message-generator.herokuapp.com/](https://hotel-message-generator.herokuapp.com/)

## License
[MIT](https://choosealicense.com/licenses/mit/)
