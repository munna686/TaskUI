export interface User {
    userId: number;
    userName: string;
    profilePicture: string | null;
    email: string;
    passwordHash: string;
    role: string 
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: string;
    updatedBy: string | null;
  }