import {FileIdConfig} from './FileIdConfig';

import * as path from 'path';

const UNION_STRING = '_';

export class GenerateIdFromPathHelper {

    public static get (
        pathName: string,
        fileIdConfig: FileIdConfig,
        rootPath: string
    ): string {
        // replace the root path side in the the file path
        pathName = pathName.replace(rootPath, '');

        // parse the path to get the name and the dir values
        const pathParsed = path.parse(pathName);
        let pathNewName = pathParsed.name;

        // apply the configuration to the id
        pathNewName = this.addDirPath(pathNewName, fileIdConfig, pathParsed.dir);
        pathNewName = this.addPrefix(pathNewName, fileIdConfig);

        return pathNewName;
    }

    private static addPrefix (pathNewName: string, fileIdConfig: FileIdConfig): string {

        if (fileIdConfig.prefix) {
            pathNewName = this.addPrefixToPathName(fileIdConfig.prefix, pathNewName);
        }

        return pathNewName;
    }

    private static addDirPath (
        pathNewName: string,
        fileIdConfig: FileIdConfig,
        dir: string
    ): string {
        let dirBase = '';

        if (fileIdConfig.useFilePathInId) {
            dirBase = dir.split(path.sep).filter((pathChunk: string) => {
                return pathChunk.length;
            }).join(UNION_STRING);

            pathNewName = this.addPrefixToPathName(dirBase, pathNewName);
        }

        return pathNewName;
    }

    private static addPrefixToPathName (prefix: string, pathName: string): string {
        return (prefix.length > 0) ? prefix + UNION_STRING + pathName : pathName;
    }

}
