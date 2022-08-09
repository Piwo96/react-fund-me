import React from "react";
import { fund } from "../Helper/utils";


interface FundButtonProps {
    
}
 
interface FundButtonState {
    
}
 
class FundButton extends React.Component<FundButtonProps, FundButtonState> {
    // constructor(props: FundButtonProps) {
    //     super(props);
    //     this.state = { :  };
    // }

    fund = async () => {
        await fund(8);
    }

    render() { 
        return ( 
            <button onClick={this.fund}>Fund</button>
         );
    }
}
 
export default FundButton;