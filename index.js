const { auth } = require('./auth/auth')
const { googleSheetsEditing } = require('./service/editSheets')

auth.authorize(function (err,tokens){
    try {
      googleSheetsEditing(auth)
      console.log('conectado')
    } catch (err){
      console.log(err)
  }
})