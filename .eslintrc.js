module.exports = {
    "parserOptions": {
      "ecmaVersion": 7, // ECMAScript版本，7为ES7
      "sourceType": "module", //默认script，如果代码是ECMAScript模块，设置为module
      "ecmaFeatures": { 
          "jsx": true // 启用JSX
      }
    },
    "env": {
      "es6": true,
      "node": true,
      "browser": true,
    },
    "globals": {
      "document": true,
      "navigator": true,
      "window":true,
      "node":true
    },
    // 继承第三方校验规则eslint-config-airbnb
    // "extends": "airbnb-base",
    // eslint-config-airbnb包括了以下3个插件
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    // 定制自己的规则
    "rules": {
      "comma-dangle": ["error", "never"], // 要求或禁止末尾逗号：不允许逗号
      "indent": ["error", 4], // JavaScript代码强制使用一致的缩进：4格缩进
    }
  };