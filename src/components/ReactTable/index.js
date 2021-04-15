import React from 'react'
import {useTable, usePagination, useSortBy} from 'react-table'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  table: {
    borderSpacing: 0,
    padding: "1rem",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.4)",
    border: "1px solid rgba(73, 87, 94, 0.2)",
    borderRadius: "8px",

    "& tr": {
      "::last-child": {
        "& td": {
          borderBottom: 0,
        }
      }
    },

    "& th": {
      fontWeight: "600",
      fontSize: "12px",
      lineHeight: "24px",
      color: "#8D9091",
      textAlign: "left",
      // minWidth: 200,
      padding: "0 10px",
    },

    "& td": {
      margin: 0,
      padding: "10px",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "24px",
      color: "#000000",
      textAlign: "left",

      "& .MuiInput-underline:before": {
        borderColor: "#fff"
      },

      "& .MuiInput-underline:after": {
        borderColor: "#000"
      },

      "&::last-child": {
        borderRight: 0,
      },

      "& input": {
        margin: 0,
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "24px",
        color: "#000000",
        fontFamily: "Open Sans",
        backgroundColor: "rgba(255,255,255,0.4)",
        border: "none",
      },
      "& div": {
        minWidth: "100%"
      }
    }
  }
}));

const Table = ({columns, data, updateMyData, skipPageReset, defaultColumn}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    useSortBy,
    usePagination
  )
  const classes = useStyles();

  return (
    <table {...getTableProps()} className={classes.table}>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render('Header')}
              <span> {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}  </span>
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell =>
              <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

const ReactTable = ({data, setTableValues, columns, defaultColumn}) => {
  const updateMyData = (rowIndex, columnId, value) => {
    const result = data.map((row, index) => {
      return index === rowIndex ? {
        ...data[rowIndex],
        [columnId]: value,
      } : row;
    });
    setTableValues(result)
  }

  return (
    <Table
      columns={columns}
      data={data}
      updateMyData={updateMyData}
      setTableValues={setTableValues}
      defaultColumn={defaultColumn}
    />
  )
}

export default ReactTable;
