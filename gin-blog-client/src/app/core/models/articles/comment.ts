import { Profile } from '../users/profile';

export interface Comment {
    id: number;
    body: string;
    createdAt: string;
    author: Profile;
}
