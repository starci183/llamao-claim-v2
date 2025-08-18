
"use client";

import { useEffect, useMemo, useState } from "react";
// Reuse your existing type from the sibling hook file:
import type { NftMetadata } from "./use-contract";
import { MONAD_CONTRACT_ADDRESSES, PRIMARY_MONAD_CONTRACT } from "@/contance";

type Options = {
    /** MUST pass this so we fetch /api/nft/<address> */
    address?: string;
};

const FALLBACK: NftMetadata = {
    name: "Llamao’s Last Supper",
    description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived five centuries and the leap into electronic typesetting.",
    image: `/nft/${PRIMARY_MONAD_CONTRACT}.png`,
};

// Cross-browser AbortError check
function isAbortError(err: unknown): boolean {
    // DOMException in most browsers
    if (err instanceof DOMException && err.name === "AbortError") return true;
    // Fallback shape check (some runtimes/polyfills)
    return (
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        (err as { name: string }).name === "AbortError"
    );
}

export function useNftMetadata(arg?: Options | string) {
    // Backward compatibility: if someone passes a string, ignore it (we hardcode now)
    const opts: Options = useMemo(() => {
        if (typeof arg === "string") return {};
        return arg ?? {};
    }, [arg]);

    const { address } = opts;

    const [data, setData] = useState<NftMetadata | null>(FALLBACK);
    const [listData, setListData] = useState<NftMetadata[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const controller = new AbortController();

        async function load() {
            setLoading(true);

            // --- single item ---
            try {
                if (address) {
                    const r = await fetch(`/api/nft/${address}`, { signal: controller.signal });
                    if (r.ok) {
                        const json = (await r.json()) as NftMetadata;
                        if (!cancelled) setData(json);
                    } else {
                        if (!cancelled) setData({ ...FALLBACK, image: `/nft/${address}.png` });
                    }
                } else {
                    if (!cancelled) setData(FALLBACK);
                }
            } catch (e) {
                if (!isAbortError(e)) {
                    // Optional: keep silent or log once
                    // console.error("useNftMetadata(single) error:", e);
                }
                // On abort, do nothing (silence)
            }

            // --- list items ---
            try {
                const rl = await fetch(`/api/nfts`, { signal: controller.signal });
                if (rl.ok) {
                    const json = (await rl.json()) as { items: (NftMetadata & { address: string })[] };
                    if (!cancelled) setListData(json.items);
                } else {
                    if (!cancelled) {
                        setListData(
                            MONAD_CONTRACT_ADDRESSES.map((a) => ({ ...FALLBACK, image: `/nft/${a}.png` }))
                        );
                    }
                }
            } catch (e) {
                if (!isAbortError(e)) {
                    // Optional: keep silent or log once
                    // console.error("useNftMetadata(list) error:", e);
                }
                if (!cancelled) {
                    setListData(
                        MONAD_CONTRACT_ADDRESSES.map((a) => ({ ...FALLBACK, image: `/nft/${a}.png` }))
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
            // Aborts in dev (StrictMode double-invoke) and during route changes — now safely ignored.
            controller.abort();
        };
    }, [address]);

    return { data, listData, loading };
}
