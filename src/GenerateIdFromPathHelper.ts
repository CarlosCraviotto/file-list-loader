import {FileIdConfig} from "./FileIdConfig";

import * as path from 'path';

const UNION_STRING = '_';

export class GenerateIdFromPathHelper {


    public static get(pathName: string, fileIdConfig: FileIdConfig) {
        const pathParsed = path.parse(pathName);
        let pathNewName = pathParsed.name;

        pathNewName = this.addDirPath(pathNewName, fileIdConfig, pathParsed.dir);

        pathNewName = this.addPrefix(pathNewName, fileIdConfig);
        return pathNewName;
    }

    private static addPrefix(pathNewName: string, fileIdConfig: FileIdConfig){

        if (fileIdConfig.prefix) {
            pathNewName = fileIdConfig.prefix + UNION_STRING + pathNewName;
        }

        return pathNewName;
    }

    private static addDirPath(pathNewName: string, fileIdConfig: FileIdConfig, dir: string) {
        let dirBase: string = '';

        if (fileIdConfig.useFilePathInId) {
            dirBase = dir.split(path.sep).filter((pathChunk: string)=>{
                return pathChunk.length
            }).join(UNION_STRING);

            pathNewName = dirBase + UNION_STRING + pathNewName;
        }

        return pathNewName;
    }
}