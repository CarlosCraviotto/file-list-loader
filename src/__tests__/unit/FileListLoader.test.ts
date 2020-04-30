import chai = require('chai');

import {FileListLoader} from '../../FileListLoader';
import {rejects} from "assert";

let fileListLoaderTest: FileListLoader;

describe('FileListLoader class tests', function () {


    it('Should load the content of files', async function () {
        fileListLoaderTest = new FileListLoader({
            extensions: ['json'],
            useFilePathInId: false
        });

        await fileListLoaderTest.addPaths({path: './src/__tests__/files'});

        const fileContent = await fileListLoaderTest.getFileContent('one');
        chai.assert.deepEqual({"language": "en"}, JSON.parse(fileContent));

        const fileContentTwo = await fileListLoaderTest.getFileContent('two');
        chai.assert.deepEqual({"team": true}, JSON.parse(fileContentTwo));

        //ask again for same file
        const fileContentOne = await fileListLoaderTest.getFileContent('one');
        chai.assert.deepEqual({"language": "en"}, JSON.parse(fileContentOne));
    });


    it('Should throw an error if the file id doesn\'t exist in collection', async function () {
        fileListLoaderTest = new FileListLoader({
            extensions: ['ts']
        });

        await fileListLoaderTest.addPaths({path: './src/__tests__/files'});

        chai.assert.throws(function () {
            fileListLoaderTest.getFileContent('none');
        }, 'The file with id none doesn\'t exist in collection.');
    });

    it('Should read a ts config', async function () {
        fileListLoaderTest = new FileListLoader({
            extensions: ['ts']
        });

        await fileListLoaderTest.addPaths({path: './src/__tests__/files'});
        await fileListLoaderTest.getFileContent('one');
    });


    it('Should throw an error if we have to files with same id',    async function () {
        fileListLoaderTest = new FileListLoader({
            extensions: ['ts', 'json'],
            useFilePathInId: false
        });

        await rejects(
            fileListLoaderTest.addPaths({path: './src/__tests__/files'}),
            '\'This file (one) already exist in collection.\''
        );

    });

});
