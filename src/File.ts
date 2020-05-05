import {FileIdConfig} from './FileIdConfig';
import {readFile} from 'fs';
import * as util from 'util';
import {GenerateIdFromPathHelper} from './GenerateIdFromPathHelper';
import {FileToList} from './FileToList';

const readFilePromise = util.promisify(readFile);

export class File {

    private id: string;

    private cache: any;
    private path: string;
    private rootPath: string;
    private fileIdConfig: FileIdConfig;

    constructor (path: string, fileIdConfig: FileIdConfig, rootPath: string) {
        this.path = path;
        this.fileIdConfig = fileIdConfig;
        this.rootPath = rootPath;

        this.id = this.generateIdFromPath();

    }

    public isThisFile (id: string): boolean {
        return this.id === id;
    }

    public getId (): string {
        return this.id;
    }

    public getPath (): string {
        return this.path;
    }

    public getFileToList (): FileToList {
        return {
            id: this.getId(),
            path: this.getPath(),
        };
    }

    public async getContent (dontCacheIt: boolean): Promise<any> {
        let content: any;

        if (!this.cache) {
            content = await this.loadContent();
            this.cache = content;
        } else {
            content = this.cache;
        }

        if (dontCacheIt) {
            this.cache = void(0);
        }

        return content;
    }

    private generateIdFromPath (): string {
        return GenerateIdFromPathHelper.get(this.path, this.fileIdConfig, this.rootPath);
    }

    private async loadContent (): Promise<any> {
        return await readFilePromise(this.path, 'utf8');
    }

}
