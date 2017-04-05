# Dotfiles Generator
Utility to auto-generate dotfiles like .gitignore, .editorconfig etc. in your project.

[![npm](https://img.shields.io/npm/v/dotfiles-generator.svg)](https://www.npmjs.com/package/dotfiles-generator)
[![GitHub issues](https://img.shields.io/github/issues/sun1l/dotfiles-generator.svg)](https://github.com/sun1l/dotfiles-generator/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/sun1l/dotfiles-generator/master/LICENSE)

[Installation](#Installation) |
[Usage](#usage) |
[Available dotfiles](#available-dotfiles) |
[Contributing](#contributing) |
[License](#license)

## Installation

### Global Installation

Global installation is recommended; it allows you to generate and update dotfiles in any folder without specifying an absolute path.

```bash
npm install dotfiles-generator --g
```

### Local Installation

You can also install `dotfiles-generator` locally as a dev dependency, and it will automatically add the common dotfiles required for any project. If a dotfile already exist, it will be skipped.

```bash
npm install dotfiles-generator --save-dev
```

## Usage

Once the `dotfiles-generator` is installed globally, you can add all available dotfiles by passing their name as argument. For e.g.

```bash
dotfiles-generator .gitignore .editorconfig
```

This will add `.gitignore` and `.editorconfig` in your current working directory. You can also specify `-d` or `--destination` to add dotfiles in any other directory.

```bash
dotfiles-generator .gitignore .editorconfig -d examples/
```

If you have installed `dotfiles-generator` as local dependency, you can still access the command line by running from `node_modules/.bin`

```bash
node node_modules/.bin/dotfiles-generator .gitignore .editorconfig
```

### Overwriting

If any of the dotfile already exist, `dotfiles-generator` will not overwrite by default. To force overwrite, you need to pass `--overwrite`. For e.g.

```bash
dotfiles-generator .gitignore .editorconfig --overwrite
```

<a id="available-dotfiles"></a>
## Available dotfiles
```bash
.gitignore
.editorconfig
.npmignore
.eslintrc
.stylelintrc
```

### Additional information on dotfiles

| **Dotfile**  | **Configuration for**             | **Reference**                                                                                    |
|--------------|-----------------------------------|---------------|
| .eslintrc    | [ESLint](http://eslint.org)       | Extracted from [feross/eslint-config-standard](https://github.com/feross/eslint-config-standard) |
| .stylelintrc | [Stylelint](https://stylelint.io) | - |                                                                                                |


## Contributing

If you also like the idea of creating standard dotfiles, which can be shared with others, and you think you can contribute by improving the currently available dotfiles or adding new ones, please send a pull request.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

*   **Sunil Kumar** - [@sun1lkumar](https://twitter.com/sun1lkumar)

See also the list of [contributors](https://github.com/sun1l/dotfiles-generator/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
