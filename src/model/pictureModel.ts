class Picture {
    idPicture: number;
    namePicture?: string;
    icon?: boolean;
    link?: string;
    dataPicture?: string;

    constructor(
        idPicture: number,
        namePicture: string,
        icon: boolean,
        link: string,
        dataPicture: string
    ) {
        this.idPicture = idPicture;
        this.namePicture = namePicture;
        this.icon = icon;
        this.link = link;
        this.dataPicture = dataPicture;
    }
}
export default Picture;