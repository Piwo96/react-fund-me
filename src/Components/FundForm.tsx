import React from "react";
import { fund } from "../Helper/utils";


interface FundFormProps {
}
 
interface FundFormState {
    inputValue: string;
}
 
class FundForm extends React.Component<FundFormProps, FundFormState> {
    constructor(props: FundFormProps) {
        super(props);
        this.state = { inputValue: "", };
    }

    onInputChange = async (event: any) => {
        const { value } = event.target;
        this.setState({ inputValue: value.toString()});
    }

    fund = async (event: any) => {
        event.preventDefault();
        await fund(this.state.inputValue);
    }

    render() { 
        return ( 
            <div>
                <form
                    onSubmit={this.fund}>
                    <input 
                        type="text"
                        placeholder="Enter fund value"
                        value={this.state.inputValue}
                        onChange={this.onInputChange} />
                    <button type="submit">Fund</button>
                </form>
            </div>
            
         );
    }
}
 
export default FundForm;