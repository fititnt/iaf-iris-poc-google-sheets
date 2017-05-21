//  1. Crie uma nova planilha em https://docs.google.com/spreadsheets/

// 2. Nesta planilha, adicione na primeira linha e coluna (A1) o valor 
//   "Timestamp" e ao seu lado (B1) o valor "instrucao" (não use aspas)

// 3. Clique em "Ferramentas > Editor de Scripts" no seu Google Planilhas.
//    Irá abrir um editor de scripts
// 4. Copie e cole todo esse código (arquivo macro-planilha.js) para o editor
//    de scripts que abriu
// 5. Salve (clique no "disquete", ou aperte as telas 'Ctrl + S' se não sabe
//    o que é um ícone de disquete). Qualquer nome de projeto serve. Sugerido
//    "poc2"
// 6. Em "Select function" selecione "Setup".
// 7. Clique em "Run" (é um triângulo apontando para direita, entre um relógio
//    e um inseto)
// 8. Clique em "Review Permissions" na caixa que irá aparecer. Selecione sua
//    conta pessoal
// 9. Publish > Deploy as web app
//    - "Project version" pode ser valor 1
//    - Execute the app as: "me" (vai rodar como se fosse você)
//    - Who has access to the app: "Anyone, even anonymous"
// 10. Copie a URL de "Current web app URL:" e cole na respectíva área da sua interface
//
//  5. Insert column names on your destination sheet matching the parameter names of the data you are passing in (exactly matching case)

var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service

// If you don't want to expose either GET or POST methods you can comment out the appropriate function
function doGet(e) {
  return handleResponse(e);
}

function doPost(e) {
  return handleResponse(e);
}

function handleResponse(e) {
  // shortly after my original solution Google announced the LockService[1]
  // this prevents concurrent access overwritting data
  // [1] http://googleappsdeveloper.blogspot.co.uk/2011/10/concurrency-and-google-apps-script.html
  // we want a public lock, one that locks for all invocations
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.

  try {
    // next set where we write the data - you could write to multiple/alternate destinations
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(e.parameter['pagina']); //var sheet = doc.getSheetByName(SHEET_NAME);

    // we'll assume header is in row 1 but you can override with header_row in GET/POST data
    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1; // get next row
    var row = [];
    // loop through the header columns
    for (i in headers) {
      if (headers[i] == "Timestamp") { // special case if you include a 'Timestamp' column
        row.push(new Date());
      } else if (headers[i] != "pagina" && headers[i] != "webapp-url") {
        row.push(e.parameter[headers[i]]);
      }
    }
    // more efficient to set values as [][] array than individually
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    // return json success results
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    // if error return this
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
}

function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("key", doc.getId());
}
