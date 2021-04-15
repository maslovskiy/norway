import React from "react";
import {TextField as MaterialTextField} from "@material-ui/core";

export const EditableCell = ({value: initialValue, row: {index}, column, updateMyData}) => {
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  if (column.editable) {

    const onChange = e => {
      setValue(e.target.value);
    }

    const onBlur = () => {
      updateMyData(index, column.id, value)
    }

    switch (column.id) {
      default:
        return <MaterialTextField value={value} type={column.type || "text"} onChange={onChange} onBlur={onBlur}/>
    }
  } else {
    return <div>{initialValue}</div>
  }
}