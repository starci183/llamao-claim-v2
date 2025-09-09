import type { NftMetadata } from "@/type";
import { MONAD_CONTRACT_ADDRESSES } from "@/contance";

// const TESTMINT = "0x813b9f077ac6470c264186bcb72a27eb547f5cc6";
const PAGE_1 = "0xa8275fbf5fb47f632862db1cc4a6fbb5bd725856";
const PAGE_2 = "0x7238893dd7e2fa516566c56e860007d35ae0d186";
const PAGE_3 = "0xa4a7e2a0aa345072ff19a777d76abf460b5d9a69";
const PAGE_4 = "0x781ed8d6a280806d8c432269a2f317dbf95845af";
const PAGE_5 = "0x8dd114ac2946218de619e492fbf30bf507466cb0";
const PAGE_6 = "0x5cda37bab2b001725ca4f6daab7c0fa751529b02";
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
    [PAGE_3]: {
        address: PAGE_3,
        name: "Page 3",
        description: "Peace grows when we touch grass. Llamao and Overnads lie close to the earth, letting nature ground them. To touch grass is not escape—it’s a reminder to slow down, breathe, and return to what is real. In Llamaoism, stillness itself is progress.",
        image: `/nft/${PAGE_3}.gif`,
        totalSupply: 20000,
        TBA: "26/08/2025",
    },
    [PAGE_4]: {
        address: PAGE_4,
        name: "Page 4",
        description: "Chewy and Llamao plant their tree with no rush. They do not chase the harvest, nor fear missing out. Each leaf that grows is enough, each root that spreads is progress. In their stillness, the tree becomes strong. Llamaoism whispers: plant with patience, and there is no FOMO.",
        image: `/nft/${PAGE_4}.gif`,
        totalSupply: 20000,
        TBA: "29/08/2025",
    },
    [PAGE_5]: {
        address: PAGE_5,
        name: "Page 5",
        description: "Llamao and Chog soak together in the warmth of the onsen. They do not rush the moment, nor chase the world outside. Each breath of steam is enough, each ripple in the water brings peace.In their stillness, the spirit finds balance. Llamaoism whispers: rest deeply, and there is no fade again.",
        image: `/nft/${PAGE_5}.gif`,
        totalSupply: 20000,
        TBA: "05/09/2025",
    },
    [PAGE_6]: {
        address: PAGE_6,
        name: "Page 6",
        description: "Under the quiet night sky, Llamao and the Bean Dex crew sail calmly across the waters. They don't chase hype or rush for the next big thing, but waiting patiently for true value to surface. In the world of Web3, steady hands and clear minds always become the diamond hands.",
        image: `/nft/${PAGE_6}.gif`,
        totalSupply: 20000,
        TBA: "09/09/2025",
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
