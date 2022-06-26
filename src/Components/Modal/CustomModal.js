import React from 'react';
import {Modal,Button,Box, Typography}  from '@mui/material';
const CustomModal = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={props.open}
            onClose={props.closeCallback}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box  sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {props.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {props.content}
                </Typography>
                <Button onClick={props.closeCallback}>Close </Button>
            </Box>
        </Modal>
    );
};

export default CustomModal;
