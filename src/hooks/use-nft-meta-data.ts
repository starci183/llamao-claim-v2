import { useEffect, useState } from "react";
import type { NftMetadata } from "./use-contract";

export function useNftMetadata(contractURI?: string) {
    const [data, setData] = useState<NftMetadata | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!contractURI) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const fetchMetadata = async () => {
            setLoading(true);
            try {
                const res = await fetch(contractURI, { signal: controller.signal });
                console.log("res", res);
                if (!res.ok) throw new Error("Failed to fetch metadata");

                const json = await res.json();
                console.log("json", json);
                if (!json) throw new Error("Invalid metadata");
                setData(json);
            } catch (error) {
                console.error("Error fetching metadata:", error);
                setData({
                    name: "Llamao",
                    description: "...",
                    image: "/gifs/llamao_last_supper.gif",
                });
            } finally {
                clearTimeout(timeoutId);
                setLoading(false);
            }
        };

        fetchMetadata();
        return () => controller.abort();
    }, [contractURI]);

    return { data, loading };
}
