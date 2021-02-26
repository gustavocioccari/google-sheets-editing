const { google } = require('googleapis')
const credentials =  require('./config.json')

const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

module.exports = {
    auth
}