import React from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function Carlist() {
    const [cars, setCars] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    React.useEffect(()=> {
        getCars();
    }, [])

    const getCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))

    }

    const deleteCar = (link) => {
       if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then(response => getCars())
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }
}
    const handleClose = () => {
    setOpen(false);
}

    const columns = [
    {
        Header : 'Brand', 
        accessor: 'brand'
    },
    {
        Header: 'Model',
        accessor: 'model'
    },
    {
        Header: 'Color',
        accessor: 'color'
    },
    {
        Header: 'Year',
        accessor: 'year'
    },
    {
        Header: 'Fuel',
        accessor: 'fuel'
    },
    {
        Header: 'Price',
        accessor: 'price'
    },
    {
        Cell: row => (<Button size="small" color="secondary" onClick={() => deleteCar(row.original._links.self.href)}>Delete</Button>)
    }
    ]

    return(
    <div>
        <ReactTable defaultPageSize={10} filterable={true}data={cars} columns={columns} />
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message='Car deleted'
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
        }}
    />
    </div>

    );
}