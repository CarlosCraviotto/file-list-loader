import chai = require('chai');
// import { ImportMock } from 'ts-mock-imports';

import {GenerateIdFromPathHelper} from '../../GenerateIdFromPathHelper';
import * as path from 'path';
import {FileIdConfig} from '../../FileIdConfig';

const pathName = path.sep + 'home' + path.sep + 'user' + path.sep + 'dir' + path.sep + 'file.txt';
const rootPath = path.sep + 'home';

const fileInRoot = '/file2.txt';
const rootPathFileInRoot = '/';

describe('GenerateIdFromPathHelper class tests', function () {

    it('Should generate an id from pathName with prefix and path', function () {
        const fileIdConfig: FileIdConfig = {
            useFilePathInId: true,
            prefix: 'prefix',
        };
        const idFile = GenerateIdFromPathHelper.get(pathName, fileIdConfig, rootPath);

        chai.assert.deepEqual('prefix_user_dir_file', idFile);
    });

    it('Should generate an id from pathName with prefix and without path', function () {
        const fileIdConfig: FileIdConfig = {
            useFilePathInId: false,
            prefix: 'prefix',
        };
        const idFile = GenerateIdFromPathHelper.get(pathName, fileIdConfig, rootPath);

        chai.assert.deepEqual('prefix_file', idFile);
    });

    it('Should generate an id from pathName with path  and without prefix', function () {
        const fileIdConfig: FileIdConfig = {
            useFilePathInId: true,
            prefix: '',
        };
        const idFile = GenerateIdFromPathHelper.get(pathName, fileIdConfig, rootPath);

        chai.assert.deepEqual('user_dir_file', idFile);
    });

    it('Should generate an id from pathName  without path and without prefix', function () {
        const fileIdConfig: FileIdConfig = {
            useFilePathInId: false,
            prefix: '',
        };
        const idFile = GenerateIdFromPathHelper.get(pathName, fileIdConfig, rootPath);

        chai.assert.deepEqual('file', idFile);
    });

    it('Should generate a clean name even if the file is in the root', function () {
        const fileIdConfig: FileIdConfig = {
            useFilePathInId: true,
            prefix: '',
        };
        const idFile = GenerateIdFromPathHelper.get(fileInRoot, fileIdConfig, rootPathFileInRoot);

        chai.assert.deepEqual('file2', idFile);
    });

    // it('Should throw an error if the GenerateIdFromPathHelper', function () {
    //     chai.assert.throws(function () {
    //         GenerateIdFromPathHelper.otherMehotd();
    //     }, 'Unexpected end of JSON input');
    // });

});
