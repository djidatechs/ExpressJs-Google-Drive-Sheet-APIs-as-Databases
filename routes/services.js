var express = require('express');
var router = express.Router();

const sheets = require("./middlewares/services/sheets")
const drives = require("./middlewares/services/drives")
const sheet = require("./middlewares/article/sheet")
const drive = require ("./middlewares/article/drive")


/* GET users listing. */
router.get( '/' ,sheets(), drives(),  function(req, res, next) {
  
  if (res.sheetAndDrive.length === 0 ) {
    res.json({ok : false})
    return 
  }
  let array = [];
  res.sheetAndDrive.map (arr => {
    if (arr[9] !== 1 ) {
      console.log({arr})
    const object = {
      disponible: arr[0] || '',
       place : arr[1] || '',
       title : arr[2] || '',
       tags: arr[3] || '',
       price : arr[4] || '',
       date : arr[5] || '',
       duration : arr[6] || '',
       description : arr[7] || '',
       id: arr [8] || '',
       images: arr[9]   || [], 
    }
    array.push(object)
  }
  })

  res.json({
      array, ok : true , next : res.next , prev : res.prev
  });
});



router.get('/:id', sheet() , drive(),   function(req, res, next) {
  if (res.sheet.length == 0 ) {
    res.json({ok : false})
    return 
  }

  
  
    const object = {
      disponible: res.sheet[0] || '',
       place : res.sheet[1] || '',
       title : res.sheet[2] || '',
       tags: res.sheet[3] || '',
       price : res.sheet[4] || '',
       date : res.sheet[5] || '',
       duration : res.sheet[6] || '',
       description : res.sheet[7] || '',
       article : res.sheet[8] || '',
       id: res.sheet [9] || '',
       images: res.sheet[10]  || [] 
    }
    


   res.json({
      object, ok : true 
  });
  

});

module.exports = router;




