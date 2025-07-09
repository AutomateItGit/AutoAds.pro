import { NextResponse } from "next/server";

/**
 * GET endpoint
 * @description Fetches data from the endpoint
 * @returns Response with the fetched data
 */
export async function GET(req: Request) {
    try {
        // Your GET logic here
        const data = { message: "Data fetched successfully" };

        return NextResponse.json(
            { success: true, data },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error in GET request:", err);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * POST endpoint
 * @description Creates a new resource
 * @param req Request object containing the data to create
 * @returns Response with the created data
 */
export async function POST(req: Request) {
    try {
        // Parse the request body
        const body = await req.json();

        // Your POST logic here
        const createdData = { ...body, id: "new-id" };

        return NextResponse.json(
            { success: true, data: createdData },
            { status: 201 }
        );
    } catch (err) {
        console.error("Error in POST request:", err);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * PUT endpoint
 * @description Updates an existing resource
 * @param req Request object containing the data to update
 * @returns Response with the updated data
 */
export async function PUT(req: Request) {
    try {
        // Parse the request body
        const body = await req.json();

        // Your PUT logic here
        const updatedData = { ...body, updatedAt: new Date() };

        return NextResponse.json(
            { success: true, data: updatedData },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error in PUT request:", err);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE endpoint
 * @description Deletes a resource
 * @param req Request object containing the ID to delete
 * @returns Response confirming the deletion
 */
export async function DELETE(req: Request) {
    try {
        // Parse the request body
        const body = await req.json();

        // Your DELETE logic here
        const result = { message: "Resource deleted successfully" };

        return NextResponse.json(
            { success: true, data: result },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error in DELETE request:", err);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
} 