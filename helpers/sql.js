const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
//Pass in object full of data to update, and object to set javascript keys to sql format
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  //If not keys present in array, throw error for "no data"
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  //Map over keys, to return cols array with placeholder data pointing to every key/value in dataToUpdate object in order
  const cols = keys.map((colName, idx) =>
  //Either use the colName or pass the key into the jsToSql object, to create the template for each associated value from the dataToUpdate object
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );
//Return object with setCols set to the array of templates that correspond to the values set of the dataToUpdate object
//And values set to an array of values from the dataToUpdate object
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
