// Data type definitions do not strictly follow the ANSI SQL Standards
// We only support major data types.
// E.g., `length` of CHAR is optional according to the spec but we enforce to define `length`.

export const DATA_TYPE_NAMES_L = [
  'CHAR',
  'CHARACTER',
//  'CHAR VARYING',
//  'CHARACTER VARYING',
  'VARCHAR',
  'CLOB',
  'BINARY',
  'VARBINARY',
  'BLOB',
] as const;
export type DataTypeNameL = typeof DATA_TYPE_NAMES_L[number];
export const DATA_TYPE_NAMES_OPT_P_S = [
  'DECIMAL',
  'DEC',
  'NUMBER',
  'NUMERIC',
] as const;
export type DataTypeNameOptPS = typeof DATA_TYPE_NAMES_OPT_P_S[number];
export const DATA_TYPE_NAMES_OPT_P = [
  'FLOAT',
] as const;
export type DataTypeNameOptP = typeof DATA_TYPE_NAMES_OPT_P[number];
export const DATA_TYPE_NAMES_NO_ARGS = [
// 'UUID',
  'SMALLINT',
  'INT',
  'INTEGER',
  'BIGINT',
  'REAL',
  'DOUBLE PRECISION',
  'DOUBLE',
  'BOOLEAN',
  'DATE',
  'TIME',
  'TIMESTAMP',
// 'INTERVAL',
// 'REGCLASS',
// 'TEXT',
// 'BYTEA',
// 'CUSTOM',
// 'ARRAY',
] as const;
export type DataTypeNameNoArgs = typeof DATA_TYPE_NAMES_NO_ARGS[number];
export const DATA_TYPE_NAMES = [
  ...DATA_TYPE_NAMES_L,
  ...DATA_TYPE_NAMES_OPT_P_S,
  ...DATA_TYPE_NAMES_OPT_P,
  ...DATA_TYPE_NAMES_NO_ARGS,
] as const;
export type DataTypeName = typeof DATA_TYPE_NAMES[number];

export class DataType {
  constructor(public name: DataTypeName) {}
}
export class NumericType extends DataType {
  private _numericType = 'nominal' as const;
}
export class StringType extends DataType {
  private _stringType = 'nominal' as const;
  constructor(_name: DataTypeNameL, public length: number) { super(_name); }
}
export class DatetimeType extends DataType {
  private _booleanType = 'nominal' as const;
}
export class BooleanType extends DataType {
  private _datetimeType = 'nominal' as const;
}
export class CharacterStringType extends StringType {
  private _charcterStringType = 'nominal' as const;
}
export class BinaryStringType extends StringType {
  private _binaryStringType = 'nominal' as const;
}
export class DecimalType extends NumericType {
  private _decimalType = 'nominal' as const;
  constructor(_name: DataTypeNameOptPS, public precision?: number, public scale?: number) { super(_name); }
}
/**
 * Fixed-length character type e.g. CHAR(10)
 */
export class Char extends CharacterStringType {
  constructor(_length: number) { super('CHAR', _length); }
}
/**
 * Alias of Char
 */
export class Character extends CharacterStringType {
  constructor(_length: number) { super('CHARACTER', _length); }
}
/**
 * Alias of Char
 */
export class Varchar extends CharacterStringType { // Variable-length character type e.g. VARCHAR(10)
  constructor(_length: number) { super('VARCHAR', _length); }
}
/**
 * Large character object e.g. CLOB(1000)
 */
export class Clob extends CharacterStringType {
  constructor(_length: number) { super('CLOB', _length); }
}
/**
 * Fixed-length binary type e.g. BINARY(10)
 */
export class Binary extends BinaryStringType {
  constructor(_length: number) { super('BINARY', _length); }
}
/**
 * Variable-length binary type e.g. VARBINARY(10)
 */
export class Varbinary extends BinaryStringType {
  constructor(_length: number) { super('VARBINARY', _length); }
}
/**
 * Large binary object e.g. BLOB(1000)
 */
export class Blob extends BinaryStringType {
  constructor(_length: number) { super('BLOB', _length); }
}
/**
 * Decimal type with optional precision and scale e.g. DECIMAL(10,2)
 */
export class Decimal extends DecimalType {
  constructor(_p?: number,_s?: number) { super('DECIMAL', _p, _s); }
}
/**
 * Alias for Decimal type
 */
export class Dec extends DecimalType {
  constructor(_p?: number,_s?: number) { super('DEC', _p, _s); }
}
/**
 * Alias for Decimal type
 */
export class Number extends DecimalType {
  constructor(_p?: number,_s?: number) { super('NUMBER', _p, _s); }
}
/**
 * Alias for Decimal type
 */
