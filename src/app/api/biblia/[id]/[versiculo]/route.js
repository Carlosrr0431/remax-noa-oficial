import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const response = await axios.get(
    `https://bible-api.deno.dev/api/read/nvi/${params.id}/${params.versiculo}`
  );

  return NextResponse.json(response.data);
}
