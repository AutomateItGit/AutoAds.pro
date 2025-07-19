import { model, models, Schema } from "mongoose";
import { IBusiness } from "@/types/business";

const businessSchema = new Schema<IBusiness>({
    name: {type: String, required: true},
    ownerId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    subscription: {
        plan: {type: String, required: false},
        status: {type: String, required: false},
        customerId: {type: String, required: false},
        currentPeriodEnd: {type: Date, required: false},
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

const Business = models.Business || model<IBusiness>("Business", businessSchema);

export default Business;