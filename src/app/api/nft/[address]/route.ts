import { NextResponse } from "next/server";
import { NFT_DUMMY } from "@/lib/nft-data";

export const dynamic = "force-dynamic";

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ address: string }> }
) {
    const { address: key } = await ctx.params;
    const meta = NFT_DUMMY[key];

    if (!meta) {
        return NextResponse.json({ error: "Unknown address" }, { status: 404 });
    }

    return NextResponse.json(meta, {
        headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
    });
}
