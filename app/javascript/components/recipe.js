import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CookIcon from "@material-ui/icons/LocalDining";
import { withStyles } from "@material-ui/core/styles";
import Emoji from "./utils/emoji";

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "77.25%" // 16:9
  },
  actions: {
    display: "flex"
  }
});

class Recipe extends React.Component {
  render() {
    const { classes, recipes } = this.props;
    return (
      <Grid container direction="row" justify="center" spacing={16}>
        {Object.keys(recipes).map(key => (
          <Grid item xs={6} sm={3} key={key}>
            <Card raised className={classes.card}>
              <CardHeader
                title={recipes[key].label}
                titleTypographyProps={{ color: "primary", variant: "h6" }}
                action={
                  <IconButton>
                    <CookIcon color="primary" />
                  </IconButton>
                }
              />
              <CardMedia
                className={classes.media}
                image={recipes[key].image}
                title={`Source: ${recipes[key].source}`}
              />
              <CardContent>
                <Typography variant="subtitle1" color="secondary" gutterBottom>
                  INGREDIENTS
                </Typography>
                {recipes[key].ingredientLines.map(text => (
                  <div key={text}>
                    <Typography component="p" color="secondary" gutterBottom>
                      <Emoji symbol="♦️" /> {text}
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(Recipe);
