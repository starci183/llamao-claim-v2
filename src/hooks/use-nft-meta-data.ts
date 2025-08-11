/* eslint-disable @typescript-eslint/no-unused-vars */
import { MONAD_CONTRACT_ADDRESS } from "@/contance";
import { useState } from "react";
import type { NftMetadata } from "./use-contract";

export function useNftMetadata(contractURI?: string) {
    const [data, setData] = useState<NftMetadata | null>({
        name: "Llamao’s Last Supper",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: `/nft/${MONAD_CONTRACT_ADDRESS}.png`,
    });
    const [loading, setLoading] = useState(false);

    /* TODO: enable when has data */
    // useEffect(() => {
    //     if (!contractURI) return;

    //     const controller = new AbortController();
    //     const timeoutId = setTimeout(() => controller.abort(), 2000);

    //     const fetchMetadata = async () => {
    //         setLoading(true);
    //         try {
    //             const res = await fetch(contractURI, { signal: controller.signal });
    //             if (!res.ok) throw new Error("Failed to fetch metadata");

    //             const json = await res.json();
    //             if (!json) throw new Error("Invalid metadata");
    //             setData(json);
    //         } catch {
    //             setData({
    //                 name: "Llamao",
    //                 description: "...",
    //                 image: "/gifs/llamao_last_supper.gif",
    //             });
    //         } finally {
    //             clearTimeout(timeoutId);
    //             setLoading(false);
    //         }
    //     };

    //     fetchMetadata();
    //     return () => controller.abort();
    // }, [contractURI]);

    return { data, loading };
}
