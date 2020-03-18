export class UsuarioDTO {
    id: number;
    name: string;
    email: string;
    imageSrc: String;

    constructor(id: number, name: string, email: string, imageSrc: String) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.imageSrc = imageSrc;
    }
}
