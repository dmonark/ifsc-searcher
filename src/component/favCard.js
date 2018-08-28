import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListItemIcon from "@material-ui/core/ListItemIcon";

class FavCard extends React.Component {
    render() {
        return (
            <Card raised>
                <CardContent>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <FavoriteIcon color="error"/>
                            </ListItemIcon>
                            <ListItemText primary="Favourite" />
                        </ListItem>
                        {   
                            this.props.favIFSC.map(value => (
                                <ListItem
                                    button
                                    onClick={(e) => this.props.searchCode(value, e)}
                                >
                                    <ListItemText
                                        primary={value} 
                                    />
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Delete" onClick={() => this.props.deleteToFav(value)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                            ))  
                        }
                    </List>
                </CardContent>
            </Card>
        )
    }   
}

export default FavCard;