import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import EditPopUp from './EditPopUp';
import Footer from './Footer';
import { loadServerRows } from './utils';

export default function ControlledSelectionServerPaginationGrid() {
  const [srch, setSrch] = React.useState("");
  const handleSrch = (e) => setSrch(e.target.value);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [data, setData] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const searchOnEnter = (ev) => {
    if(ev.target.value === "") return setData(response)
    if(ev.keyCode === 13){
        const tag = srch.toLowerCase()
        const filtered = data.filter((row)=>row.name.toLowerCase().includes(tag)||row.email.toLowerCase().includes(tag)||row.role.toLowerCase().includes(tag))
        setData(filtered)
    }
  }
  const deleteSelected = () => {
      const filtered = data.filter((row)=>!selectionModel.includes(row.id))
      setData(filtered)
      const res = response.filter((row)=>!selectionModel.includes(row.id))
      setResponse(res)
      setSelectionModel([])
  }

  const editRow = (id, name, email, role)=>{
    const obj={
        id,
        name,
        email,
        role
    }
    const filtered = data.map((row)=>id===row.id ? obj : row)
    setData(filtered)
    const res = response.map((row)=>id===row.id ? obj : row)
    setResponse(res)
  }
  const deleteOne = (params) => {
    const filtered = data.filter((row)=>params.id!==row.id)
    setData(filtered)
    const res = response.filter((row)=>params.id!==row.id)
    setResponse(res)
  }
  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Name', flex: 2, sortable: false, headerClassName: 'header', },
    { field: 'email', headerName: 'Email', flex: 4, sortable: false, headerClassName: 'header', },
    { field: 'role', headerName: 'Role', flex: 2, sortable: false, headerClassName: 'header', },
    { field: 'action', headerName: 'Actions', flex: 2, sortable: false, headerClassName: 'header',
      renderCell: (params) => {
        const deleteThis = () => deleteOne(params)
        return (
        <strong>
          <EditPopUp values={params.row} editRow={editRow} />
          <IconButton color="error" component="span" onClick={deleteThis}>
            <DeleteOutlineIcon />
          </IconButton>
        </strong>
      )},
    },
  ]
  
  React.useEffect(() => {
    async function fetchData() {
        if(!data) {
            const response = await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
            const res = await response.json();
            setResponse(res)
            setData(res)
        }
      }
    fetchData();
   // eslint-disable-next-line
}, []);

  React.useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      if(!data) return
      const newRows = await loadServerRows(page, data);
      if (!active) {
        return;
      }
      setRows(newRows);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [page, data]);

  return (
    <Box 
      sx={{
        height: 670, 
        width: '100%',
        '& .header': {
          backgroundColor: '#1976d2',
          color: 'white'
        },
      }}
    >
      <TextField 
        label="Search by Name, Email, Role .."
        helperText="Clear search to list all users.."
        onKeyDown={searchOnEnter}
        value={srch} onChange={handleSrch}
        variant="outlined" 
        fullWidth
        autoFocus
    />
      {data && <DataGrid
        disableColumnMenu
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        pagination
        checkboxSelection
        pageSize={10}
        rowsPerPageOptions={[10]}
        rowCount={data.length}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        loading={loading}
        keepNonExistentRowsSelected
        components={{
            Footer: Footer,
        }}
        componentsProps={{
        footer: { deleteSelected, selectionModel },
        }}
      />}
    </Box>
  );
}
