import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import useStyles from "../styles";
import BoardMember from "./BoardMember";

const memberRoles = ['Styreleder', 'Styremedlem', 'Varamedlem'];
const defaultMember = {name: 'A', role: memberRoles[1], willSign: false};

export default function AddBoardMember(props) {

    const classes = useStyles();
    const [member, setMember] = useState(defaultMember);

    function handleChange(val, key) {
        let m = {...member};
        m[key] = val;
        setMember(m);
    }

    function addMember() {
        props.addMember(member);
        setMember(defaultMember);
    }

    return (
        <BoardMember member={member}
                     handleChange={handleChange}
                     button={
                         <Button
                             className={classes.textField}
                             variant="contained"
                             color="primary"
                             onClick={addMember}
                             endIcon={<PersonAddIcon/>}>Legg Til Styremedlem</Button>
                     }
        />
    )
}
