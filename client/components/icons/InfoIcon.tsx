import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const InfoIcon = () => {
    return (
        <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 9c0-4.14 3.36-7.5 7.5-7.5 4.148 0 7.5 3.36 7.5 7.5 0 4.14-3.352 7.5-7.5 7.5-4.14 0-7.5-3.36-7.5-7.5zm6.84-2.843c0-.36.3-.66.66-.66.36 0 .653.3.653.66v3.315c0 .36-.293.652-.653.652a.659.659 0 01-.66-.652V6.157zm.668 6.353c-.368 0-.66-.3-.66-.66 0-.36.292-.652.652-.652.368 0 .66.292.66.652a.66.66 0 01-.652.66z"
                fill="#98243C"
            />
        </Svg>
    )
}

export default InfoIcon
