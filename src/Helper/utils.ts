import ethers from "ethers";
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
    if(typeof window.ethereum !== "undefined"){
        try {
            await window.ethereum.request({method: "eth_requestAccounts"});    
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("No Metamask found!");
    }
}

export async function fund(ethAmount: number): Promise<void>{
    console.log(`Funding with ${ethAmount}`);
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(abi);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
        console.log(contract)
    }
}

export async function withdraw(): Promise<void>{
    
}