// globalThis.dddlEnableLog=true;
import { parseAndGenerate } from '../src/generator';
import { logger } from '../src/util';
import { promises as fs } from 'fs';
import * as path from 'path';

describe('generate', () => {
  test(`001. parse and generate`, async () => {
    const file = path.join(__dirname, `sql/generator_001.sql`);
    const sql = await fs.readFile(file, 'utf8');
    console.time();
    const [rows, errors] = await parseAndGenerate(sql);
    console.timeEnd();
    logger.log(rows);
    logger.log(errors);
    expect(rows).toMatchSnapshot('rows');
    expect(errors).toMatchSnapshot('errors');
  });
});

