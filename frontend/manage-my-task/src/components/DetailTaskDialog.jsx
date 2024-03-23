import React from 'react';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';

const DetailTaskDialog = ({ hidden, onDismiss, dialogContent, editMode, setEditMode, openDeleteConfirmation, closeDialog }) => {
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
                <DefaultButton onClick={() => setEditMode(!editMode)} text={editMode ? 'Save' : 'Edit'} />
                <DefaultButton onClick={openDeleteConfirmation} text="Delete" />
                <PrimaryButton onClick={closeDialog} text="Close" />
            </DialogFooter>
        </Dialog>
    );
};

export default DetailTaskDialog;
