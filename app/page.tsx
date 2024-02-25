import type { Metadata } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit";

const baseURL = "https://helius-frame.vercel.app/";

const frameMetadata = getFrameMetadata({
  image: {
    src: `${baseURL}/default.jpg`,
    aspectRatio: "1:1",
  },
  buttons: [
    {
      label: "Click to mint a cNFT on Solana!",
      action: "post",
    },
  ],
  postUrl: `${baseURL}api/frames`,
});

export const metadata: Metadata = {
  title: "Mint a cNFT on Solana",
  description: "Mint a cNFT to your verified Solana address using the Helius Mint API",
  openGraph: {
    title: "Mint a cNFT on Solana",
    description: "Mint a cNFT to your verified Solana address using the Helius Mint API",
    images: ["https://helius-frame.vercel.app/default.jpg"],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <div className="flex h-screen justify-center items-center">
      <h1>Mint a cNFT on Farcaster using the Helius Mint API</h1>
      <div>
        <a href="https://twitter.com/0xIchigo" className="block">Built by 0xIchigo</a>
      </div>
      <div>
        <a href="https://github.com/0xIchigo/helius-frame" className="block">GitHub Repo</a>
      </div>
    </div>
  );
}