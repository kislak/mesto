# Проект 4: Место

## описание проекта и его функциональности;

учебный проект "место" - основы джаваскрипт   

**Figma**
* [Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* [Ссылка 2 на макет в Figma](https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1)

**Картинки**

Доставать картинки предстоит из Фигмы. Это расхожая практика, поэтому полезно потренироваться.
Не забудьте [оптимизировать картинки](https://tinypng.com/), чтобы ваш сайт загружался быстрее.

## технологии используются
* html, css, bem, js

## [ссылкa на GitHub Pages](https://kislak.github.io/mesto/)


## how to play
```
npm ci          # install from package-lock.json
npm run build
npm run dev
```



### tips and links

####fonts

https://rsms.me/inter/

https://fonts.google.com/specimen/Inter

font-family: "Comic Sans MS", "Comic Sans", cursive;


####pictures

https://unsplash.com/


#### font list

https://www.cssfontstack.com/

```font-family: 'Inter', Arial, sans-serif;```

``` <button type="button> ok </button> ```


Для реализации адаптивной сетки в секции с карточками места можно использовать ключевые слова auto-fit и minmax:
https://medium.com/@stasonmars/%D0%BA%D0%B0%D0%BA-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%8E%D1%82-auto-fill-%D0%B8-auto-fit-%D0%B2-css-grid-7d903a6c678e


####cursor

https://jsfiddle.net/bx4og7n5/

#### webpack

```
npm init #package.json
npm i webpack --save-dev
npm i webpack-cli --save-dev

#> package.json
"scripts": {
  "build": "rm -rf dist && webpack --mode production",
  "dev": "webpack serve"
}

npm run build
npm run dev

#> webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
module.exports = {
    entry: { main: './scripts/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true // сайт будет открываться сам при запуске npm run dev
    },
}

npm i @babel/core --save-dev
npm i @babel/preset-env --save-dev
npm i core-js --save
npm i babel-loader --save-dev

#> babel.config.js
const presets = [
  ['@babel/env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать
      edge: '17',
      ie: '11',
      firefox: '50',
      chrome: '64',
      safari: '11.1'
    },
    useBuiltIns: "entry"
  }]
];
module.exports = { presets };

#> webpack.confing.js
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            }
        ]
    }

npm i html-webpack-plugin --save-dev 
#> webpack.confing.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

npm i clean-webpack-plugin --save-dev 


npm i css-loader --save-dev
npm i mini-css-extract-plugin --save-dev 

#> webpack.confing.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
rules: [
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, {
      loader: 'css-loader'
    }]
  }
] 
plugins: [
  new MiniCssExtractPlugin()
]

#> index.html 
#remove:
<link rel="stylesheet" href="./style.css">

#> index.js
import './styles/index.css'; 

npm i postcss-loader --save-dev
npm i autoprefixer --save-dev
npm i cssnano --save-dev

#> postcss.config.js
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
module.exports = {
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
};
  
```
