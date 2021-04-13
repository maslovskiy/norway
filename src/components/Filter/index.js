import React from 'react';
import {Tab, Tabs} from "../Tabs";
import {useSchemas} from "../../providers/schemas/hooks";

const Filter = () => {
  const [value, setValue] = React.useState("ALLE_SKJEMAER");
  const {setFilterValue, types} = useSchemas();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilterValue(newValue)
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
    >
      {
        Object.entries(types).map(([key, value]) =>
          <Tab key={key} label={value} value={key}/>
        )
      }
    </Tabs>
  );
}

export default Filter;