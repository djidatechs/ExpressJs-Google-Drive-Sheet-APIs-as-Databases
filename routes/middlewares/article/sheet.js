const { google } = require("googleapis");

function sheet(){
    
    return async (req,res,next)=>{

        const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly','https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/drive.metadata','https://www.googleapis.com/auth/drive.file'] });
        const sheets = google.sheets({ version: 'v4', auth });
        
        let id = parseInt( req.params.id )  
        if (isNaN(parseInt(id)) || parseInt(id) <=1 ) return res.json({ok:false})

        const range = `A${id}:I${id}`; //slice 

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range,
        });
        if (!response?.data?.values?.length) return res.json({ok:false})
        response?.data?.values
        .map((arr , index) => {
            arr.push(id)
        });
        

        res.sheet = response?.data?.values[0]
        next()
    }
}
module.exports = sheet