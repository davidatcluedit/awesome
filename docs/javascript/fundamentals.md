# Javascript Fundamentals

JavaScript는 [동적 프로그래밍 언어](https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_programming_language), 객체 기반의 스크립트 프로그래밍 언어입니다. 주로 웹 브라우저 또는 [node.js](https://nodejs.org/)와 같은 런타임 환경에서 사용하고 있습니다.
[ECMAScript (혹은 ES)](https://en.wikipedia.org/wiki/ECMAScript)에 대한 [ECMA-262](https://tc39.github.io/ecma262/)을 표준으로 합니다.

[ECMAScript (혹은 ES)](https://en.wikipedia.org/wiki/ECMAScript)는 javascript의 기반이 되는 script programming language이며, Ecma International 표준화 기구에 의해서 [ECMA-262](https://tc39.github.io/ecma262/) 및 [ECMA-402](https://tc39.github.io/ecma402/) 스펙에 표준화되었습니다. [ECMAScript (혹은 ES)](https://en.wikipedia.org/wiki/ECMAScript)는 쉽게 말해서 자바스크립트의 표준화된 버전입니다! javascript는 이 ECMAScript와의 호환을 목표로 하면서, 발전하고 있습니다.

:::warning
**ECMAScript는 스펙이며, JavaScript는 언어다?**

JavaScript의 표준화된 버전이 ECMAScript이며, **둘 모두 script programming language입니다.**
ECMAScript의 표준(또는 스펙)이 [ECMA-262](https://tc39.github.io/ecma262/) 및 [ECMA-402](https://tc39.github.io/ecma402/)입니다.
:::

## ECMA-262 (ES 5)

### new keyword, prototype 이해하기

prototype을 알아보기 전, 먼저 Object Constructor(또는 Object Constructor Function)을 작성하겠습니다.
(Object Constructor로 사용할 함수이므로, this instanceof Person이 true인 경우에만 사용할 수 있도록 로직을 작성합니다!)

:::tip
**instanceof 그리고 typeof**

```js
object instanceof constructor
```

```js
typeof operand
// operand is an expression representing the object or primitive whose type is to be returned.
```

[JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
:::

```js
// es 5
function Person(firstName, lastName) {
  // new operator (또는 new keyword)를 사용하지 않는 경우를 차단.
  if (!(this instanceof Person)) {
    throw Error("Error: Incorrect invocation");
  }
  this.firstName = firstName;
  this.lastName = lastName;
  // return this;
  // new 키워드를 사용해서 새로운 인스턴스를 생성하는 경우, 자동으로 this가 반환됩니다.
}

var person = new Person("John", "Doe");
console.log(person.firstName); // John
console.log(person.lastName); // Doe
```

Object Constructor를 작성했으니, 여기에 새로운 prototype을 넣어봅시다.

```js
// es 5
function Person(firstName, lastName) {
  // new operator 또는 new keyword를 사용하지 않는 경우를 차단.
  if (!(this instanceof Person)) {
    throw Error("Error: Incorrect invocation");
  }
  this.firstName = firstName;
  this.lastName = lastName;
  // return this;
  // new 키워드를 사용해서 새로운 인스턴스를 생성하는 경우, 자동으로 this가 반환됩니다.
}

Person.prototype.name = function() {
  return this.firstName + " " + this.lastName;
};

var person1 = new Person("John", "Doe");
var person2 = new Person("sg", "Kim");
console.log(person1.name());
console.log(person2.name());
```

물론, Constructor안에서 직접 작성할 수도 있습니다.

```js
// es 5
function Person(firstName, lastName) {
  // new operator 또는 new keyword를 사용하지 않는 경우를 차단.
  if (!(this instanceof Person)) {
    throw Error("Error: Incorrect invocation");
  }
  this.firstName = firstName;
  this.lastName = lastName;

  this.name = function() {
    return this.firstName + " " + this.lastName;
  };
  // return this;
  // new 키워드를 사용해서 새로운 인스턴스를 생성하는 경우, 자동으로 this가 반환됩니다.
}

var person1 = new Person("John", "Doe");
var person2 = new Person("sg", "Kim");
console.log(person1.name());
console.log(person2.name());
```

:::tip
new Foo는 new Foo()와 동일합니다! 즉 인자가 명시되지 않은 경우, 인자 없이 Foo가 호출됩니다.
:::

:::warning
this는 keyword일 뿐, 변수가 아닙니다! 즉, 변경(assign)할 수 없습니다.
:::

:::tip
**함수를 실행할 때의 this와 new 키워드를 사용할 때 this의 차이?**

함수 내부에서의 this를 아래 예제 코드로 확인해봅시다!

```js
function Test() {
  return (this instanceof Test);
}

console.log(Test()); // false
console.log(new Test); // true
```

결론적으로, new 키워드를 사용할 때는 새로운 객체가 생성되어 이 객체가 함수의 실행 context안의 this로 바인딩되고,
키워드 없이 함수를 실행하는 경우에는 함수를 호출하는 상황에서의 실행 context안의 this가 함수 내부로 들어옵니다.

new operator (또는 new keyword)를 사용하면서 함수를 호출하는 경우,
예를 들어서 new Foo(arguments)를 실행하면, 다음과 같은 일이 발생합니다.

  1. Foo.prototype을 상속하는 **새로운 객체**가 생성됩니다!
  2. 명시된 인자 그리고 **새롭게 생성된 객체에 바인드된 this**와 함께 생성자 함수 Foo가 호출됩니다!
  3. 생성자 함수에 의해 리턴된 객체는 전체 new 호출 결과가 됩니다!
  
만약 생성자 함수가 명시적으로 객체를 리턴하지 않는 경우, **첫 번째 단계에서 생성된 객체가 자동으로 반환됩니다!**
일반적으로 생성자 함수는 값을 리턴하지 않습니다. 그러나 일반적인 객체 생성을 재정의(override)하기 원한다면 그렇게 할 수 있습니다!
:::

### Inheritence, 상속 알아보기

Function.prototype.call(), Function.prototype.apply()를 이용하면, 다른 OOP 기반의 프로그래밍 언어 또는 es6의 class 상속과 같은 기능을 구현할 수 있습니다.

```js
function Person(firstName, lastName) {
  if (!(this instanceof Person)) {
    throw Error('Error: Incorrect invocation');
  }
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.name = function() {
  return this.firstName + " " + this.lastName;
};

function Programmer(firstName, lastName) {
  Person.call(this, firstName, lastName);
  this.job = "programmer";
}

function Designer(firstName, lastName) {
  Person.apply(this, [firstName, lastName]);
  this.job = "designer";
}
```

:::tip
apply와 call의 유일한 차이점은 인자를 Array로 전달하느냐 아니냐 뿐입니다!
:::

### Function.prototype.bind()

**특정 this context가 바인딩된 새로운 함수를 반환하는 함수입니다.** JavaScript는 손쉽게, 바인딩되어 있는 this context를 잃어버릴 수 있는데, 예제를 통해서 확인해봅시다!

```js
var person = {
  name: "John Doe",
  getName: function() {
    return this.name;
  }
};

console.log(person.getName()); // John Doe

var unboundGetName = person.getName;
console.log(unboundGetName()); // udefined

var boundGetName = unboundGetName.bind(person);
console.log(boundGetName()); // John Doe
```

## ECMA-262 (ES 5.1)

### "use strict"; strict mode, 엄격 모드 알아보기

## ECMA-262 2015 (ES 6)

### Template Strings

템플릿 리터럴은 내장된 표현식을 허용하는 문자열 리터럴입니다.
여러 줄로 이뤄진 문자열과 문자 보간기능을 사용할 수 있습니다.
ES2015사양 명세에서는 "template strings" (템플릿 문자열) 라고 불려 왔습니다.

```js
const stringText = `string text`;
const multiLines = `string text line 1
string text line 2`;

const name = 'World';
const template = `Hello, ${name}!`;

function myTag(strings, personExp, ageExp) {

  const str0 = strings[0]; // "that "
  const str1 = strings[1]; // " is a "

  // 사실 이 예제의 string에서 표현식이 두 개 삽입되었으므로
  // ${age} 뒤에는 ''인 string이 존재하여
  // 기술적으로 strings 배열의 크기는 3이 됩니다.
  // 하지만 빈 string이므로 무시하겠습니다.
  // var str2 = strings[2];

  let ageStr;
  if (ageExp > 99) {
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  // 심지어 이 함수내에서도 template literal을 반환할 수 있습니다.
  return str0 + personExp + str1 + ageStr;

}

const person = 'Mike';
const age = 28;
const output = myTag`that ${ person } is a ${ age }`;
console.log(output); // that Mike is a youngster
```

### Block Scoped Declarations

이제, 지역 변수(local variables)를 선언할 때는 var 대신 let 또는 const 키워드를 사용할 수 있습니다.
var은 function 단위로 const와 let은 block 단위로 scope를 갖게됩니다.
추가적으로 const는 선언할 때, 한 번만 값을 할당(assign)할 수 있고, 변경할 수 없습니다.
**주의할 점**은 const로 선언한 변수가 Object나 Array일 경우, Object는 Property를 변경하거나 추가할 수 있고, Array는 요소들을 추가하거나 제거할 수 있다는 것입니다. 변수에 다시 할당하는 것(re-assign)만 불가능합니다.

```js
const a = 1;
let b = 'foo';

// Not allowed!
// a = 2;

// Ok!
b = 'bar';

if (true) {
  const a = 3;
}

const c = {};
c.name = 'John Doe';
console.log(c.name); // John Doe
```

### Fat Arrow Functions

Arrow Function은 익명함수(anonymous function)이며, 다음과 같은 특징을 갖습니다.

  1. Arrow Function 밖의 this가 자동으로 바인딩되어 Arrow Function 안의 this가 된다.
  2. function 키워드로 선언하는 경우와 달리, [arguments 객체](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/arguments)를 참조할 수 없다.

arguments를 참조할 수 없으므로,

```js
const arrowFunction = (...arguments) => { /* ... */ };
```

위와 같은 형태로 활용합니다.

```js
// this 바인딩 예제

function testFunction(callback) {
  callback('sample data');
}

// ES5
var foo = this;
testFunction(function(data) {
  foo.data = data;
});

// Arrow Function 밖의 this가 자동으로 바인딩되어 Arrow Function 안의 this가 됩니다!
testFunction(data => {
  this.data = data;
});
```

### Destructuring, Array Spread

비구조화 및 배열 전개 연산자의 예제입니다.

```js
const arr = ['one!', 'two!', 'three!', 'four!'];
const [one, two, ...rest] = arr; // 배열을 비구조화할 때 전개 연산자를 이용해, 나머지 요소를 배열로 합칠 수 있습니다.

const obj = { a: 'x', b: 'y', c: 'z'};
const { a, b, c } = obj;
```

```js
const animals = ['cat', 'dog', 'moose'];
const newAnimals = [...animals];
const lotsOfAnimals = [...animals, 'bear', 'mouse', 'donkey'];
const fruits = [{ name: 'banana', color: 'yellow' }, { name: 'apple', color: 'red' }];
const newFruits = [...fruits];
console.log(fruits[0] === newFruits[0]); // true
newFruits[0].name = 'fofana';
console.log(fruits[0].name); // fofana
```

### Imports and Exports

Importing (es6)

```js
// import the default export
import React from 'react';

// import other named exports
import React, { Component } from 'react';
```

Importing (CommonJS)

```js
// import the default export
const React = require('react');
const { Component } = require('react');
```

Exporting (es6)

```js
export default React;
export { Component };
```

Exporting (CommonJS)

```js
module.exports.default = React
module.exports.Component = Component
```

### Default Parameters

함수의 인자에 default value를 assign할 수 있습니다.

```js
const printAnimal = (animal = 'cat') => {
  console.log(animal);
};
printAnimal(); // cat
printAnimal('dog'); // dog
```

### Dynamic Object Keys

```js
const chosenAnimal = 'cat';
const animals = {
  [`${chosenAnimal}TheAnimal`]: true,
};
console.log(animals.catTheAnimal); // true
```

### Classes

### Static Class Properties

### Promise

### Generator

## ECMA-262 2016 (ES 7)

### Class Instance Properties

### Bound Instance Methods

## ECMA-262 2017 (ES 8)

### async / await

## ECMAScript 2018

### Object Spread
