import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ResultCard from "./resultCard";
import FavCard from "./favCard";

class Searcher extends React.Component {
    
    constructor(props) {
        super(props);
        
        if(!localStorage.getItem('favIFSC'))
            localStorage.setItem('favIFSC', JSON.stringify([]));
        
        const prevFavIFSCArray = JSON.parse(localStorage.getItem("favIFSC"));
     
        this.state = {
            ifsc: "",
            data: null,
            isLoaded: false,
            favIFSC: prevFavIFSCArray
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchCode = this.searchCode.bind(this);
        this.addToFav = this.addToFav.bind(this);
        this.deleteToFav = this.deleteToFav.bind(this);
    }

    handleChange(event) {
        this.setState({ifsc: event.target.value});
    }

    searchCode(ifsc, e) {
        e.preventDefault();
        fetch("https://ifsc.razorpay.com/"+ifsc)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    data: result === "Not Found" ? null : result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    data: null
                });
            }
        )
    }

    addToFav(ifsc) {
        var prevFavIFSCArray = JSON.parse(localStorage.getItem("favIFSC"));
        if(prevFavIFSCArray.indexOf(ifsc) === -1) {
            prevFavIFSCArray.push(ifsc);
            localStorage.setItem('favIFSC', JSON.stringify(prevFavIFSCArray));
            this.setState({
                favIFSC: prevFavIFSCArray
            })
        }
    }

    deleteToFav(ifsc) {
        var prevFavIFSCArray = JSON.parse(localStorage.getItem("favIFSC"));
        if(prevFavIFSCArray.indexOf(ifsc) > -1) {
            prevFavIFSCArray.splice(prevFavIFSCArray.indexOf(ifsc), 1);
            localStorage.setItem('favIFSC', JSON.stringify(prevFavIFSCArray));
            this.setState({
                favIFSC: prevFavIFSCArray    
            })
        } 
    }

    render() {
        return (
            <div>
                <Grid container spacing={40}>
                    <Grid item xs={3}>
                        <div>
                            <form noValidate autoComplete="off" onSubmit={(e) => this.searchCode(this.state.ifsc, e)}>
                                <TextField
                                    id="ifsc"
                                    label="IFSC Code"
                                    value={this.state.ifsc}
                                    onChange={this.handleChange}
                                    margin="normal"
                                    fullWidth
                                />
                            </form>
                        </div>
                        <div style={{marginTop: 20}}>
                        {   
                            this.state.data !== null ? (
                                <ResultCard 
                                    data={this.state.data} 
                                    addToFav = {this.addToFav}
                                    deleteToFav = {this.deleteToFav}
                                    whichIcon = {this.state.favIFSC.includes(this.state.data.IFSC) ? "delete" : "fav"}
                                />
                            ) : null
                        }
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <FavCard
                            favIFSC = {this.state.favIFSC}
                            searchCode = {this.searchCode}
                            deleteToFav = {this.deleteToFav}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Searcher;