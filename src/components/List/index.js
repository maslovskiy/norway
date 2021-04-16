import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {Box, Paper, Typography} from "@material-ui/core";
import Tags from "../Tags";
import ListItemText from "./ListItemText";
import {useSchemas} from "../../providers/schemas/hooks";
import {Link} from "react-router-dom";

const documentSrc = "/images/document.png";

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      marginTop: 40,
      width: '100%',
      background: `rgba(${theme.palette.background.paper}, 0.75)`,
      borderRadius: "12px",
      boxShadow: "none",

    },
    middle: {
      marginLeft: 12,
      marginRight: 12
    },
    header: {
      padding: "24px 36px"
    },
    title: {
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "24px",
      color: theme.palette.primary.darkGray,
    },
    tags: {
      flexGrow: 1,
      display: "flex",
      width: "40%",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    list: {
      padding: "0",
      maxHeight: "490px",
      overflowY: "auto",
      "& > a": {
        textDecoration: "none"
      }
    },
    listItem: {
      padding: "18px 28px",
      cursor: "pointer",

    },
    avatarRoot: {
      width: "50px",
      height: "50px",
      backgroundColor: theme.palette.primary.main,
    },
    listAvatar: {
      maxWidth: "80px",
      width: "30%"
    },
    notFound: {
      textTransform: "capitalize",
      padding: "110px 30px",
      textAlign: "center"
    }
  })
});

const SchemaList = () => {

  const classes = useStyles();
  const {schemas, types, filterValue, searchValue} = useSchemas();
  return (
    <Paper className={classes.root}>
      <Box className={classes.header}>
        <Typography variant={"h3"} className={classes.title}>{types[filterValue]}</Typography>
      </Box>
      <Divider variant={"fullWidth"}/>
      <List classes={{root: classes.list}}>
        {
          schemas.map(({attributes, name, id, secondary}, index) => {
            return <React.Fragment key={id}>
              <Link to={`/schema/${id}`}>
                <ListItem classes={{
                  root: classes.listItem
                }}>
                  <ListItemAvatar
                    classes={{
                      root: classes.listAvatar
                    }}
                  >
                    <Avatar classes={{
                      root: classes.avatarRoot
                    }}>
                      <img src={documentSrc} alt="doc"/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} secondary={secondary}/>
                  {
                    attributes && (
                      <Box className={classes.tags}>
                        <Tags tags={attributes}/>
                      </Box>
                    )
                  }
                </ListItem>
                {
                  schemas.length - 1 > index &&
                  <Divider variant="middle" classes={{middle: classes.middle}}/>
                }
              </Link>
            </React.Fragment>
          })
        }
        {
          (filterValue !== 0 || searchValue.trim().length !== 0) && schemas.length === 0 && (
            <div className={classes.notFound}>
              <span className={classes.title}>not found</span>
            </div>
          )
        }
      </List>
    </Paper>
  );
};

export default SchemaList;