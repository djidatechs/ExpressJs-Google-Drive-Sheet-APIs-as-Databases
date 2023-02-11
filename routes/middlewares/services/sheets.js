const { google } = require("googleapis");

function sheets(){
    
    return async (req,res,next)=>{
        
        
        const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly','https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/drive.metadata','https://www.googleapis.com/auth/drive.file'] });
        const sheets = google.sheets({ version: 'v4', auth });

        let fullSheet =  await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range : "A1:H",
            
            
        });
        const dataAndCountFromSheet = (fSheet) => {
            let dataSheet = fSheet?.data?.values
            let rowNum  = dataSheet.length || 0
            if (!rowNum) return {dataSheet,rowNum}

            dataSheet.map((arr , index)=>{
                arr[8]= (index+1)
            })

            dataSheet.shift()
            

            let tag = req.query.tag || 'null'
            tag = tag.toLowerCase()  
                
            dataSheet = dataSheet.filter(arr=>{
                let existingTags = []
                //convert it to string anyway 
                let thirdElem = arr[3].toString()
                existingTags= thirdElem.split(',').map(e=>{
                    return e.replace(/\s/g, "").toLowerCase()
                })
                
                
                if (tag == 'null' || typeof thirdElem !== "String" ) return (arr.length>1)
                return (arr.length>1) && ( existingTags.includes(tag.replace(/\s/g,"")))
            
            })
            console.log({dataSheet})
            rowNum  = dataSheet.length || 0
            return {dataSheet , rowNum }
            
        }

        let {dataSheet,rowNum} = dataAndCountFromSheet (fullSheet)

        
        
        
        //pagination 
        // const rowNum = 35;
        const limit =  9 ;
        let pagenum = Math.ceil (rowNum / limit) 
        let page = parseInt( req.query.page ) || 1 ; 
        

        if (page > pagenum){
             res.sheets = []
             return next()
        }

 
        let usePage = pagenum- page +1  
        let change = (Math.ceil (rowNum / limit) * limit ) -rowNum
        const startIndex = Math.max( ( ((usePage -1) * limit)+1 ) - change , 1 ) -1
        const endIndex = ((usePage)  * limit )  -change 
        
        
        if (rowNum) {
            dataSheet = dataSheet.slice(startIndex,endIndex).reverse()
            
            dataSheet.map((arr , index) => {
                const lastItem = arr[arr.length] 
                arr[arr.lenght] = lastItem+startIndex
            });
        }
        
        res.sheets = dataSheet

        if (page > 1) res.prev = page -1
        if (page < pagenum) res.next = page +1
        next()
    }
}
module.exports = sheets