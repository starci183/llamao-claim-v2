import { NextResponse } from "next/server";
import { getListInConfiguredOrder } from "@/lib/nft-data";

export const dynamic = "force-dynamic";

export async function GET() {
    const items = getListInConfiguredOrder();
    return NextResponse.json({ items }, {
        headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
    });
}
