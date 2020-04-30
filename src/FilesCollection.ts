import {File} from "./File";

export class FilesCollection {

    private collection: Array<File>;

    public constructor() {
        this.collection = [];
    }

    public add (file: File) {
        if (this.findById(file.getId())) {
            const errorTextFileName = 'id: ' + file.getId();
            throw new Error('This file ('+errorTextFileName+') already exist in collection.');
        }
        this.collection.push(file);
    }

    public getContentOf(id: string): any{
        const file = this.findById(id);

        if (!file) {
            throw new Error('The file with id '+id+' doesn\'t exist in collection.');
        }

        return file.getContent();
    }

    private findById(id: string) {
        return this.collection.find((file: File)=>{
            return file.isThisFile(id);
        });
    }
}