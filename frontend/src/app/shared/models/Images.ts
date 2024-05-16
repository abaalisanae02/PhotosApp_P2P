export class Images{
    id!: string;
    name!:string;
    data!:string;
    contentType!:string;

    constructor(name: string, data: string, contentType:string) {
        this.name = name;
        this.data = data;
        this.contentType=contentType;
    }
}