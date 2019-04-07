import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Recipe from "./recipe";
import Storage from "./storage";
import Topbar from "./topbar";
import { requestURL, param, randomGenerator } from "./utils/request";

const drawerWidth = 300;

const styles = theme => ({
  background: {
    backgroundColor: "grey"
  },
  header: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  }
});

class AppContainer extends React.Component {
  state = {
    open: false,
    food: [],
    recipes: []
  };

  constructor(props) {
    super(props);
    this.getAllFood = this.getAllFood.bind(this);
  }

  componentDidMount() {
    this.getAllFood();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  getAllFood() {
    fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            allFood {
              id
              name
              isLowStock
            }
          }
        `
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ food: response.data.allFood });
        this.getReipes();
      });
  }

  getReipes() {
    const { food } = this.state;

    // If in local storage
    const cachedHits = sessionStorage.getItem("recipes");
    if (cachedHits) {
      this.setState({ recipes: JSON.parse(cachedHits) });
      return;
    }
    //Limit to the API => choose random 2 food
    const randomFoodList = [];
    const randomIndexList = randomGenerator(food.length, 2);
    randomIndexList.forEach(num => {
      randomFoodList.push(food[num]);
    });

    const foodNameList = randomFoodList.map(f => f.name);
    const fetchList = foodNameList.map(f =>
      fetch(`${requestURL}${f}`, param).then(f => f.json())
    );

    Promise.all(fetchList)
      .then(responses => {
        let randomRecipeList = [];
        responses.forEach(r => {
          const fullList = r.hits.map(obj => obj.recipe);
          const randomIndexList = randomGenerator(fullList.length, 8);
          randomIndexList.forEach(num => {
            randomRecipeList.push(fullList[num]);
          });
        });
        return randomRecipeList;
      })
      .then(result => {
        this.setState({ recipes: result });
        sessionStorage.setItem("recipes", JSON.stringify(result));
      });
  }

  render() {
    const { classes } = this.props;
    const { open, food, recipes } = this.state;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Topbar classes={classes} handleDrawerOpen={this.handleDrawerOpen} />
          <Storage
            food={food}
            handleDrawerOpen={this.handleDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            getAllFood={this.getAllFood}
            open={open}
            classes={classes}
          />
        </Grid>
        <Grid item xs={12}>
          <Recipe recipes={recipes} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AppContainer);
