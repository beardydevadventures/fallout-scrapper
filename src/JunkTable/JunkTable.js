import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from 'material-table';
import Chip from '@material-ui/core/Chip';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const useStyles = makeStyles((theme) => ({
    chips: {
        margin: theme.spacing(1),
    },
    tableHead: {
        fontFamily: 'Overseer, Arial',
    },
}));

const JunkTable = ({ junkComponents, filterItems, setFilterItems }) => {
    const classes = useStyles();

    const junkData = junkComponents.filter((rowData) => {
        if (filterItems.length <= 0) {
            return rowData;
        } else {
            const rowValues = [
                rowData.component_one,
                rowData.component_two,
                rowData.component_three,
                rowData.component_four
            ];
            let weight = 0;
            let match = false;
            let filterString = filterItems.join("|");
            rowValues.forEach((item) => {
                if (item === "") {
                    return;
                }
                if (new RegExp(item).test(filterString)) {
                    match = true;
                    weight++;
                }
            });

            rowData.weight = (weight * 25) + "%";

            return match;
        }
    });

    const handleDelete = (filter) => () => {
        let array = [...filterItems];
        let index = array.indexOf(filter);
        if (index !== -1) {
            filterItems.splice(index, 1);
            setFilterItems({ filterKeys: filterItems });
        }
    };

    const tableSettings = {
        tableHeaders: [
            { title: "Item", field: "name" },
            { title: "Comp 1", field: "component_one" },
            { title: "Comp 2", field: "component_two" },
            { title: "Comp 3", field: "component_three" },
            { title: "Comp 4", field: "component_four" },
            { title: "%", field: "weight" },
        ],
        tableComponents: {
            Toolbar: props => (
                <div className={classes.tableHead}>
                    <MTableToolbar {...props} />
                    {filterItems.map(filter => (
                        <Chip className={classes.chips} key={filter} label={filter} onDelete={handleDelete(filter)} color="primary" />
                    ))}
                </div>
            )
        },
        tableIcons: {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
        }
    };

    return (
        <MaterialTable
            title="Junk Items"
            icons={tableSettings.tableIcons}
            columns={tableSettings.tableHeaders}
            data={junkData}
            components={tableSettings.tableComponents}
        />
    );
}

export default JunkTable;