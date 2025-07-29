import { NextResponse } from "next/server";
import connectDB from "@/lib/mongo";
import mongoose from "mongoose";

// Créer un schéma simple pour le test
const TestSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
});

// Créer le modèle (il sera créé seulement s'il n'existe pas déjà)
const TestModel = mongoose.models.Test || mongoose.model("Test", TestSchema);

export async function GET() {
  try {
    await connectDB();
    console.log("MongoDB connection state:", mongoose.connection.readyState);

    // Récupérer tous les documents de test
    const tests = await TestModel.find({});
    return NextResponse.json({ success: true, data: tests });
  } catch (error) {
    console.error("Error in GET /api/test-db:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await connectDB();
    console.log("MongoDB connection state:", mongoose.connection.readyState);

    // Créer un nouveau document de test
    const testDoc = await TestModel.create({
      message: "Test message " + new Date().toISOString(),
    });

    console.log("Created test document:", testDoc);

    return NextResponse.json({
      success: true,
      data: testDoc,
      message:
        "Document created successfully. Check MongoDB Compass to see it.",
    });
  } catch (error) {
    console.error("Error in POST /api/test-db:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
