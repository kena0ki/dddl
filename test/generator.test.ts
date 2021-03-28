// globalThis.dddlEnableLog=true;
import { parser, ParseError } from '../src/parser';
import { generate } from '../src/generator';
import { logger } from '../src/util';
import { promises as fs } from 'fs';
import * as path from 'path';

describe('generate', () => {
  test(`001. parse and generate`, async () => {
    const file = path.join(__dirname, `sql/generator_001.sql`);
    const sql = await fs.readFile(file, 'utf8');
    console.time();
    const rows:string[]=[];
    try {
      const result = parser.parse(sql);
      if (result instanceof ParseError) throw result;
      const stmts = result;
      for (const stmt of stmts) {
        for await (const [result, errors] of generate(stmt)) {
          if (errors.length > 0) throw errors;
          rows.push(result.row);
        }
      }
    } catch(err) {
      logger.log(err);
    }
    console.timeEnd();
    logger.log(rows);
    expect(rows).toMatchSnapshot('generate');
  });
});

