# Javascript 시작하기

## Javascript Fundamentals

JavaScript는 [동적 프로그래밍 언어](https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_programming_language), 객체 기반의 스크립트 프로그래밍 언어입니다. 주로 웹 브라우저 또는 [node.js](https://nodejs.org/)와 같은 런타임 환경에서 사용하고 있습니다.
[ECMAScript (혹은 ES)](https://en.wikipedia.org/wiki/ECMAScript)에 대한 [ECMA-262](https://tc39.github.io/ecma262/)을 표준으로 합니다.

### [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)

[ECMAScript (혹은 ES)](https://en.wikipedia.org/wiki/ECMAScript)는 javascript의 기반이 되는 script programming language이며, Ecma International 표준화 기구에 의해서 [ECMA-262](https://tc39.github.io/ecma262/) 및 [ECMA-402](https://tc39.github.io/ecma402/) 스펙에 표준화되었습니다. [ECMAScript (혹은 ES)](https://en.wikipedia.org/wiki/ECMAScript)는 쉽게 말해서 자바스크립트의 표준화된 버전입니다! javascript는 이 ECMAScript와의 호환을 목표로 하면서, 발전하고 있습니다.

::: tip
**JavaScript에 대해서 더 자세한 내용을 알아보려면 아래 링크로 이동하세요!**
:::

[JavaScript Fundamentals!](/javascript/fundamentals.html)

## Webpack

![Webpack Logo](https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png "Webpack Logo")

[node.js](https://nodejs.org/)의 등장으로 실질적인 모듈화가 가능해지면서,
[npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/)과 같은 package manager들과 함께 Javascript도 새로운 시대를 맞이하게 되었습니다.

하지만, [node.js](https://nodejs.org/) 환경이 아닌 [웹 브라우저(Web Browser)](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80) 환경에서 파일 단위의 모듈(module)을 사용하는 일은 여전히 쉬운 일이 아닙니다. [node.js](https://nodejs.org/) 환경에서 제작한 [Web application](https://en.wikipedia.org/wiki/Web_application)을 [웹 브라우저(Web Browser)](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80) 환경의 사용자들에게 배포하기 위해 의존성을 갖는 모듈들을 [즉시 실행 함수 표현(IIFE)](https://developer.mozilla.org/docs/Glossary/IIFE)로 변경해 주면서 하나의 파일로 묶어주는 과정(bundling)은 필수적이고, 이 과정을 쉽게 처리해주는 도구가 바로 [Webpack](https://webpack.js.org/)입니다.

::: tip
**웹팩에 대해서 더 자세하게 알아보려면 아래 링크로 이동하세요!**
:::

[Webpack 문서로 이동하기!](/javascript/webpack.html)

## Eslint

[Lint 혹은 Linter](https://en.wikipedia.org/wiki/Lint_(software))는 요즘 프로그래밍을 하다보면, 아주 쉽게 접할 수 있는 용어입니다.
오류를 찾는 것도 포함하지만, 일반적으로는 특정 [Programming Style](https://en.wikipedia.org/wiki/Programming_style)에 맞지 않는 source code를 찾는 도구를 말합니다.
eslint는 javascript에서 사용할 수 있는 Linter입니다.

::: tip
**Eslint에 대해서 더 자세하게 알아보려면 아래 링크로 이동하세요!**
:::

[Eslint 문서로 이동하기!](/javascript/eslint.html)

## Babel

![Babel Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Babel_Logo.svg/500px-Babel_Logo.svg.png "Babel Logo")

[Babel 문서로 이동하기!](/javascript/babel.html)
