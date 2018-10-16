# Webpack

::: warning
webpack 4.20.2를 기준으로 적성되었습니다.
:::

## [Webpack](https://webpack.js.org/)이란 무엇인가요

[node.js](https://nodejs.org/)의 등장으로 실질적인 모듈화가 가능해지면서,
[npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/)과 같은 package manager들과 함께 Javascript도 새로운 시대를 맞이하게 되었습니다.

::: warning
(CommonJS, AMD에 관련된 내용도 추후에 작성하겠습니다.)
:::

하지만, [node.js](https://nodejs.org/) 환경이 아닌 [웹 브라우저(Web Browser)](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80) 환경에서 파일 단위의 모듈(module)을 사용하는 일은 여전히 쉬운 일이 아닙니다. [node.js](https://nodejs.org/) 환경에서 제작한 [Web application](https://en.wikipedia.org/wiki/Web_application)을 [웹 브라우저(Web Browser)](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80) 환경의 사용자들에게 배포하기 위해 의존성을 갖는 모듈들을 [즉시 실행 함수 표현(IIFE)](https://developer.mozilla.org/docs/Glossary/IIFE)로 변경해 주면서 하나의 파일로 묶어주는 과정(bundling)은 필수적이고, 이 과정을 쉽게 처리해주는 도구가 바로 [Webpack](https://webpack.js.org/)입니다.

## [Webpack](https://webpack.js.org/) 시작하기

[Webpack](https://webpack.js.org/)으로 [node.js](https://nodejs.org/) 환경에서 제작한 [Web application](https://en.wikipedia.org/wiki/Web_application)을 하나의 번들로 만들어 봅시다!!

기본적인 디렉토리 구조를 정해두고, webpack을 밑바닥부터 시작하겠습니다.

먼저 npm init으로 package.json을 만들고 시작하겠습니다.

```bash
npm init -y
```

```dir
.
├── src
├── dist
│   ├── index.html
│   ├── webpack.config.js
└── package.json
```

### [Webpack](https://webpack.js.org/) 설치하기

[Webpack](https://webpack.js.org/)은 [npm](https://www.npmjs.com/)이나 [yarn](https://yarnpkg.com/)과 같은 package manager를 통해서 설치할 수 있습니다.
실제 제작하는 앱에는 의존성이 필요하지 않으므로, devDependencies에 추가되도록 --save-dev 옵션을 사용합니다.

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
```

::: warning
webpack 4로 넘어오면서, webpack에서 사용하는 바이너리들은 webpack-cli로 분리되었습니다.
따라서, webpack 명령어들을 사용하기 위해서 webpack뿐만 아니라 webpack-cli도 함께 설치해야합니다.
:::

### webpack.config.js 작성하기

아래는 기본적인 webpack.config.js 파일의 구조입니다.

```js{3}
// ./build/webpack.config.js
module.exports = {
    mode: 'development', // 'development' 혹은 'production'을 사용할 수 있으며, 'production'인 경우, 자동으로 최적화가 진행됩니다!
    entry: '',
    output: {},
    module: {
        rules: [],
    },
    plugins: [],
}
```

지금부터 각 프로퍼티의 역할을 알아보도록 하겠습니다.

#### entry 프로퍼티

bundle을 만들기 위한 시작점이 되는 파일의 경로입니다.
webpack은 이 파일을 시작으로 각 모듈들의 의존성을 파악하고 bundle을 만들게됩니다.

```js{4}
// ./build/webpack.config.js
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {},
    module: {
        rules: [],
    },
    plugins: [],
}
```

#### output 프로퍼티

webpack이 만드는 bundle을 저장할 디렉토리의 경로와 bundle 파일의 이름을 지정하는 프로퍼티입니다.

::: tip
*[path 모듈(module)의 resolve 메소드(method)](https://nodejs.org/docs/latest-v8.x/api/path.html#path_path_resolve_paths)를 사용해서 경로를 지정하는 이유는 무엇인가요?*

경로의 분리자(directory separator)는 os 별로 다를 수 있습니다.
windows의 경우 \ 로 경로를 구분하지만, linux에서는 / 를 사용하는 것처럼 말입니다.
따라서, 범용적으로 사용될 수 있는 설정을 만들기 위해서는 [path 모듈(module)의 resolve 메소드(method)](https://nodejs.org/docs/latest-v8.x/api/path.html#path_path_resolve_paths)를 사용해
경로를 지정해야 합니다.
:::

::: tip
*[__dirname](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_dirname)은 무엇인가요?*

node.js의 Global Objects 중의 하나이며, [__dirname](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_dirname)을 부르고 있는 현재 모듈(module)의 경로입니다.
:::

```js{7,8,9,10}
// ./build/webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // bundle이 생성될 경로를 지정하는 프로퍼티입니다.
        filename: 'bundle.js', // 생성될 bundle의 파일 이름을 정해주는 프로퍼티입니다.
    },
    module: {
        rules: [],
    },
    plugins: [],
}
```

bundle.js라는 파일 이름도 작성했으니, 이 bundle.js 파일을 불러줄 html 파일을 만들도록 하겠습니다.

```html
<!-- ./build/index.html -->
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Webpack 시작하기</title>
    </head>
    <body>
        <script src="/dist/bundle.js"></script>
    </body>
</html>
```

#### module.rules 프로퍼티

[Webpack](https://webpack.js.org/)이 번들링(bundling)할 규칙을 정하는 프로퍼티입니다.
[Webpack](https://webpack.js.org/)은 Loader를 이용하여 javascript 뿐만 아니라 typescript, CSS나 이미지, 웹폰트, .jsx, .tsx, .vue 심지어 .md이나 .txt 까지 다양한 종류의 파일을 함께 번들링할 수 있습니다.

아래는 src 디렉토리 안의 js, jsx 파일들을 번들링하는 설정 예제입니다.

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env
// 현재 번들링을 진행할 소스가 React에 의존성을 가지고 있다면 아래의 babel preset도 함께 설치해주세요.
npm install --save-dev @babel/preset-react
```

babel을 사용하기 위해서, .babelrc 파일을 만들도록 하겠습니다.

```.babelrc
{
    "presets": ["@babel/preset-env"]
}
```

현재 번들링을 진행할 소스가 React에 의존성을 가지고 있다면 아래와 같이 .babelrc를 작성합니다.

```.babelrc
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

```js{12,13,14,15,16,17,18}
// ./build/webpack.config.js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // node_modules 내부의 모듈들은 번들링에서 제외하기 위한 옵션입니다.
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
    },
    plugins: [],
}
```

Rule Object의 use 프로퍼티는 아래와 같이 다양한 방법으로 작성할 수 있습니다.

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                }
            },
                        {
                test: /\.(js|jsx)$/,
                use: ['babel-loader']
            },
                        {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
            },
        ],
    },
}
```

카테고리 다시 정리해야겠다