export class Numeric extends DecimalType {
  constructor(_p?: number,_s?: number) { super('NUMERIC', _p, _s); }
}
/**
 * Floating point with optional precision e.g. FLOAT(8)
 */
export class Float extends NumericType {
  constructor( public precision?: number) { super('FLOAT'); }
}
export class SmallInt extends NumericType { // Small integer
  constructor() { super('SMALLINT'); }
}
export class Int extends NumericType { // Integer
  constructor() { super('INT'); }
}
export class Integer extends NumericType { // Integer
  constructor() { super('INTEGER'); }
}
export class BigInt extends NumericType { // Big integer
  constructor() { super('BIGINT'); }
}
/**
 * Floating point e.g. REAL
 */
export class Real extends NumericType {
  constructor() { super('REAL'); }
}
/**
 * Double
 */
export class DoublePrecision extends NumericType {
  constructor() { super('DOUBLE PRECISION'); }
}
/**
 * Alias for DoublePrecision
 */
export class Double extends NumericType {
  constructor() { super('DOUBLE'); }
}
export class Boolean extends BooleanType {
  constructor() { super('BOOLEAN'); }
}
export class Date extends DatetimeType {
  constructor() { super('DATE'); }
}
export class Time extends DatetimeType {
  constructor() { super('TIME'); }
}
export class Timestamp extends DatetimeType {
  constructor() { super('TIMESTAMP'); }
}

const SMALLINT = new SmallInt;
const INT = new Int;
const INTEGER = new Integer;
const BIGINT = new BigInt;
const REAL = new Real;
const DOUBLE_PRECISION = new DoublePrecision;
const DOUBLE = new Double;
const BOOLEAN = new Boolean;
const DATE = new Date;
const TIME = new Time;
const TIMESTAMP = new Timestamp;
// const TEXT = new Text;

export const mapperL: { [key in DataTypeNameL]: (length: number) => DataType } = {
  'CHAR':      (length: number) => new Char(length),
  'CHARACTER': (length: number) => new Character(length),
  'VARCHAR':   (length: number) => new Varchar(length),
  // TODO followings are not supported by orginal parser
  'CLOB':      (length: number) => new Clob(length),
  'BINARY':    (length: number) => new Binary(length),
  'VARBINARY': (length: number) => new Varbinary(length),
  'BLOB':      (length: number) => new Blob(length),
};
export const mapperOptPS: { [key in DataTypeNameOptPS]: (precision?: number, scale?: number) => DataType } = {
  'DECIMAL':   (precision?: number, scale?: number) => new Decimal(precision, scale),
  'DEC':       (precision?: number, scale?: number) => new Dec(precision, scale),
  'NUMBER':    (precision?: number, scale?: number) => new Number(precision, scale),
  'NUMERIC':   (precision?: number, scale?: number) => new Numeric(precision, scale),
};
export const mapperOptP: { [key in DataTypeNameOptP]: (precision?: number) => DataType } = {
  'FLOAT':     (precision?: number) => new Float(precision),
};
export const mapperNoArgs: { [key in DataTypeNameNoArgs]: DataType } = {
  'SMALLINT':         SMALLINT,
  'INT':              INT,
  'INTEGER':          INTEGER,
  'BIGINT':           BIGINT,
  'REAL':             REAL,
  'DOUBLE PRECISION': DOUBLE_PRECISION,
  'DOUBLE':           DOUBLE,
  'BOOLEAN':          BOOLEAN,
  'DATE':             DATE,
  'TIME':             TIME,
  'TIMESTAMP':        TIMESTAMP,
//  'TEXT':             TEXT,
};

 // narrow down string to data type names
export const inDataTypeName = (name: string|DataTypeName): name is DataTypeName => DATA_TYPE_NAMES.includes(name as DataTypeName);
export const inDataTypeNameL = (name: string|DataTypeNameL): name is DataTypeNameL => DATA_TYPE_NAMES_L.includes(name as DataTypeNameL);
export const inDataTypeNameOptPS = (name: string|DataTypeNameOptPS): name is DataTypeNameOptPS => DATA_TYPE_NAMES_OPT_P_S.includes(name as DataTypeNameOptPS);
export const inDataTypeNameOptP = (name: string|DataTypeNameOptP): name is DataTypeNameOptP => DATA_TYPE_NAMES_OPT_P.includes(name as DataTypeNameOptP);
export const inDataTypeNameNoArgs = (name: string|DataTypeNameNoArgs): name is DataTypeNameNoArgs => DATA_TYPE_NAMES_NO_ARGS.includes(name as DataTypeNameNoArgs);

export * as dataTypes from './data-types';
export * from './data-types';
