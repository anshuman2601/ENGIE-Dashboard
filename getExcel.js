//source:
//https://automationscript.com/protractor/javascript-read-excel-file/
const ExcelJS = require('exceljs');


module.exports = async function (filepath, sheetName) {
    const workbook = new ExcelJS.Workbook();
    return data = workbook.xlsx.readFile(filepath).then(function () {
      const rowData = [];
      const worksheet = workbook.getWorksheet(sheetName);
      const rows = worksheet.rowCount;

      for (let i = 1; i <= rows; i++) {
        const row = worksheet.getRow(i);
        rowData[i - 1] = new Array(row.cellCount);
        for (let j = 1; j <= row.cellCount; j++) {
          rowData[i - 1][j - 1] = row.getCell(j).value;
        }
      }

      return rowData;
    });
}
