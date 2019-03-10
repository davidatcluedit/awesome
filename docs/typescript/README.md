# Typescript 시작하기

## Typescript란 무엇인가요

타입스크립트(TypeScript)는 자바스크립트의 슈퍼셋인 오픈소스 프로그래밍 언어입니다.
마이크로소프트에서 개발, 유지하고 있습니다.
자바스크립트(Javascript)와 다르게 심볼의 타입을 명시할 수 있으며, 이 차이점 덕분에 변수나 함수 등의 목적을 명확하게 전달할 수 있습니다.
파일의 확장자는 .ts를 사용하고 있으며, 런타임(runtime)에서는 .ts파일들을 트랜스컴파일(transcompile)한 .js파일들을 실행하게 됩니다.

## Javascript와 Typescript의 차이 미리보기

간단한 예제를 통해서, 타입을 알아봅시다.

```js
// 스트링(string) 인자(argument)를 받으면,
// 각 글자들을 요소(element)로 갖는 배열(array)로 변환해 반환(return)하는 함수입니다.
// 만약 글자가 숫자인 경우, 글자에서 숫자로 타입을 변환합니다.
function splitString(str) {
    if (typeof str !== 'string') {
        throw new Error('Invalid Argument!');
    }
    return str.split("").map(char => {
        return /[0-9]/.test(char) ? char * 1 : char;
    });
}

console.log(splitString("Hello, World!"));
console.log(splitString("1234"));
// [ 'H', 'e', 'l', 'l', 'o', ',', ' ', 'W', 'o', 'r', 'l', 'd', '!' ]
// [ 1, 2, 3, 4 ]
```

```ts
// 위의 javascript로 구현한 함수를 Typescript로 구현한 예입니다.
function splitString(str: string): Array<string | number> {
    return string.split("").map(char => {
        return /[0-9]/.test(char) ? char * 1 : char;
    });
}

const helloWorld: Array<string | number> = splitString("Hello, World!");
const oneTwoThreeFour: Array<string | number> = splitString("1234");
console.log(splitString(helloWorld);
console.log(splitString(oneTwoThreeFour));
// [ 'H', 'e', 'l', 'l', 'o', ',', ' ', 'W', 'o', 'r', 'l', 'd', '!' ]
// [ 1, 2, 3, 4 ]
```

## 왜 Typescript를 사용해야 할까요?
