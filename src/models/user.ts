import { Schema, models, model } from "mongoose";
import { IUser } from "../types/user";


// This is the user schema, we can specify the fields and their types, add default values, add validations, etc.
export const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [30, "Name must be less than 30 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
        default: "https://ui-avatars.com/api/?name=John+Doe",
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    subscription: {
        customerId: {
            type: String,
            required: [false, "Customer ID is not required"],
        },
        status: {
            type: String,
            required: [false, "Status is not required"],
        },
        plan: {
            type: String,
            required: [false, "Plan is not required"],
        },
    },
    emailVerificationToken: {
        type: String,
        required: [false, "Email verification token is not required"],
    },
    emailVerificationExpires: {
        type: Date,
        required: [false, "Email verification expires is not required"],
    },
}, { timestamps: true });


// This is the user model. It is used to create a new user. This prevent us from using sql every time.
// We can use this model to create a new user, get a user, update a user, delete a user, etc WITH BUILT IN FUNCTIONS.
export const User = models.User || model<IUser>("User", UserSchema);