var SHEET_NAME_ANSWERS = 'answers';
var SHEET_NAME_LOG = 'log';

function datesDiff(date1, date2) {
  var ts1 = new Date(date1).getTime();
  var ts2 = new Date(date2).getTime();
  return ts2 - ts1;
}

function doPost (e) {
  var params = JSON.parse(e.postData.contents);
  var res;
  switch(params.action) {
    case 'finish':
      res = handleActionFinish(params);
      break;
    case 'start':
      res = handleActionStart(params);
      break;
    default:
      return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Unsupported action ' + params.action }))
      .setMimeType(ContentService.MimeType.JSON)
  }
  return ContentService
    .createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON)
}

function writeToSheet (doc, sheetName, params) {
  var sheet = doc.getSheetByName(sheetName)
  
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
  var nextRow = sheet.getLastRow() + 1
  
  var newRow = headers.map(function(header) {
    if (header === 'timestamp') return new Date();
    if (header in params) return params[header];
    return '';
  })
  
  sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
  return newRow;
}

function handleActionStart (params) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(params.docId);
    var nextRow = writeToSheet(doc, SHEET_NAME_LOG, {name: params.payload.name, action: params.action});

    return { 'result': 'success', 'row': nextRow };
  }

  catch (e) {
    return { 'result': 'error', 'error': e };
  }

  finally {
    lock.releaseLock()
  }
}

function handleActionFinish (params) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(params.docId);
    var nextRow = writeToSheet(doc, SHEET_NAME_ANSWERS, params.payload);
    writeToSheet(doc, SHEET_NAME_LOG, {name: params.payload.name, action: params.action});

    return { 'result': 'success', 'row': nextRow };
  }

  catch (e) {
    return { 'result': 'error', 'error': e };
  }

  finally {
    lock.releaseLock()
  }
}
