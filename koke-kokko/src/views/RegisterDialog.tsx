import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

interface RegisterDialogProps {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void
}

function RegisterDialog(props: RegisterDialogProps) {
    return (
        <Dialog open={props.isOpen} onClose={ () => { props.setOpen(false) } }>
            <DialogTitle>
                Get a Koke-kokko Account
            </DialogTitle>
            <DialogContent sx={{ marginX: 2, marginTop: 2, marginBottom: -2 }}>
                <DialogContentText>
                    To register a Koke-kokko account, please provide some required information.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Your Name"
                    fullWidth
                    variant="outlined"
                    sx={{ marginY: 2}}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    sx={{ marginY: 2}}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    sx={{ marginY: 2}}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    sx={{ marginTop: 2 }}
                />
            </DialogContent>
            <DialogActions sx={{ margin: 4 }}>
                <Button color="error" onClick={ () => { props.setOpen(false) }}>Cancel</Button>
                <Button variant="outlined" onClick={ () => { props.setOpen(false) }}>Register</Button>
            </DialogActions>
        </Dialog>
    )
}

export default RegisterDialog