import { Document } from "mongoose";


// Those are the fields that are required for the user model.
// We can also add more fields to the user model.
// This is helpful for type safety, knowing what fields are required for the user model and use it everywhere.
export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    emailVerificationToken?: string | null;
    emailVerificationExpires?: Date | null;
    subscription?: {
        customerId: string | null;
        status: string | null;
        plan: string | null;
    }
}