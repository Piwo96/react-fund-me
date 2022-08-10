import React from "react";
import { withdraw } from "../Helper/utils";


interface WithdrawButtonProps {
    
}
 
interface WithdrawButtonState {
    
}
 
class WithdrawButton extends React.Component<WithdrawButtonProps, WithdrawButtonState> {
    // constructor(props: WithdrawButtonProps) {
    //     super(props);
    //     this.state = { :  };
    // }

    withdraw = async() => {
        await withdraw();
    }

    render() { 
        return (  
            <button onClick={this.withdraw}>Withdraw</button>
        );
    }
}
 
export default WithdrawButton;