export interface Post {
    content: string;
    authorEmail: string;
    authorUsername: string;
    postedDate: fbDate;
    id: string;
}
export type fbDate = {
    seconds: number;
    nanoseconds: number;
}

export interface UserInfoType {
    email: string;
    username: string;
    bio: string;
}