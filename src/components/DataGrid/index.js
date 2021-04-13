import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    tag: {
        display: "flex",
        alignItems: 'center',
        margin: "0 4px"
    },
    tagValue: {
        lineHeight: 1,
        padding: "4px 12px",
        backgroundColor: "#FCEEEC",
        color: "#FC5569",
    }
}));

const Tag = ({value}) => {
    const classes = useStyles();
    return (
        <Box className={classes.tag}>
            <Box className={classes.tagValue}>{value}</Box>
        </Box>
    )
}

const columns = [
    {field: 'icon', headerName: '', width: 100},
    {field: 'name', headerName: '', width: 300,},
    {
        field: 'tag',
        headerName: '',
        width: 300,
        renderCell: ({value}) => (
            Array.isArray(value) ? value.map(val => <Tag value={val}/>) : <Tag value={value}/>
        ),
    },
];

const rows = [
    {id: 1, icon: "icon", name: 'Kapitalforhøyelse', tag: 'Bank Og Finans'},
    {id: 2, icon: "icon", name: 'Mal innkalling EGF kontantemisjon', tag: ['Complex Documents', 'Invites']},
];

export default function DataGridDemo({value}) {
    return (
        <Paper>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={rows} columns={columns}
                    headerHeight={0}
                    hideFooter={true}
                    filterModel={{
                        items: [
                            { columnField: 'fullName', operatorValue: 'contains', value },
                        ],
                    }}
                />
            </div>
        </Paper>
    );
}