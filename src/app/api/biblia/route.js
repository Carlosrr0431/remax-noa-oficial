import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {

    const response = await axios.get('https://bible-api.deno.dev/api/books')

    return NextResponse.json(response.data);
}