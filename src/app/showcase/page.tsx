"use client";

import { useState } from "react";
import MainLayout from "@/components/layouts/main-layout";
import CategoriesShowcase from "@/components/layouts/showcase/categories-showcase";
import ShowcaseTable from "@/components/layouts/showcase/showcase-table";
import Navbar, { items } from "@/components/common/navbar";
import useSWR from "swr";
import { ethers } from "ethers";
import { useWalletAddress } from "@/hooks/use-wallet-address";
import { erc721Abi } from "@/lib/abis";

export default function Showcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { address } = useWalletAddress()
  const [ page, setPage ] = useState(0);

  const { data } = useSWR( address ? `SHOWCASE_${page}` : null, async () => {
    const owner = "0xA7C1d79C7848c019bCb669f1649459bE9d076DA3"
      const provider = new ethers.JsonRpcProvider(
          "https://testnet-rpc.monad.xyz", 
          10143                            
      )   

      const contract = new ethers.Contract(
          "0x06D235F0D8ff77c499A6F647a4d44636acf8584A", // địa chỉ đã cho
          erc721Abi,
          provider,
      )

      const uriCollection = await contract.contractURI()
      console.log(uriCollection)

      const isERC721 = await contract.supportsInterface("0x80ac58cd")
      const isERC721Metadata = await contract.supportsInterface("0x5b5e139f")
      const isERC1155 = await contract.supportsInterface("0xd9b67a26")
      console.log(isERC721, isERC721Metadata, isERC1155)
      
      const tokenIds = await contract.tokensOfOwner(owner)

      const tokens: Array<any> = []
      await Promise.all(tokenIds.map(async (tokenId: number) => {
          const uri = await contract.tokenURI(tokenId)
          tokens.push({
              tokenId: Number(tokenId),
              uri,
          })
      }))

      return tokens
  })

  console.log(data)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2">
      <Navbar navbarItems={items} />
      <MainLayout
        headerIcon="/gifs/llamao_majestic_run.gif"
        text="Showcase"
        subHeader={false}
        className="w-full h-full p-2 sm:p-4 lg:p-6"
        wrapperClassName="w-full max-w-sm sm:max-w-md md:max-w-2xl"
      >
        <div className="space-y-6">
          <CategoriesShowcase
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <ShowcaseTable
            category={selectedCategory || undefined}
            className="animate-in fade-in duration-300"
          />
        </div>
      </MainLayout>
    </div>
  );
}
