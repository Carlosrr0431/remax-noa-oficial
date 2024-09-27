import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {

    const response = await axios.get(`https://bible-api.deno.dev/api/book/${params.id}`)

    return NextResponse.json(response.data);
}