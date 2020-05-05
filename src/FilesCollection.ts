import {File} from './File';
import {FileToList} from './FileToList';

export class FilesCollection {

    private collection: Array<File>;

    public constructor () {
        this.collection = [];
    }

    /**
     * Check if the id is already declared into the collection
     * and if it is not, add it.
     * @param {File} file
     * @returns {void}
     */
    public add (file: File): void {
        if (this.findById(file.getId())) {
            const errorTextFileName = 'id: ' + file.getId();
            throw new Error('This file (' + errorTextFileName + ') already exist in collection.');
        }
        this.collection.push(file);
    }

    /**
     * Return the content of the file gave by id.
     * @param {string} id
     * @param {boolean} dontCacheIt
     * @returns {any}
     */
    public getContentOf (id: string, dontCacheIt: boolean): any {
        const file = this.findById(id);

        if (!file) {
            throw new Error('The file with id ' + id + ' doesn\'t exist in collection.');
        }

        return file.getContent(dontCacheIt);
    }

    /**
     * Get a list with the id and the path of each file.
     * @returns {Array<FileToList>}
     */
    public getListOfFiles (): Array<FileToList> {
        return this.collection.map((file: File)=>{
            return file.getFileToList();
        });
    }

    private findById (id: string): File | undefined {
        return this.collection.find((file: File)=>{
            return file.isThisFile(id);
        });
    }

}
