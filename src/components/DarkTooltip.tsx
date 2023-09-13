import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


export const DarkTooltip = styled(({ className, ...props }: any) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#5a5a5a',
        border: '1px solid rgb(194, 194, 194)',
        color: 'white',
        fontSize: 11,
        textTransform: 'uppercase',
        padding: '0',
    },
}));