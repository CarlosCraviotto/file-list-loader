import {PathConfig} from "./PathConfig";
import {FilesCollection} from "./FilesCollection";
import {LoadFilesNamesFromPath} from "./LoadFilesNamesFromPath";
import {FileListLoaderConfig} from "./FileListLoaderConfig";


export class FileListLoader {
    private config: FileListLoaderConfig;
    private collection: FilesCollection;

    public constructor(config: FileListLoaderConfig) {
        this.config = this.setDefaultValues(config);

        this.collection = new FilesCollection();
    }

    public async addPaths(pathConfig: PathConfig): Promise<void> | never {
        const loader = new LoadFilesNamesFromPath(pathConfig, this.config, this.collection);
        await loader.findFilesNames(pathConfig.path);
    }

    public getFileContent(fileId: string): any {
        return this.collection.getContentOf(fileId);
    }

    private setDefaultValues(config: FileListLoaderConfig): FileListLoaderConfig {
        if (!config.rootPath) {
            config.rootPath = process.cwd();
        }

        if (typeof config.useFilePathInId === undefined) {
            config.useFilePathInId = true;
        }
        return config;
    }
}