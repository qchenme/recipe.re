import React from "react";
import PropTypes from "prop-types";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Emoji from "./utils/emoji";

class Storage extends React.Component {
  state = { opened: [], newFood: "" };

  componentDidUpdate(prevProps) {
    if (prevProps.open != this.props.open) {
      this.setState({ opened: [], newFood: "" });
    }
  }

  handleEditClick(id) {
    const { opened } = this.state;
    const currentIndex = opened.indexOf(id);
    const newOpened = [...opened];

    if (currentIndex == -1) {
      newOpened.push(id);
    } else {
      newOpened.splice(currentIndex, 1);
    }

    this.setState({
      opened: newOpened
    });
  }

  handleStockChange(id) {
    const { food } = this.props;
    const currentFood = food.find(f => f.id == id);
    if (currentFood) {
      this.updateFood(id, event.target.checked);
    }
  }

  handleDeleteFood(id) {
    const { food } = this.props;
    const currentFood = food.find(f => f.id == id);
    if (currentFood) {
      this.deleteFood(id);
    }
  }

  handleAddFood() {
    const { newFood } = this.state;
    const { getAllFood } = this.props;
    fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
          addFood(
            name:${newFood})
            {
            food{
              id
              name
              isLowStock
            }
          }
        }
        `
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        getAllFood();
      });
  }

  updateFood(id, isLowStock) {
    const { getAllFood } = this.props;
    fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
          updateFood(
            id:${id}, 
            isLowStock:${isLowStock})
            {
            food{
              id
              name
              isLowStock
            }
          }
        }
        `
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        getAllFood();
      });
  }

  deleteFood(id) {
    const { getAllFood } = this.props;
    fetch("/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
          deleteFood(
            id:${id})
            {
            food{
              id
            }
          }
        }
        `
      })
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        getAllFood();
      });
  }

  render() {
    const {
      handleDrawerOpen,
      handleDrawerClose,
      classes,
      open,
      food
    } = this.props;
    const { opened, newFood } = this.state;

    return (
      <SwipeableDrawer
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon color="primary" />
          </IconButton>
          <Typography variant="subtitle1" color="primary">
            What's In My Fridge <Emoji symbol="👀" />
          </Typography>
        </div>
        <Divider />

        <List>
          <ListItem>
            <TextField
              id="new-food"
              label="Add New Food"
              color="primary"
              variant="outlined"
              value={this.state.newFood}
              placeholder="Type In the Food Name"
              onChange={e => this.setState({ newFood: e.target.value })}
              margin="dense"
            />
            <IconButton
              onClick={e => this.handleAddFood()}
              disabled={newFood == ""}
            >
              <AddIcon color="primary" fontSize="large" />
            </IconButton>
          </ListItem>
          <Divider />
          {food.map(f => (
            <div key={f.id}>
              <ListItem button onClick={e => this.handleEditClick(f.id)}>
                <ListItemText>
                  <Typography variant="overline" color="secondary" gutterBottom>
                    {f.name} {f.isLowStock ? <Emoji symbol="🆘" /> : ""}
                  </Typography>
                </ListItemText>
                <ListItemIcon>
                  {opened.indexOf(f.id) !== -1 ? (
                    <ExpandLess color="primary" />
                  ) : (
                    <ExpandMore color="primary" />
                  )}
                </ListItemIcon>
              </ListItem>
              <Collapse
                in={opened.indexOf(f.id) !== -1}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <ListItem alignItems="center">
                    <Tooltip
                      title={f.isLowStock ? "Enough Stock" : "Low Stock"}
                    >
                      <FormControlLabel
                        color="secondary"
                        control={
                          <Switch
                            checked={f.isLowStock}
                            onChange={e => this.handleStockChange(f.id)}
                          />
                        }
                      />
                    </Tooltip>
                    <Typography variant="caption" color="secondary">
                      {f.isLowStock
                        ? "Running out soon!!!"
                        : "Enough food for the winter~"}
                    </Typography>
                    <ListItemSecondaryAction>
                      <Tooltip title="Delete Food">
                        <IconButton onClick={() => this.handleDeleteFood(f.id)}>
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
            </div>
          ))}
        </List>
      </SwipeableDrawer>
    );
  }
}

Storage.propTypes = {
  food: PropTypes.array,
  handleDrawerOpen: PropTypes.func,
  handleDrawerClose: PropTypes.func,
  getAllFood: PropTypes.func,
  open: PropTypes.bool,
  classes: PropTypes.object
};

export default Storage;
