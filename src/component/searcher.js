import React from "react";

class Searcher extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ifsc: "",
            data: {},
            isLoaded: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.searchCode = this.searchCode.bind(this);
    }

    handleChange(event) {
        this.setState({ifsc: event.target.value});
        console.log(event.target.value);
    }

    searchCode() {
        fetch("https://ifsc.razorpay.com/"+this.state.ifsc)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    data: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                });
            }
        )
    }

    render() {
        return (
            <div>
                <div>
                    <input value={this.state.ifsc} onChange={this.handleChange} />
                    <button onClick={this.searchCode}>Search</button>
                </div>
                {
                    this.state.data !== {} ? (
                        <div>
                            <h2>{this.state.data.BANK}</h2>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default Searcher;