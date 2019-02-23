export class CustomDataTableColumn {
    public name: string;
    public value: string;

    constructor(columnName: string, columnValue: string){
        this.name = columnName;
        this.value = columnValue;
    }
}