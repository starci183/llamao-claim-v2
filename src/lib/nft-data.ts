import type { NftMetadata } from "@/type";
import { MONAD_CONTRACT_ADDRESSES } from "@/contance";

// const TESTMINT = "0x813b9f077ac6470c264186bcb72a27eb547f5cc6";
const PAGE_1 = "0xa8275fbf5fb47f632862db1cc4a6fbb5bd725856";
const PAGE_2 = "0x7238893dd7e2fa516566c56e860007d35ae0d186";

export const NFT_DUMMY: Record<string, (NftMetadata & { address: string })> = {
    // [TESTMINT]: {
    //     address: TESTMINT,
    //     name: "testmint",
    //     description:
    //         "Test collection used for mint flow, UI checks, and general staging.",
    //     image: `/nft/${TESTMINT}.png`,
    // },
    [PAGE_1]: {
        address: PAGE_1,
        name: "Page 1",
        description:
            "Golden light falls on open pages. Llamao and the Monadverse mascots sit together, not so rush. They practice Llamaoism toto slow the rushing world that steals our joy - turning each page as if breathing in serenity. Sometimes, the best way forward is to pause. Doing nothing lets life unfold, like llamas in the sun - no rush, no stress, just being.",
        image: `/nft/${PAGE_1}.gif`,
        totalSupply: 20000,
        TBA: "18/08/2025",
    },
    [PAGE_2]: {
        address: PAGE_2,
        name: "Page 2",
        description: "The bearish flows are strong, but Llamao stays calm. In his hand, he holds a green candle of hope, and a .nad domain stands as his shield. He practices Llamaoism to face the rushing flames without fear—showing that calm is not weakness, but a quiet strength that protects us. Sometimes, the best shield is stillness itself.",
        image: `/nft/${PAGE_2}.gif`,
        totalSupply: 20000,
        TBA: "23/08/2025",
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
                image: `/nft/${addr}.gif`,
            }
        );
    });
}
