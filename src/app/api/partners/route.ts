import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

type PartnerItem = {
    name: string;
    img: string;
};

export async function GET() {
    try {
        const partnersDir = path.join(process.cwd(), "public", "partners");
        const entries = await fs.promises.readdir(partnersDir, {
            withFileTypes: true,
        });

        const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

        const items: PartnerItem[] = entries
            .filter((entry) => entry.isFile())
            .map((entry) => entry.name)
            .filter((file) => allowedExtensions.has(path.extname(file).toLowerCase()))
            .sort((a, b) => a.localeCompare(b))
            .map((file) => ({
                name: path.parse(file).name,
                img: `/partners/${file}`,
            }));

        return NextResponse.json(
            { items },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
                },
            }
        );
    } catch {
        return NextResponse.json(
            { items: [], error: "Failed to list partners" },
            { status: 500 }
        );
    }
}


