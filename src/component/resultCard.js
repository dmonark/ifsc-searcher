import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

class ResultCardSub extends React.Component {
    render() {
        return (
            <div>
                <Typography variant="subheading">
                    {this.props.subName}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    {this.props.subValue}
                </Typography>
            </div>
        )
    }
}

class ResultCard extends React.Component {
    render() {
        return (
            <Card raised>
                <CardContent>
                    <ResultCardSub 
                        subName = "BANK NAME"
                        subValue = {this.props.data.BANK}
                    />
                    <ResultCardSub 
                        subName = "BRANCH NAME"
                        subValue = {this.props.data.BRANCH}
                    />
                    <ResultCardSub 
                        subName = "ADDRESS"
                        subValue = {this.props.data.ADDRESS}
                    />
                </CardContent>
                <CardActions disableActionSpacing>
                    <IconButton aria-label="Favorites" onClick={() => this.props.addToFav(this.props.data.IFSC)} >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        )
    }   
}

export default ResultCard;