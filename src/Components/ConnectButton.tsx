import React from "react";

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
        if(typeof window.ethereum !== "undefined"){
            await window.ethereum.request({method: "eth_requestAccounts"});
            this.setState({
                connected: true,
            });
            console.log("Connected!");
        } else {
            this.setState({
                connected: false
            });
            console.log("No metamask!");
        }
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