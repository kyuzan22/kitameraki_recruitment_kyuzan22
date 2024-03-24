import React from 'react';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';

const DetailTaskDialog = ({ onSave, hidden, onDismiss, dialogContent, editMode, setEditMode, openDeleteConfirmation, closeDialog }) => {
    const handleEditSave = () => {
        if (editMode){
            onSave(); 
        } else{
            setEditMode(true); 
        }
    }
    
    return (
        <Dialog
            hidden={hidden} 
            onDismiss={onDismiss} 
            dialogContentProps={{
                type: DialogType.normal,
                title: editMode ? 'Edit Task' : 'Task',
            }} 
            modalProps={{
                isBlocking: false, 
                topOffsetFixed: true, 
                styles: { main: { minWidth: '500px !important', top: '5vh' } } 
            }} 
        >
            {dialogContent} 
            <DialogFooter> 
                <DefaultButton onClick={handleEditSave} text={editMode ? 'Save' : 'Edit'} /> 
                <DefaultButton onClick={openDeleteConfirmation} text="Delete" /> 
                <PrimaryButton onClick={closeDialog} text="Close" /> 
            </DialogFooter> 
        </Dialog>
    );
};

export default DetailTaskDialog;
