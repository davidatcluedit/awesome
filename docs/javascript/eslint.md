# Eslint

[Lint 혹은 Linter](https://en.wikipedia.org/wiki/Lint_(software))는 요즘 프로그래밍을 하다보면, 아주 쉽게 접할 수 있는 용어입니다.
오류를 찾는 것도 포함하지만, 일반적으로는 특정 [Programming Style](https://en.wikipedia.org/wiki/Programming_style)에 맞지 않는 source code를 찾는 도구를 말합니다.
eslint는 javascript에서 사용할 수 있는 Linter입니다.

:::tip
tslint(typescript) 그리고 pylint(python)도 Linting을 도와주는 도구들입니다.
:::

:::warning
당연히 javascript를 활용하는 모든 프로젝트에서 eslint를 활용할 수 있습니다.
하지만, 일반적인 예제를 작성하기 위해서, react 기반의 web application을 기준으로 하겠습니다.
:::

먼저 eslint를 설치하는 것부터 시작하겠습니다.

```bash
npm install -g eslint
# 또는
npm install --save-dev eslint
```

eslint binary를 이용해서, 설정을 시작하겠습니다.

```bash
# local에 eslint를 설치한 경우
$ node_modules/.bin/eslint --init

# global에 eslint를 설치한 경우
$ eslint --init

? How would you like to configure ESLint?
❯ Use a popular style guide # popular style guide를 선택하고,
  Answer questions about your style
  Inspect your JavaScript file(s)

? How would you like to configure ESLint? Use a popular style guide
? Which style guide do you want to follow? (Use arrow keys)
❯ Airbnb (https://github.com/airbnb/javascript) # Airbnb style guide를 선택합니다.
  Standard (https://github.com/standard/standard)
  Google (https://github.com/google/eslint-config-google)

? How would you like to configure ESLint? Use a popular style guide
? Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
? Do you use React? (y/N) # 마지막으로 react에 적용하기 위해서, y를 입력합니다.

? How would you like to configure ESLint? Use a popular style guide
? Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
? Do you use React? Yes
? What format do you want your config file to be in? (Use arrow keys)
❯ JavaScript # 사실, 어떠한 형식으로 설정파일을 저장하는 것은 중요하지 않습니다. 아래 예제에서는 .eslintrc.js로 사용하도록 하겠습니다.
  YAML
  JSON

eslint-config-airbnb@latest eslint@^4.19.1 || ^5.3.0 eslint-plugin-import@^2.14.0 eslint-plugin-jsx-a11y@^6.1.1 eslint-plugin-react@^7.11.0
? Would you like to install them now with npm? (Y/n) # Y를 입력해 필요한 eslint plugin을 모두 설치합니다.
```

필요한 모든 eslint plugin을 설치했으니, 이제 마지막으로 설정을 작성하겠습니다.

```js
// .eslintrc.js
module.exports = {
  "extends": [
    "airbnb", // Airbnb style guide를 상속 받습니다.
  ],
  "parser": "babel-eslint",
  "plugins": [
    "prettier",
    "react",
    // "react-native",
    "jest"
  ],
  "env": {
    // "node": true,
    "browser": true, // window나, document등의 객체를 eslint가 인식할 수 있도록 환경을 설정합니다.
    "jest/globals": true // jest를 활용한 테스트 코드에서 각종 jest global variable들을 eslint가 인식할 수 있도록 도와주는 설정입니다.
  },
  "rules": {
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "indent": ["error", 2],
    "semi": [2, "never"],
    "arrow-parens": [2, "as-needed"],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }]
  }
}
```
