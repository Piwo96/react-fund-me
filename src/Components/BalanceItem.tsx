import React from "react";
import { getBalance } from "../Helper/utils"

interface BalanceItemProps {
    
}
 
interface BalanceItemState {
    balance: string;
}
 
class BalanceItem extends React.Component<BalanceItemProps, BalanceItemState> {
    constructor(props: BalanceItemProps) {
        super(props);
        this.state = { balance: "0" };
    }

    getBalance = async () => {
        const balance = await getBalance();
        this.setState({ balance: balance });
    }
    
    render() { 
        return (
            <div>
                <button onClick={this.getBalance}>Get Balance</button>
                <label>{this.state.balance}</label>
            </div>
        );
    }
}
 
export default BalanceItem;