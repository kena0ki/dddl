import { parseAndGenerate } from '../dist/index.js';
const sql = `
create table A (
    col1 char(3)
);
`;
async function main() {
  try {
      const [rows, errors] = await parseAndGenerate(sql);
      // rows -> generated data
      console.log(rows);
      // errors -> data validation errors
      console.log(errors);
  } catch(error) {
      // error -> parse error or data generation error
      console.log(error);
  }
}
main();
