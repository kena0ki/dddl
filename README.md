# dddl
[![codecov](https://codecov.io/gh/kena0ki/dddl/branch/main/graph/badge.svg)](https://codecov.io/gh/kena0ki/dddl)

dddl generates test Data from DDL (i.e. create table statements). <br>
How data is generated depends on column types and options but the general idea is simple. <br>
Generator adds 1 to previous data row by row so each column would have sequentially incremented number. <br>
Given that we have the following statement, <br>
``` sql
 create table a (
   c1 char(5),
   c2 integer,
   c3 float,
   c4 binary(8)
 );
```
then we would get the following.
```
   c1      c2  c3    c4
L1 "a0001","1","0.1","b0000001"
L2 "a0002","2","0.2","b0000002"
L3 "a0003","3","0.3","b0000003"
L4 "a0004","4","0.4","b0000004"
```
> This library is not yet stable. Any features or APIs are subject to change even if it's a minor version update.

## Getting started
### Installation
``` sh
npm install dddl
```
### Simple usage
``` typescript
import { parseAndGenerate } from 'dddl';
const sql = `
create table A (
    col1 char(3)
);
`;
try {
    const [rows, errors] = await parseAndGenerate(sql);
    // rows -> generated data
    // errors -> data validation errors
} catch(error) {
    // error -> parse error or data generation error
}
```

## Working demo
[Here](https://dddl-demo.netlify.app)

## Options
See [API reference](https://dddl-api.netlify.app/interfaces/generator.generatoroption.html)

## Supported types
See [API reference](https://dddl-api.netlify.app/modules/datatypes.html)

## Data validation
Currently followings are supported.
 - PRIMARY KEY constraint
 - UNIQUE KEY constraint
 - NOT NULL constraint

## SQL parser
SQL syntax quite depends on DBMS products, so the create statement you have may or may not be valid for this library. <br>
However this library basically comforms with [the ANSI standards](https://en.wikipedia.org/wiki/ISO/IEC_9075) since the parser part of this library has been translated and ported from the Rust project named [sqlparser-rs](https://github.com/ballista-compute/sqlparser-rs), which aims to comform with the standards, so hopefully the core part of your create statement (i.e. column definition) is valid for this library.

## Lisence
Apache License 2.0
