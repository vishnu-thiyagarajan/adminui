import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function FormDialog({values, editRow}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true)      
  const handleClose = () => setOpen(false)
  const [name, setName] = React.useState(values.name);
  const handleName = (e)=>setName(e.target.value);
  const [email, setEmail] = React.useState(values.email);
  const handleEmail = (e)=>setEmail(e.target.value);
  const [role, setRole] = React.useState(values.role);
  const handleRole = (e)=>setRole(e.target.value);
  const handleSave = () => {
      editRow(values.id, name, email, role);
      handleClose()
  }
  return (
    <>
    <IconButton color="primary" component="span" onClick={handleClickOpen}>
        <EditOutlinedIcon />
    </IconButton>
    <Dialog open={open} onClose={handleClose} BackdropProps={{ style: { backgroundColor: "transparent" } }}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                value={name}
                onChange={handleName}
                label="Name"
                type="text"
                fullWidth
                variant="standard"
            />
            <TextField
                margin="dense"
                id="email"
                value={email}
                onChange={handleEmail}
                label="Email"
                type="email"
                fullWidth
                variant="standard"
            />
            <InputLabel id="role-select" sx={{mt:1}}>Role</InputLabel>
            <Select
                id="role-select"
                variant="standard"
                fullWidth
                value={role}
                label="Role"
                onChange={handleRole}
            >
                <MenuItem value="member">member</MenuItem>
                <MenuItem value="admin">admin</MenuItem>
            </Select>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
    </Dialog>
    </>
  );
}
