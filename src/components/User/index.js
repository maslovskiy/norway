import React from 'react';
import {Avatar, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useUser} from "../../providers/user/hooks";

const useStyles = makeStyles((theme) => {
  return ({
    root: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      height: "100%"
    },
    naming: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: "16px",
    },
    name: {
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "19px",
      textAlign: "left",
      color: "#2F3333"
    },
    position: {
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "16px",
      textAlign: "left",
      color: "#B6B8B8"
    }
  })
});

const User = ({
                name = "Bård Solem",
                position = "Senior Lawyer",
                src = "/images/user.png"
              }) => {
  const styles = useStyles();
  const {user} = useUser();
  return (
    <Box className={styles.root}>
      <Box>
        <Avatar alt={name} src={src}/>
      </Box>
      <Box className={styles.naming}>
        <Box component="span" className={styles.name}>{user.name}</Box>
        <Box component="span" className={styles.position}>{position}</Box>
      </Box>
    </Box>
  );
}

export default User;