import React from "react";
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
  cardXlg: {
    overflow: "auto",
    height: "70vh"
  },
  cardMd: {
    overflow: "auto",
    height: "60vh"
  },
  cardXs: {
    overflow: "auto",
    height: "50vh"
  },
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
    const { classes, recipes, getGridListCols } = this.props;

    return (
      <Grid container spacing={24}>
        {Object.keys(recipes).map((key, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card
              className={
                getGridListCols() == 2
                  ? classes.cardMd
                  : getGridListCols() == 1
                  ? classes.cardXs
                  : classes.cardXlg
              }
            >
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

export default withStyles(styles)(Recipe);
