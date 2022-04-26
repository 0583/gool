import * as React from 'react';
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";

function MainFlow() {
    return (
        <div style={{ margin: 8 }}>
            <Card sx={{ maxWidth: 600 }} variant="outlined">
                <CardHeader sx={{ align: 'left' }}
                    avatar={
                        <Avatar>Alice</Avatar>
                    }
                    title={
                        <Typography>Home</Typography>
                    }
                    subheader="What's happening?"
                />
                <CardContent>
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant="outlined">Kokko</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default MainFlow;