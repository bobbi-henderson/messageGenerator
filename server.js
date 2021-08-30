const express = require('express')
const app = express()
const PORT = 8000

//imports the json data
const guests = require('./data/Guests.json')
const companies = require('./data/Companies.json')
const messages = require('./data/Messages.json')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res)=>{
    //renders the landing page with a form that populates with values from the json data
    res.render('index.ejs', {guests: guests, companies: companies, messages: messages})
})

app.post('/generateMessage', (req, res)=>{
    //holds the ids for the user selected inputs
    let guestId = req.body.guest,
        companyId = req.body.company,
        messageId = req.body.message

    const messageData = {
        templateValues: {
            guestFirst: '',
            guestLast: '',
            roomNumber: '',
            startTime: '',
            endTime: '', 
            company: '',
            city: '',
            timezone: '',
            greeting: '',
        },
        message: '',
        //function that sets the greeting based on the current time
        setGreeting: function(){
            let d = new Date()
            let hrs = d.getHours()
            
            if(hrs < 12){
                this.templateValues.greeting = "Good Morning"
            } else if (hrs >= 12 && hrs <= 17){
                this.templateValues.greeting = "Good Afternoon"
            } else if (hrs >= 17 && hrs <= 24){
                this.templateValues.greeting = "Good Evening"
            }
        }, 
        //function that parses the message string to include the template variables
        parseStringTemplate: function(str, obj) {
            let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/g);
            let args = str.match(/[^{\}]+(?=})/g) || [];
            let params = args.map(argument => obj[argument] || (obj[argument] === undefined ? "" : obj[argument]));
            return String.raw({ raw: parts }, ...params);
        },
    }

    //called to set greeting for time request is submitted
    messageData.setGreeting()

    //finds the user selected guest and populates the messageData object with their information
    for(const guest of guests){
        if(guest.id == guestId){
            messageData.templateValues.guestFirst = guest.firstName
            messageData.templateValues.guestLast = guest.lastName
            messageData.templateValues.roomNumber = guest.reservation.roomNumber
            messageData.templateValues.startTime = `${new Date(guest.reservation.startTimestamp).toLocaleDateString()} at ${new Date(guest.reservation.startTimestamp).toLocaleTimeString()}`
            messageData.templateValues.endTime = `${new Date(guest.reservation.endTimestamp).toLocaleDateString()} at ${new Date(guest.reservation.endTimestamp).toLocaleTimeString()}`
        }
    }

    //finds the user selected company and populates the messageData object with their information
    for(const company of companies){
        if(company.id == companyId){
            messageData.templateValues.company = company.company
            messageData.templateValues.city = company.city
            messageData.templateValues.timezone = company.timezone
        }
    }
    
    //finds the user selected message text (templated string) and populates it in the messageData object
    for(const message of messages){
        if(message.id == messageId){
            messageData.message = message.messageText
        }
    }
    
    //uses the messageData object to assemble the generated string
    const result = messageData.parseStringTemplate(messageData.message, messageData.templateValues)

    //renders the result template that shows the generated message to the user and allows them to generate a new message
    res.render('result.ejs', {guests: guests, companies: companies, messages: messages, message: result})
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})