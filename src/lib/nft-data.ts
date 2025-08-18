import type { NftMetadata } from "@/type";
import { MONAD_CONTRACT_ADDRESSES } from "@/contance";

const TESTMINT = "0x813b9f077ac6470c264186bcb72a27eb547f5cc6";
const MONAD_GIRL = "0x913bF9751Fe18762B0fD6771eDD512c7137e42bB";

export const NFT_DUMMY: Record<string, (NftMetadata & { address: string })> = {
    [TESTMINT]: {
        address: TESTMINT,
        name: "testmint",
        description:
            "Test collection used for mint flow, UI checks, and general staging.",
        image: `/nft/${TESTMINT}.png`,
    },
    [MONAD_GIRL]: {
        address: MONAD_GIRL,
        name: "monad girl",
        description:
            "A playful piece from the Monad series — used for demo and previews.",
        image: `/gifs/llamao_last_supper.gif`,
    },
};

export function getListInConfiguredOrder() {
    return MONAD_CONTRACT_ADDRESSES.map((addr) => {
        const hit = NFT_DUMMY[addr];
        return (
            hit ?? {
                address: addr,
                name: `Collection ${addr.slice(0, 6)}…${addr.slice(-4)}`,
                description: "Dummy metadata not set.",
                image: `/nft/${addr}.png`,
            }
        );
    });
}
