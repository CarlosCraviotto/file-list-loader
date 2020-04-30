# file-list-loader
A file loader that after searched in a path (or paths) recursively, generate an ID for each file based in the name.


[![Build Status](https://travis-ci.org/CarlosCraviotto/file-list-loader.svg?branch=master)](https://travis-ci.com/github/CarlosCraviotto/file-list-loader)
[![Coverage Status](https://coveralls.io/repos/github/CarlosCraviotto/file-list-loader/badge.svg?branch=master&cach=ff)](https://coveralls.io/github/CarlosCraviotto/file-list-loader?branch=master)


### Installation

Install by `npm`

```sh
npm install --save file-list-loader
```
#### Basic Usage

```
/
└── Users
    └── jsons
        ├── unicorn.json
        └── foo
            └── bar
                ├── baz
                └── one.json
```


```typescript
import {MikroOrmModuleDefiner} from "file-list-loader";

const loader = new FileListLoader({
  extensions: ['json'],
  useFilePathInId: false
});

await loader.addPaths({path: './jsons'});

const oneContent = await loader.getFileContent('one');
const unicornContent = await loader.getFileContent('unicorn');

```


### Commands

 - `npm run build`: Build the project (file list loader).
 - `npm run build:clean`: Delete first the dist folder and build it.
 - `npm run clean`: Delete the dist folder.
 - `npm run test`: Execute the tests.
 - `npm run test:coverage`:  Execute the tests and calculate the coverage.
 - `npm run lint`: Check the code using the rules in .eslintre.js
 - `npm run lint:fix`: Check the code and try to fix it.



### License

MIT