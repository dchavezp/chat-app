export interface ComponentWithChildren {
    children?: React.ReactNode;
}
export interface UserI {
    username: string;
    userid: string;
    imgPath?: string;
}
export interface Message {
    senderUsername: string;
    senderImage: string;
    messageText: string;
    messageDate: Date;
    idMessage: string;
}
