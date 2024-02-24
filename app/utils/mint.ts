const url = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;

export const mintCompressedNFT = async (address: string) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "frames-sol-mint",
            method: "mintCompressedNft",
            params: {
                name: "Helius Customer Support",
                symbol: "HCS",
                owner: address,
                description: "24/7 priority support for Solana's most loved RPC Nodes, APIs, Webhooks, and Developer Tooling",
                attributes: [
                    {
                        trait_type: "Support",
                        value: "Legendary",
                    },
                    {
                        trait_type: "Company",
                        value: "Helius"
                    },
                ],
                imageUrl: "https://shdw-drive.genesysgo.net/HmvVwYAy7cxWECLbu2cjWBSHysVoriTqgdugyePVg3rY/helius-customer-support.jpg",
                externalUrl: "https://www.helius.dev/",
                sellerFeeBasisPoints: 6900,
            },
        }),
    });

    const data = await response.json();
    console.log(`data: ${JSON.stringify(data, null, 2)}`);

    if (!response.ok) {
        throw new Error(`The response was not okay - ${response.status}`);
    }

    if (!data.result || !data.result.assetId) {
        throw new Error(`The response did not include the expected data.result.assetId field`);
    }


    return data.result;
};