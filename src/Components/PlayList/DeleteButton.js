import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Fab
        onClick={() => props.handleDelete()}
        size="small"
        style={{
          maxWidth: "60%",
          maxHeight: "60%",
          minWidth: "60%",
          minHeight: "60%"
        }}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        <DeleteIcon
          style={{
            maxWidth: "60%",
            maxHeight: "60%",
            minWidth: "60%",
            minHeight: "60%"
          }}
        />
      </Fab>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
