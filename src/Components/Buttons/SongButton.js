import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';

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
      <IconButton
        onClick={() => props.handleFunction()}
        size="medium"
        style={{
          margin: 0,
        }}
        variant={props.variant}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        {props.icon}
      </IconButton>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButtons);
