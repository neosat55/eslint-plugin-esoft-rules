## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-esoft-rules`:

```sh
npm install eslint-plugin-esoft-rules --save-dev
```

## Usage

Add `esoft-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "esoft-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "esoft-rules/rule-name": 2
    }
}
```

## Supported Rules

[Rules](/docs)