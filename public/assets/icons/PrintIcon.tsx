import React from 'react'

interface PrintIconProps{
    color?: string;
}
const PrintIcon = (props: PrintIconProps) => {
    return (
        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 17H3.5C2.96957 17 2.46086 16.7893 2.08579 16.4142C1.71071 16.0391 1.5 15.5304 1.5 15V10C1.5 9.46957 1.71071 8.96086 2.08579 8.58579C2.46086 8.21071 2.96957 8 3.5 8H19.5C20.0304 8 20.5391 8.21071 20.9142 8.58579C21.2893 8.96086 21.5 9.46957 21.5 10V15C21.5 15.5304 21.2893 16.0391 20.9142 16.4142C20.5391 16.7893 20.0304 17 19.5 17H17.5M5.5 8V2C5.5 1.73478 5.60536 1.48043 5.79289 1.29289C5.98043 1.10536 6.23478 1 6.5 1H16.5C16.7652 1 17.0196 1.10536 17.2071 1.29289C17.3946 1.48043 17.5 1.73478 17.5 2V8M6.5 13H16.5C17.0523 13 17.5 13.4477 17.5 14V20C17.5 20.5523 17.0523 21 16.5 21H6.5C5.94772 21 5.5 20.5523 5.5 20V14C5.5 13.4477 5.94772 13 6.5 13Z" stroke={props.color ? props.color : "#4A055B"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default PrintIcon