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

결론적으로, new 키워드를 사용할 때는 새로운 객체가 생성되어 this context로 바인딩되고,
키워드 없이 함수를 실행하는 경우에는 함수를 호출하는 상황에서의 this context가 됩니다.

new operator (또는 new keyword)를 사용하면서 함수를 호출하는 경우,
예를 들어서 new Foo(arguments)를 실행하면, 다음과 같은 일이 발생합니다.

  1. Foo.prototype을 상송하는 **새로운 객체**가 생성됩니다!
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
const person = {
  name: "John Doe",
  getName: function() {
    return this.name;
  }
};

console.log(person.getName()); // John Doe

const unboundGetName = person.getName;
console.log(unboundGetName); // udefined

const boundGetName = unboundGetName.bind(person);
console.log(boundGetName); // John Doe
```

## ECMA-262 (ES 5.1)

### "use strict"; strict mode, 엄격 모드 알아보기

## ECMA-262 2015 (ES 6)

### Template Strings

### Block Scoped Declarations

### Fat Arrow Functions

### Destructuring, Array Spread

### Imports and Exports

### Default Parameters

### Classes

### Dynamic Object Keys

### Promise

### Generator

## ECMA-262 2016 (ES 7)

### Static Class Properties

### Class Instance Properties

### Bound Instance Methods

### Object Spread

### async / await

## ECMA-262 2017 (ES 8)

준비중
