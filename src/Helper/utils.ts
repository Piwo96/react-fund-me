import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";
import abi from "../abi.json";

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
    console.log("No Metamask found!");
    return false;
}

export async function connectToMetamask(): Promise<void> {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No Metamask found!");
    }
}

export async function fund(ethAmount: string): Promise<void> {
    console.log(`Funding with ${ethAmount}`);
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        try {
            const txRes = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            });
            await listenForTransactionMine(txRes, provider);
            console.log("Done");
        } catch (error) {
            console.log(error);
        }
    }
}

function listenForTransactionMine(
    transactionResponse: any,
    provider: ethers.providers.Web3Provider
) {
    console.log(`Mining ${transactionResponse.hash} ...`);
    return new Promise<void>((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations}`);
            resolve();
        });
    });
}

export async function getBalance(): Promise<string> {
    if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = (
            await provider.getBalance(CONTRACT_ADDRESS)
        ).toString();
        return ethers.utils.formatEther(balance);
    }
    return "0";
}

export async function withdraw(): Promise<void> {
    if (window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        try {
            const txRes = await contract.withdraw();
            await listenForTransactionMine(txRes, provider);
        } catch (error) {
            console.log(error);
        }
    }
}
