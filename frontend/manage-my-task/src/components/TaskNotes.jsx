import React from 'react';
import { CompoundButton } from '@fluentui/react';

const TaskNote = ({ children, toDo }) => {
    return (
        <div style={containerStyles}>
            <CompoundButton
                secondaryText="Click to view task"
                onClick={toDo}
            >
                {children}
            </CompoundButton>
        </div>
    );
};

const containerStyles = {
    '@media (maxWidth:: 599px)': { // Extra small screens (xs)
        fontSize: '14px', // Adjusted font size for extra small screens
    },
    '@media (minWidth:: 600px) and (maxWidth:: 959px)': { // Small screens (sm)
        fontSize: '16px', // Adjusted font size for small screens
    },
    '@media (minWidth:: 960px) and (maxWidth:: 1279px)': { // Medium screens (md)
        fontSize: '18px', // Adjusted font size for medium screens
    },
    '@media (minWidth:: 1280px)': { // Large screens (lg)
        fontSize: '20px', // Adjusted font size for large screens
    },
};

export default TaskNote;
