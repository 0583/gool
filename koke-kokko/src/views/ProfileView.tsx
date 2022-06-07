import {
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box, Button,
    CardMedia, Divider,
    Grid, IconButton, List,
    ListItem, Skeleton, Stack,
    TextField,
    Typography
} from "@mui/material";
import { Edit, ExpandMore } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import React from "react";
import KokkoMessageCard from "../widgets/KokkoMessageCard";
import { SnackBarSenderProps } from "../App";
import { LocalStoreConfig } from "../widgets/ConifgLocalstorageUtil";
import { Config, Service } from '../services/service';
import ImageUploading, { ImageListType, ImageType } from "react-images-uploading";
import { Avatar } from '@mui/material';
import { Request } from "../services/request";


const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

function getProperties(itemName: string, content: string, description: string) {
    return (<Accordion variant="outlined">
        <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography sx={{ width: "33%" }} fontWeight="bold">{itemName}</Typography>
            <Typography sx={{ color: "text.secondary" }}>{content}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                {description}
            </Typography>
        </AccordionDetails>
    </Accordion>);
}

function ProfileView(props: SnackBarSenderProps) {
    let config = LocalStoreConfig.get_config() as Config;
    const [loading, setloading] = React.useState<boolean>(true);
    const [images, setImages] = React.useState<ImageType[]>([]);
    const [AlertOpen, setAlertOpen] = React.useState<boolean>(false);
    const maxNumber = 1;


    const piconChange = async (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        // data for submit
        if (imageList.length > 0) {
            setloading(false);
            config.user.profile_photo = await Request.upload_image(imageList[0].file!);
            await Service.update_user(config).then(() => {
                LocalStoreConfig.set_config(config);
                props.sender("Modified successfully!")
                setloading(true);
            }).catch((error) => {
                props.sender(error)
            })

        }
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const delectAccounthandler = async () => {
        await Service.cancel(config)
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        config.user.username = data.get("name") as string;
        config.user.password = data.get("password") as string;
        await Service.update_user(config).then(() => {
            LocalStoreConfig.set_config(config);
            props.sender("Modified successfully!");
        })

    };
    return (
        <div>
            {AlertOpen &&
                <Alert
                    action={
                        <div>
                            <Button color="inherit" size="small" onClick={() => {
                                delectAccounthandler()
                            }}>
                                ACCEPT
                            </Button>
                            <Button color="inherit" size="small" onClick={() => { setAlertOpen(false) }}>
                                UNDO
                            </Button>
                        </div>
                    }

                >
                    This is a success alert — check it out!
                </Alert>
            }
            <ImageUploading
                multiple
                value={images}
                onChange={piconChange}
                maxNumber={maxNumber}>{({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <Grid container spacing={2} >
                        <Grid item xs={7}>
                            <List>
                                <ListItem>
                                    <Typography variant="h4">
                                        Your Kokkos
                                    </Typography>
                                </ListItem>
                                <ListItem key="my_kokko_1">
                                    <KokkoMessageCard
                                        username="YU Xiqian"
                                        avatar="avatars/xiqyu.png"
                                        date="April 28, 2022"
                                        content="can't believe what i've just seen..."
                                        showActions={false} />
                                </ListItem>
                                <ListItem key="my_kokko_2">
                                    <KokkoMessageCard
                                        username="YU Xiqian"
                                        avatar="avatars/xiqyu.png"
                                        date="April 21, 2022"
                                        content="The worst day ever."
                                        showActions={false} />
                                </ListItem>
                                <ListItem key="my_kokko_3">
                                    <KokkoMessageCard
                                        username="YU Xiqian"
                                        avatar="avatars/xiqyu.png"
                                        date="March 3, 2022"
                                        content="Why? Why? Why?"
                                        showActions={false} />
                                </ListItem>
                                <Divider sx={{ margin: 2, fontSize: 13, color: 'gray' }}>3 Kokkos</Divider>
                            </List>
                        </Grid>
                        <Grid item xs={5}>
                            <Box margin={2}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
                                    <Typography variant="h4">
                                        Personal Info
                                    </Typography>
                                </Stack>


                                <Box component={"form"} onSubmit={handleSubmit}>
                                    <Box className="upload__image-wrapper" sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography fontSize={20} sx={{ fontWeight: 800, pr: "60px" }} >Avatar:</Typography>
                                        {
                                            loading ? (
                                                <Box className="image-item__btn-wrapper" sx={{
                                                    width: "118px", height: "118px", borderRadius: "999px", backgroundSize: "cover",
                                                    backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundImage: "url(/api/image?uuid=" + config.user.profile_photo + ")"
                                                }} >


                                                    <IconButton sx={{ width: "118px", height: "118px", borderRadius: "999px", background: "rgb(255, 255, 255, 0.1)" }} onClick={() => {
                                                        onImageRemoveAll();
                                                        onImageUpload();
                                                    }} ></IconButton>

                                                </Box>
                                            ) : (
                                                <Skeleton variant="circular" width={118} height={118} />
                                            )}
                                    </Box>

                                    <TextField
                                        required
                                        autoFocus
                                        margin="dense"
                                        name="name"
                                        label="Your Name"
                                        fullWidth
                                        variant="outlined"
                                        defaultValue={config.user.username}
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
                                        defaultValue={config.user.password}
                                    />

                                    <Stack direction="row" spacing={1} >
                                        <Button sx={{ margin: 0, padding: 1 }} type="submit" variant="outlined">
                                            Modification
                                        </Button>

                                        <Button sx={{ margin: 0, padding: 1 }} variant="outlined" color="error" onClick={() => {
                                            setAlertOpen(true)
                                        }}>
                                            Delete Account
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </ImageUploading>
        </div>
    )
}


export default ProfileView;