import {FileIdConfig} from "./FileIdConfig";
import {readFile} from "fs";
import * as util from 'util';
import {GenerateIdFromPathHelper} from "./GenerateIdFromPathHelper";


const readFilePromise = util.promisify(readFile);

export class File {

    private id: string;
    private isLoaded: boolean;
    private content: any;
    private path: string;
    private fileIdConfig: FileIdConfig;

    constructor(path: string, fileIdConfig: FileIdConfig) {
        this.path = path;
        this.fileIdConfig = fileIdConfig;

        this.id = this.generateIdFromPath();
        this.isLoaded = false;
    }

    public isThisFile(id: string): boolean {
        console.log('Comparing ids: ');
        console.log(this.id + '===' + id);
        return this.id === id;
    }

    public getId(): string {
        return this.id;
    }

    public getPath(): string {
        return this.path;
    }

    public async getContent(): Promise<any> {
        if (!this.isLoaded) {
            await this.loadContent();
        }
        return this.content;
    }

    private generateIdFromPath(): string {
        return GenerateIdFromPathHelper.get(this.path, this.fileIdConfig);
    }

    private async loadContent(): Promise<any> {
        this.content = await readFilePromise(this.path, 'utf8');
        this.isLoaded = true;
    }
}