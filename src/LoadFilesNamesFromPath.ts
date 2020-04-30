import {PathConfig} from "./PathConfig";
import {FileIdConfig} from "./FileIdConfig";
import {FilesCollection} from "./FilesCollection";

import {readdir, stat} from "fs";
import * as path from "path";
import {File} from "./File";
import {FileListLoaderConfig} from "./FileListLoaderConfig";

import * as util from 'util';

const readdirPromise = util.promisify(readdir);
const statPromise = util.promisify(stat);


export class LoadFilesNamesFromPath {

    private fileIdConfig: FileIdConfig;

    public constructor(
        private pathConfig: PathConfig,
        private config: FileListLoaderConfig,
        private collection: FilesCollection
    ) {
        this.fileIdConfig = this.getFileIdConfig();
    }

    public async findFilesNames(pathname: string) {
        pathname = this.getAbsolutePath(pathname);
        const files = await readdirPromise(pathname);

        for (let file of files) {
            const filepath = path.join(pathname, file);
            const stat = await statPromise(filepath);

            if (stat.isDirectory()) {
                await this.findFilesNames(filepath);
            } else if (this.isValidFilePathByExtension(file)){
                const fileEntity = new File(filepath, this.fileIdConfig);
                this.collection.add(fileEntity);
            }
        }
    }

    private getFileIdConfig(): FileIdConfig {
        return {
            useFilePathInId: this.config.useFilePathInId,
            prefix: this.pathConfig.prefix,
        };
    }

    private getAbsolutePath(pathname: string): string {
        if (path.isAbsolute(pathname)) {
            return pathname;
        }
        return [this.config.rootPath, pathname].join(path.sep);
    }

    private isValidFilePathByExtension(pathname: string): boolean {
        const textReg = '\.(' + this.config.extensions.join('|') + ')$'
        const regularExpression = new RegExp(textReg, 'i');
        return regularExpression.test(pathname);
    }
}