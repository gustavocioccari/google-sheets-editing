const { google } = require('googleapis')

const spreadsheetId = '1M6rkZEIS2hffsQosRpouVLhBx98f4sLXk9ZJXSfPN_A'

async function googleSheetsEditing(client) {
    const googleSheetsApi = google.sheets({
        version: 'v4',
        auth: client
    })

    const options = {
        spreadsheetId: spreadsheetId,
        range: 'engenharia_de_software!A4:H27'
    }

    try{
        const data = await googleSheetsApi.spreadsheets.values.get(options)
        const dataArray = data.data.values

        let writeDataArray = []

        dataArray.map(function(row) {
            let newRowValues = []
            
            const averageGrade = (parseInt(row[3]) + parseInt(row[4]) + parseInt(row[5])) / 3

            if(row[2] >= 15){
                newRowValues.push('Reprovado por falta')
                newRowValues.push(0)
                writeDataArray.push(newRowValues);
            } else if(averageGrade < 50) {
                newRowValues.push('Reprovado por nota')
                newRowValues.push(0)
                writeDataArray.push(newRowValues)
                return
            } else if(averageGrade > 70) {
                newRowValues.push('Aprovado')
                newRowValues.push(0)
                writeDataArray.push(newRowValues)
                return
            } else {
                newRowValues.push('Exame final')
                let neededGrade = Math.ceil(100 - averageGrade)
                newRowValues.push(neededGrade)
                writeDataArray.push(newRowValues)
            }
            console.log(`Situação do(a) aluno(a) ${row[1]} atualizada`)
        })

        console.log("Planilha editada com sucesso!")

        const updateOptions = {
            spreadsheetId: spreadsheetId,
            range: 'engenharia_de_software!G4',
            valueInputOption: 'USER_ENTERED',
            resource: { values: writeDataArray }
        }
        
        await googleSheetsApi.spreadsheets.values.update(updateOptions)
    } catch (err){console.log(err)}
}

module.exports = {
  googleSheetsEditing
}