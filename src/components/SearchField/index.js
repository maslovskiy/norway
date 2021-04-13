import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {useSchemas} from "../../providers/schemas/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchField = () => {
  const classes = useStyles();
  const {setSearchValue} = useSchemas();

  const onSubmit = e => {
    e.preventDefault();
    const searchValue = e.target[0].value.trim();
    setSearchValue(searchValue)
  };

  const onChange = e => {
    e.preventDefault();
    if (e.target.value.trim().length === 0) {
      setSearchValue("")
    }
  }

  return (
    <Paper component="form" className={classes.root} onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{'aria-label': 'search google maps'}}
        onChange={onChange}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon/>
      </IconButton>
    </Paper>
  );
};

export default SearchField;