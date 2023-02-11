const { google } = require("googleapis");

function drive(){
    return async (req,res,next)=>{
        if ( res.sheet.length === 0 ) {
            res.sheet = [];
            return next()
        }
        const {GoogleAuth} = require('google-auth-library');
        const {google} = require('googleapis');
    
        const auth = new GoogleAuth({scopes: 'https://www.googleapis.com/auth/drive'});
        const service = google.drive({version: 'v3', auth});
        

        /**
 * Search file in drive location
 * @return{obj} data file
 * */
    const pushDriveFiles = async(arr) => {
                const files = [];  
                let id = arr[arr.length-1]
                const res = await service.files.list({
                q: `'${process.env.DRIVE_FOLDER_ID}' in parents and name contains  "_s${id}" and name contains  "#" `,
                fields: 'nextPageToken, files(id, name)',
                spaces: 'drive',
                });
                res.data.files.forEach(function(file) {
                
                files.push(file.id);
                });
                arr.push(files)  
            
    }  
    const sheet = res.sheet
    const resultArray = await pushDriveFiles(sheet)
    res.sheet = sheet

    

        next()


        
        
    }
}
module.exports = drive