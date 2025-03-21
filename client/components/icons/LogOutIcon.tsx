import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function LogOutIcon(props: any) {
    return (
        <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
            <Path
                opacity={0.4}
                d="M12.513 6.159V5.38a3.071 3.071 0 00-3.07-3.07H5.38a3.07 3.07 0 00-3.07 3.07v9.275a3.07 3.07 0 003.07 3.071h4.07c1.692 0 3.063-1.37 3.063-3.062v-.785"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M18.174 10.018H8.14M15.734 7.59l2.44 2.429-2.44 2.43"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default LogOutIcon
