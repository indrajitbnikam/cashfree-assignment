// Recurssive comment ds

export interface IComment {
  id: number;
  fullId: string;
  userId: number;
  comment: string;
  time: string;
  replies: IComment[];
}

export interface IUser {
  id: number;
  name: string;
}
