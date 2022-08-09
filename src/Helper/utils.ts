export async function checkConnectionState(): Promise<boolean> {
    if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        if (accounts.length > 0) {
            return true;
        }
        return false;
    }
    return false;
}
