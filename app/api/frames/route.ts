import { NextRequest, NextResponse} from "next/server";
import { getFrameMessage, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { mintCompressedNFT } from "../../utils/mint";

export async function POST(req: NextRequest): Promise<Response> {
    const body = await req.json();

    // Validate the frame message and extract the user ID
    const { isValid, message } = await getFrameMessage(body, {
        neynarApiKey: "NEYNAR_ONCHAIN_KIT",
    });

    if (isValid && message.interactor.verified_accounts.length > 0) {
        const solanaAddresses = message.interactor.verified_accounts.filter(address => !address.startsWith("0x") || (address.startsWith("0x") && address.length !== 42)); 
        const firstSolanaAddress = solanaAddresses.length > 0 ? solanaAddresses[0] : null;

        if (firstSolanaAddress) {
            try {
                const mintResult = await mintCompressedNFT(firstSolanaAddress);
                return new NextResponse(getFrameHtmlResponse({
                    image: {
                        src: "/success.jpg"
                    },
                    buttons: [
                        {
                            label: `Successfully minted ${mintResult.assetId} to ${firstSolanaAddress}`,
                        },
                        {
                            label: "View your cNFT on XRAY",
                            action: "link",
                            target: `https://xray.helius.xyz/token/${mintResult.assetId}?network=mainnet`
                        },
                    ],
                }));
            } catch (e) {
                return new NextResponse(getFrameHtmlResponse({
                    image: {
                        src: "/error.jpg"
                    },
                    ogTitle: `Minting failed`,
                }));
            }
        } else {
            return new NextResponse(getFrameHtmlResponse({
                image: {
                    src: "/error.jpg"
                },
                ogTitle: "No Solana address found",
            }));
        }
    } else if (message?.interactor.verified_accounts.length === 0){
        return new NextResponse(getFrameHtmlResponse({
            image: {
                src: "/error.jpg"
            },
            ogTitle: "No verified addresses found",
        }));
    } else {
        return new NextResponse(getFrameHtmlResponse({
            image: {
                src: "/error.jpg"
            }, 
            ogTitle: "Invalid frame message",
        }));
    }
}
