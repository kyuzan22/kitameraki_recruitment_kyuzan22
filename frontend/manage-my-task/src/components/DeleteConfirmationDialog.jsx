import React from 'react';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';

const DeleteConfirmationDialog = ({ hidden, onDismiss, onConfirm }) => {
    return (
        <Dialog
            hidden={hidden}
            onDismiss={onDismiss}
            dialogContentProps={{
                type: DialogType.normal,
                title: 'Delete Task',
                subText: 'Are you sure you want to delete the task?',
            }}
            modalProps={{
                isBlocking: true,
                topOffsetFixed: true,
            }}
        >
            <DialogFooter>
                <PrimaryButton onClick={onConfirm} text="Delete" />
                <DefaultButton onClick={onDismiss} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
