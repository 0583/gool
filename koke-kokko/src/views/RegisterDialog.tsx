import React from "react";
import { Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Alert } from "@mui/material";
import { Service } from "../services/service";
import { LSConfig } from "../widgets/ConifgLocalstorageUtil";
import { SnackBarSenderProps } from "../App";

interface RegisterDialogProps {
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void
}

function RegisterDialog(props: RegisterDialogProps & SnackBarSenderProps) {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("password") == data.get("confirmPassword")) {
            await Service.signup(LSConfig.GetConfig(), data.get("email") as string, data.get("password") as string).then(() => {
                props.setOpen(false);
            }).catch((reason) => {
                console.log(reason);
            })
        }
        else {
            console.log("false")
            return <Alert severity="success">Confirm password is inconsistent</Alert>
        }
    };

    return (
        <Dialog open={props.isOpen} onClose={() => { props.setOpen(false) }}>
            <Box component={"form"} onSubmit={handleSubmit} >
                <DialogTitle>
                    Get a Koke-kokko Account
                </DialogTitle>
                <DialogContent sx={{ marginX: 2, marginTop: 2, marginBottom: -2 }}>
                    <DialogContentText>
                        To register a Koke-kokko account, please provide some required information.
                    </DialogContentText>
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

                </DialogContent>
                <DialogActions sx={{ margin: 4 }}>
                    <Button color="error" onClick={() => { props.setOpen(false) }}>Cancel</Button>
                    <Button variant="outlined" type="submit">Register</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default RegisterDialog