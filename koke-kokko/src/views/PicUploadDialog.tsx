//不能用 ，放弃
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from "react"
import ImageUploading, { ImageListType } from "react-images-uploading";

interface PicUploadDialogProps {
    Pic_url: string,
    setPic_url: (Pic_url: string) => void,
    isOpen: boolean,
    setOpen: (isOpen: boolean) => void
}

function PicUploadDialog(props: PicUploadDialogProps) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    const Pic_Init = () => {
        console.log(props.Pic_url)
        if (props.Pic_url == "") {
            console.log("aaa")
            document.getElementById("upload")?.click()
        }
    }


    const imgonChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        let data = imageList[0].dataURL
        if (data) {
            props.setPic_url(data)
        }
        setImages(imageList as never[]);
    };

    return (
        <Dialog open={props.isOpen} onClose={() => { props.setOpen(false) }} maxWidth="xs" >
            <DialogTitle>PHOTO UPLOAD</DialogTitle>
            <DialogContent sx={{ marginX: 2, marginTop: 2, marginBottom: -2 }}>
                <ImageUploading
                    multiple
                    value={images}
                    onChange={imgonChange}
                    maxNumber={maxNumber}
                >
                    {({
                        imageList,
                        onImageUpdate,
                        onImageRemove,
                        onImageUpload
                    }) => (
                        <div className="upload__image-wrapper" onLoad={Pic_Init}>
                            <Button sx={{ display: "none" }} onClick={onImageUpload} id="upload"></Button>
                            {imageList.map((image, index) => (
                                <div key={props.Pic_url == "" ? index : 0} className="image-item">
                                    <img src={props.Pic_url == "" ? image.dataURL : props.Pic_url} alt="" width="100" onClick={() => onImageUpdate(index)} />
                                    <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>

            </DialogContent>
        </Dialog>
    )
}
export default PicUploadDialog