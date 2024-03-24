import React, { useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import '@fluentui/react/dist/css/fabric.css'; // Import Fluent UI CSS
import { IconButton, Nav } from '@fluentui/react';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Panel
                type={PanelType.smallFixedNear}
                isOpen={isOpen}
                onDismiss={togglePanel}
                headerText="Task Management App"
                isBlocking={false}
                hasCloseButton={false}
            >
                <Nav
                    groups={[
                        {
                            links: [
                                {
                                    name: 'Can Add Something here',
                                    url: '',
                                    key: 'key1'
                                },
                                {
                                    name: 'Can Add Something here',
                                    url: '',
                                    key: 'key2'
                                },
                                {
                                    name: 'Can Add Something here',
                                    url: '',
                                    key: 'key3'
                                }
                            ]
                        }
                    ]}
                />
            </Panel>
            {/* Main content wrapper */}
            <div style={{ marginLeft: isOpen ? 275 : 0, transition: 'margin-left 0.3s ease' }}>
                <IconButton
                    iconProps={{ iconName: isOpen ? 'ChevronLeft' : 'ChevronRight' }}
                    title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                    ariaLabel={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                    onClick={togglePanel}
                    style={{ top: '45vh' }}
                />
                {children}
            </div>
        </>
    );
};

export default Sidebar;
