import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CookIcon from "@material-ui/icons/LocalDining";
import { withStyles } from "@material-ui/core/styles";
import Emoji from "./utils/emoji";

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: "55.25%"
  },
  actions: {
    display: "flex"
  },
  content: { overflow: "auto" }
});

class Recipe extends React.Component {
  render() {
    const { classes, recipes } = this.props;

    return (
      <Grid container spacing={24}>
        {Object.keys(recipes).map((key, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardHeader
                title={recipes[key].label}
                titleTypographyProps={{
                  color: "primary",
                  variant: "h6",
                  noWrap: true
                }}
                action={
                  <IconButton
                    onClick={e => {
                      e.preventDefault;
                      window.open(recipes[key].url, "_blank");
                    }}
                  >
                    <CookIcon color="primary" />
                  </IconButton>
                }
              />
              <CardMedia
                className={classes.media}
                image={recipes[key].image}
                title={`Source: ${recipes[key].source}`}
              />
              <CardContent className={classes.content}>
                <Typography variant="subtitle1" color="secondary" gutterBottom>
                  INGREDIENTS
                </Typography>
                <Divider light />
                <List>
                  {recipes[key].ingredientLines.map((text, index) => (
                    <ListItem key={index}>
                      <Typography component="p" color="secondary" noWrap>
                        <Emoji symbol="🧂" /> {text}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

Recipe.propTypes = {
  recipes: PropTypes.array
};

export default withStyles(styles)(Recipe);
