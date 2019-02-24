export class Pageable {
    public page: string;
    public size: string;
    public pageNumber: number;

    constructor(page: string, size: string){
        this.page = page;
        this.size = size;
    }
}