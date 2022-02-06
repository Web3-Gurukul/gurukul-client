import { nftPortApiKey } from "../credentials"

export function useNftPort() {
    const nftPortApiUrl = "https://api.nftport.xyz";

    let nftPortHeaders = new Headers();
    nftPortHeaders.append('Authorization', nftPortApiKey);

    function mintNft(name, description, file_url, receiver) {
        let bodyData = {
            chain: "polygon",
            name,
            description,
            file_url,
            mint_to_address: receiver
        };

        return fetch(`${nftPortApiUrl}/v0/mints/easy/urls`, { headers: nftPortHeaders, body: JSON.stringify(bodyData), method: 'POST' });
    }

    function getMintedNfts() {
        let params = new URLSearchParams({ page_number: 1, page_size: 50 });
        return fetch(`${nftPortApiUrl}/v0/me/mints?${params.toString()}`, { headers: nftPortHeaders });
    }

    return {
        mintNft,
        getMintedNfts,
    }
}