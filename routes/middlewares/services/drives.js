const { google } = require("googleapis");

function drives(){
    return async (req,res,next)=>{
        if ( res.sheets.length === 0 ) {
            res.sheetAndDrive = [];
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
    const someAsyncFunction = async(arr) => {
                const files = [];  
                let id = arr[arr.length-1]
                const res = await service.files.list({
                q: `'${process.env.DRIVE_FOLDER_ID}' in parents and name contains  "_s${id}" and name contains  "#" `,
                fields: 'nextPageToken, files(id, name)',
                spaces: 'drive',
                });
                if (res.data.files.length > 0) 
                
                res.data.files.forEach(function(file) {
               
                files.push(file.id);
                });
                arr[9] = (files)  
            
    }  
    const sheets = res.sheets
    const resultArray = await Promise.all(sheets.map(async (arr) => someAsyncFunction(arr)));
    res.sheetAndDrive = sheets

    

        next()
        // let sheets = res.sheets ;

        // const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreaddrives.readonly','https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/drive.metadata','https://www.googleapis.com/auth/drive.file'] });
        // const drive = google.drive({ version: 'v3', auth})
       

        // sheets.map(
        //     async(arr)=>{
        //         let imagearray = [];
        //         let id = arr[arr.length-1]
        //         const q = `'${process.env.DRIVE_FOLDER_ID}' in parents and name contains  "_s${id}" and name contains  "#" `
        //         const Images_Extracted = await drive.files.list ({pageSize: 150, q })
        
        //         const Images_Ids = Images_Extracted.data.files
        //         Images_Ids.map((imgId)=> {
        //             imagearray.push (`https://drive.google.com/uc?id=${imgId.id}`)
        //         } )
        //         arr.push(imagearray)        
        //     }
        // )

        


        
        
    }
}
module.exports = drives