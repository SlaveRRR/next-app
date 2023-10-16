import { NextRequest,NextResponse } from "next/server";
import data from '@/data/data.json'

export const GET = async (request: NextRequest) => {
    return NextResponse.json(data)
}