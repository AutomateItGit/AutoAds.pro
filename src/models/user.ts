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
        required: false,
    },
    password: {
        type: String,
        required: [false, "Password is not required for OAuth users"],
        minlength: [8, "Password must be at least 8 characters long"],
        validate: {
            validator: function(password: string) {
                // If password is provided, it should meet length requirements
                // OAuth users will have OAUTH_USER_ prefix which satisfies length
                return !password || password.length >= 8;
            },
            message: "Password must be at least 8 characters long when provided"
        }
    },
    dashboardAccess: {
        type: Boolean,
        required: [false, "Dashboard access is not required"],
        default: false,
    },
    emailVerificationToken: {
        type: String,
        required: [false, "Email verification token is not required"],
    },
    emailVerificationExpires: {
        type: Date,
        required: [false, "Email verification expires is not required"],
    },
    businessId: {
        type: Schema.Types.ObjectId,
        ref: "Business",
        required: [false, "Business ID is not required"],
    },
    }, { timestamps: true });


// This is the user model. It is used to create a new user. This prevent us from using sql every time.
// We can use this model to create a new user, get a user, update a user, delete a user, etc WITH BUILT IN FUNCTIONS.
export const User = models.User || model<IUser>("User", UserSchema);