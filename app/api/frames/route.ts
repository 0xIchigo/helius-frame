import { NextRequest, NextResponse} from "next/server";
import { getFrameMessage, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { mintCompressedNFT } from "../../utils/mint";

const baseURL = "https://helius-frame.vercel.app/";

export async function POST(req: NextRequest): Promise<Response> {
    const body = await req.json();

    // Validate the frame message and extract the user ID
    const { isValid, message } = await getFrameMessage(body, {
        neynarApiKey: "NEYNAR_ONCHAIN_KIT",
    });

    if (isValid && message.interactor.verified_accounts.length > 0) {
        const solanaAddresses = message.interactor.verified_addresses.sol_addresses; 

        if (solanaAddresses) {
            try {
                const mintResult = await mintCompressedNFT(solanaAddresses[0]!);
                return new NextResponse(getFrameHtmlResponse({
                    image: {
                        src: `${baseURL}/success.jpg`
                    },
                    buttons: [
                        {
                            label: `Successfully minted ${mintResult.assetId} to ${solanaAddresses[0]}`,
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
                        src: `${baseURL}/error.jpg`
                    },
                    buttons: [
                        {
                          label: "Minting failed. Retry?",
                          action: "post",
                        },
                    ],
                    postUrl: `${baseURL}api/frames`,
                }));
            }
        } else {
            return new NextResponse(getFrameHtmlResponse({
                image: {
                    src: `${baseURL}/error.jpg`
                },
                buttons: [
                    {
                      label: "No Solana address found. Retry?",
                      action: "post",
                    },
                ],
                postUrl: `${baseURL}api/frames`
            }));
        }
    } else if (message?.interactor.verified_accounts.length === 0){
        console.log(JSON.stringify(message?.interactor, null, 2));
        return new NextResponse(getFrameHtmlResponse({
            image: {
                src: `${baseURL}/error.jpg`
            },
            buttons: [
                {
                  label: "No verified addresses found. Retry?",
                  action: "post",
                },
                {
                    label: `${JSON.stringify(message?.interactor, null, 2)}`,
                },
            ],
            postUrl: `${baseURL}api/frames`,
        }));
    } else {
        return new NextResponse(getFrameHtmlResponse({
            image: {
                src: `${baseURL}/error.jpg`
            }, 
            buttons: [
                {
                  label: "Invalid frame message. Retry?",
                  action: "post",
                },
            ],
            postUrl: `${baseURL}api/frames`,
        }));
    }
}
