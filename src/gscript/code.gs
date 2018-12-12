var sheetName = 'answers'
var scriptProp = PropertiesService.getScriptProperties()

function datesDiff(date1, date2) {
  var ts1 = new Date(date1).getTime();
  var ts2 = new Date(date2).getTime();
  return ts2 - ts1;
}

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1
    
    var params = JSON.parse(e.postData.contents);
    // var params = e.parameter;

    var newRow = headers.map(function(header) {
      if (header === 'timestamp') return new Date();
      if (header in params) return params[header];
      return '';
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow, 'data': e.postData.contents }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}