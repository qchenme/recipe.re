import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Emoji from "./utils/emoji";

class Storage extends React.Component {
  state = { food: [], opened: [] };

  componentDidMount() {
    this.getAllFood();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open != this.props.open) {
      this.setState({ opened: [] });
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
    const { food } = this.state;
    const currentFood = food.find(f => f.id == id);
    if (currentFood) {
      this.updateFood(id, event.target.checked);
    }
  }

  handleDeleteFood(id) {
    const { food } = this.state;
    const currentFood = food.find(f => f.id == id);
    if (currentFood) {
      this.deleteFood(id);
    }
  }

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
      });
  }

  updateFood(id, isLowStock) {
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
        this.getAllFood();
      });
  }

  deleteFood(id) {
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
        this.getAllFood();
      });
  }

  render() {
    const { handleDrawerClose, classes, open } = this.props;
    const { food, opened } = this.state;

    return (
      <Drawer
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
          {food.map(f => (
            <div key={f.id}>
              <ListItem button onClick={e => this.handleEditClick(f.id)}>
                <ListItemText>
                  <Typography variant="overline" color="secondary">
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
                  <ListItem inset alignItems="center">
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
      </Drawer>
    );
  }
}

export default Storage;