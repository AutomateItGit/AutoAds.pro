import { Document, Types } from "mongoose";

export interface IBusiness extends Document{
    _id: Types.ObjectId;
    name: string;
    ownerId: Types.ObjectId;
    subscription: {
        plan: 'free' | 'basic' | 'premium' | 'enterprise';
        status: 'active' | 'cancelled' | 'expired' | 'unsubscribed';
        customerId: string;
        currentPeriodEnd: Date;
      };
    createdAt: Date;
    updatedAt: Date; 
}