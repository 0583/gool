import React from "react";
import { Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Alert } from "@mui/material";
import { Service } from "../services/service";
import { LSConfig } from "../widgets/ConifgLocalstorageUtil";

interface RegisterDialogProps {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void
}

function RegisterDialog(props: RegisterDialogProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("password") == data.get("confirmPassword")) {
            Service.signup(LSConfig.GetConfig(), data.get("email") as string, data.get("password") as string).then(() => {
                return <Alert severity="success">registration succeeded</Alert>
            })
        }
        else {
            return <Alert severity="success">Confirm password is inconsistent</Alert>
        }
    };

    return (
        <Dialog open={props.isOpen} onClose={() => { props.setOpen(false) }}>
            <DialogTitle>
                Get a Koke-kokko Account
            </DialogTitle>
            <DialogContent sx={{ marginX: 2, marginTop: 2, marginBottom: -2 }}>
                <DialogContentText>
                    To register a Koke-kokko account, please provide some required information.
                </DialogContentText>
                <Box component={"form"} onSubmit={handleSubmit} >
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Your Name"
                        fullWidth
                        variant="outlined"
                        sx={{ marginY: 2 }}
                    />
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        sx={{ marginY: 2 }}
                    />

                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        sx={{ marginY: 2 }}
                    />

                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        sx={{ marginTop: 2 }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ margin: 4 }}>
                <Button color="error" onClick={() => { props.setOpen(false) }}>Cancel</Button>
                <Button variant="outlined" onClick={() => { props.setOpen(false) }} type="submit">Register</Button>
            </DialogActions>
        </Dialog>
    )
}

export default RegisterDialog