import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal, Button, notification} from 'antd';
// import { requestPost } from '../../utils/fetcher';
import { handleSessions } from '../../utils/helpers';
import { requestPostFormData } from '../../utils/baseService';

function ModalImageCrop({session, modalVisible, imageData, setModalVisible}){
    const [crop, setCrop] = useState({ aspect: 1 / 1, width: 200, height: 200, });
    const [completedCrop, setCompletedCrop] = useState(null);
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const [sendLoading, setSendLoading] = useState(false);
    const [blobData, setBlobData] = useState("")

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    function showSukses(msg) {
      notification["success"]({
        message: "Sukses!",
        description: msg,
      });
    }

    function showError(msg) {
        notification["error"]({
            message: "Error!",
            description: msg,
        });
    }

    useEffect(()=>{
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
        );

        new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                blob.name = "test";
                resolve(blob);
            }, 'image/jpeg', 1);
        }).then((val)=>{
            setBlobData(val)
        });
    },[completedCrop])

    async function onSendingData(){
        setSendLoading(true);
        try{
            let avatarFormData = new FormData();
            avatarFormData.append("avatar", blobData, "avatar.jpeg");
            const datar = await requestPostFormData(session, process.env.NEXT_PUBLIC_API_URL + "/api/v1/user/profile/upload", avatarFormData);
            if (datar.status >= 200 && datar.status <= 300) {
                setSendLoading(false);
                setModalVisible(false);
                showSukses('Avatar succesfully changed')
                window.location.reload();
            }else{
                setSendLoading(false);
                showError('Failed to change the avatar')
            }
        }catch(e){
            setSendLoading(false);
            showError('Something went wrong')
            console.log(e)
        }
    }

    useEffect(()=>{
        console.log("asd", blobData)
    },[blobData])

    return(
        <>
            <Modal
                title='Crop Image'
                size="lg"
                visible={modalVisible}
                onCancel={() => { setModalVisible(false) }}
                destroyOnClose={true}
                footer={
                    <>
                        <Button
                            loading={sendLoading}
                            onClick={()=>onSendingData()}
                            style={{
                                borderRadius: '4px',
                                color: '#FFF',
                                backgroundColor: '#33539E',
                                boxShadow: '0px 2px 5px rgba(51, 83, 158, 0.2)',
                                width: '100%',
                            }}
                        >
                            Change Profile
                        </Button>
                    </>
                }
            >
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', overflow:'scroll'}}>
                    <ReactCrop src={imageData} onImageLoaded={onLoad} crop={crop} onChange={newCrop => setCrop(newCrop)} onComplete={(c) => setCompletedCrop(c)} keepSelection={true}/>
                </div>
                {/* use for preview image crop and convert to blob don't delete this canvas */}
                <canvas ref={previewCanvasRef} style={{display:'none'}}/>
            </Modal>
        </>
    );
}

export default ModalImageCrop;
