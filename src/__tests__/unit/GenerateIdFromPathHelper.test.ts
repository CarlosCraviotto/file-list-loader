import chai = require('chai');
//import { ImportMock } from 'ts-mock-imports';

import {GenerateIdFromPathHelper} from '../../GenerateIdFromPathHelper';
import * as path from "path";
import {FileIdConfig} from "../../FileIdConfig";

const pathName = path.sep + 'home' + path.sep + 'user' + path.sep + 'dir' + path.sep + 'file.txt';

describe('GenerateIdFromPathHelper class tests', function () {


    it('Should generate an id from pathName with prefix and path', function () {
        const fileIdConfig: FileIdConfig = {
            useFilePathInId: true,
            prefix: 'prefix'
        };
        const idFile = GenerateIdFromPathHelper.get(pathName, fileIdConfig);

        chai.assert.deepEqual('prefix_home_user_dir_file',idFile);
    });

    it('Should generate an id from pathName with prefix and without path', function () {
        const fileIdConfig: FileIdConfig = {
            useFilePathInId: false,
            prefix: 'prefix'
        };
        const idFile = GenerateIdFromPathHelper.get(pathName, fileIdConfig);

        chai.assert.deepEqual('prefix_file',idFile);
    });

    it('Should generate an id from pathName with path  and without prefix', function () {
        const fileIdConfig: FileIdConfig = {
            useFilePathInId: true,
            prefix: ''
        };
        const idFile = GenerateIdFromPathHelper.get(pathName, fileIdConfig);

        chai.assert.deepEqual('home_user_dir_file',idFile);
    });

    it('Should generate an id from pathName  without path and without prefix', function () {
        const fileIdConfig: FileIdConfig = {
            useFilePathInId: false,
            prefix: ''
        };
        const idFile = GenerateIdFromPathHelper.get(pathName, fileIdConfig);

        chai.assert.deepEqual('file',idFile);
    });


    // it('Should throw an error if the GenerateIdFromPathHelper', function () {
    //     chai.assert.throws(function () {
    //         GenerateIdFromPathHelper.otherMehotd();
    //     }, 'Unexpected end of JSON input');
    // });

});
