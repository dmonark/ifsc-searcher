import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ResultCard from "./resultCard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class Searcher extends React.Component {
    
    constructor(props) {
        super(props);
        
        if(!localStorage.getItem('favIFSC'))
            localStorage.setItem('favIFSC', "");
        
        const prevFavIFSC = localStorage.getItem("favIFSC");
        const prevFavIFSCArray = prevFavIFSC.split("#").slice(1);
     
        this.state = {
            ifsc: "",
            data: null,
            isLoaded: false,
            favIFSC: prevFavIFSCArray
        };

        this.handleChange = this.handleChange.bind(this);
        this.searchCode = this.searchCode.bind(this);
        this.addToFav = this.addToFav.bind(this);

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
        var prevFavIFSC = localStorage.getItem("favIFSC");
        var prevFavIFSCArray = prevFavIFSC.split("#").slice(1);
        if(prevFavIFSCArray.indexOf(ifsc) === -1) {
            prevFavIFSC = prevFavIFSC + "#" + ifsc;
            prevFavIFSCArray.push(ifsc);
            localStorage.setItem('favIFSC', prevFavIFSC);
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
                                />
                            ) : null
                        }
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Card raised>
                        <CardContent>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Favourite" 
                                />
                            </ListItem>
                        {   
                            this.state.favIFSC.map(value => (
                                <ListItem
                                    button
                                    onClick={(e) => this.searchCode(value, e)}
                                >
                                    <ListItemText
                                        primary={value} 
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="Delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))  
                        }
                        </List>
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Searcher;