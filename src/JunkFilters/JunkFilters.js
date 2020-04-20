import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";

import JunkTypes from "../Data/JunkTypes";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
}));

const FilterCheckboxes = ({ filterItems, setFilterItems }) => {
    const classes = useStyles();

    // function to set checkboxes to checked/unchecked
    const handleChange = (event) => {
        const checkName = event.target.value;
        if (event.target.checked) {
            setFilterItems({filterKeys: filterItems.concat(checkName)});
        } else {
            let array = [...filterItems]; // make a separate copy of the array
            let index = array.indexOf(checkName);
            if (index !== -1) {
                filterItems.splice(index, 1);
                setFilterItems({filterKeys: filterItems});
            }
        }
    };

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Components</FormLabel>
            <FormGroup>
                {JunkTypes.map(function (item) {
                    let key = item.component.toLowerCase().trim();
                    return (
                        <FormControlLabel
                            key={key}
                            control={
                                <Checkbox
                                    checked={filterItems.indexOf(item.component) !== -1}
                                    name={key}
                                    color="primary"
                                    onChange={handleChange}
                                    value={item.component}
                                />
                            }
                            label={item.component}
                        />
                    );
                })}

            </FormGroup>
        </FormControl>
    );

}

export default FilterCheckboxes;