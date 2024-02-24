import type { Metadata } from "next";
import { getFrameMetadata } from "@coinbase/onchainkit";

const baseURL = "https://helius-frame.vercel.app/";

const frameMetadata = getFrameMetadata({
  image: {
    src: `${baseURL}/default.jpg`,
    aspectRatio: "1.91:1",
  },
  buttons: [
    {
      label: "Click to mint a cNFT on Solana!",
      action: "post",
    },
  ],
  postUrl: `${baseURL}api/frames/route`,
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
    <>
      <h1>Mint a cNFT!</h1>
    </>
  );
}