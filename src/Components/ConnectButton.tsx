import React from "react";
import { connectToMetamask, checkConnectionState } from "../Helper/utils";

interface ConnectButtonProps {
    className: string,
    name: string,
    connected: boolean,
}
 
interface ConnectButtonState {
    connected: boolean,
}
 
class ConnectButton extends React.Component<ConnectButtonProps, ConnectButtonState> {
    constructor(props: ConnectButtonProps) {
        super(props);
        this.state = { 
            connected: false,
        };
    }

    componentDidMount(){
        this.setState({
            connected: this.props.connected,
        });
    }
    
    connect = async () => {
        await connectToMetamask();
        await this.updateConnectionState();
    }

    updateConnectionState = async () => {
        const connected = await checkConnectionState();
        this.setState({
            connected: connected,
        });
    }

    render() { 
        const renderConnectionState = () => {
            if(this.state.connected){
                return "Connected";
            } else {
                return "Connect";
            }
        }

        return (  
            <button onClick={this.connect}>{renderConnectionState()}</button>
        );
    }
}
 
export default ConnectButton;