import React from 'react';
import AddBoardMember from "./AddBoardMember";
import BoardMember from "./BoardMember";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import cloneDeep from "lodash.clonedeep";

export default function BoardMembers(props) {

    function addMember(newMember) {
        const members = cloneDeep(props.boardMembers);
        members.push(newMember);
        props.setBoardMembers(members);
    }

    function updateMembers(val, key, i) {
        const members = cloneDeep(props.boardMembers);
        members[i][key] = val;
        props.setBoardMembers(members);
    }

    function removeMember(i) {
        const boardMembers = props.boardMembers.filter((val, idx) => idx !== i);
        props.setBoardMembers(boardMembers);
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography component="h2" variant="h6" align="center">
                    DELTAKERE
                </Typography>
            </Grid>

            <AddBoardMember addMember={addMember}/>

            {props.boardMembers.map((member, i) => (
                <BoardMember key={i}
                             idx={i}
                             member={member}
                             handleChange={updateMembers}
                             button={
                                 <Button
                                     variant="contained"
                                     color="secondary"
                                     onClick={() => removeMember(i)}
                                     endIcon={<PersonAddDisabledIcon/>}>Fjern Styremedlem</Button>
                             }
                />
            ))}
        </>
    );
}
