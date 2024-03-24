import React from 'react';
import { CompoundButton } from '@fluentui/react';

const TaskNote = ({ children, toDo }) => {
    return (
        <CompoundButton
            style={{ maxWidth:'100%', width: '100%', alignItems: 'center' }}
            secondaryText="Click to view task"
            onClick={toDo}
        >
            {children}
        </CompoundButton>
    );
};

export default TaskNote;
