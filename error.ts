class A {}
class ErrorA extends Error{
  constructor(public a:string) {super();}
}

const a = new ErrorA('1');
console.log(a instanceof ErrorA);
console.log(a.constructor.name);
console.log(a.a);
console.log(JSON.stringify(a));
try {
  // throw new A;
  // throw new ErrorA;
} catch(err) {
  // console.log(err instanceof A);
  // console.log(err instanceof ErrorA);
}

