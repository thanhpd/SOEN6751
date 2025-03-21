import * as React from 'react'
import Svg, { Path, Circle, SvgProps } from 'react-native-svg'

function PaymentBackground(props: SvgProps) {
    return (
        <Svg
            width={350}
            height={722}
            viewBox="0 0 350 722"
            fill="none"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 70c0-11.046 8.954-20 20-20h310c11.046 0 20 8.954 20 20v448.007a16.626 16.626 0 00-.5-.007c-9.665 0-17.5 7.835-17.5 17.5s7.835 17.5 17.5 17.5c.167 0 .334-.002.5-.007V702c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V552.993c9.434-.265 17-7.995 17-17.493 0-9.498-7.566-17.228-17-17.493V70z"
                fill="#EDEDED"
            />
            <Circle cx={175} cy={50} r={50} fill="#EDEDED" />
            <Circle cx={175} cy={50} r={40} fill="#34A853" />
            <Path
                d="M150 46.051L169.565 64 200 36"
                stroke="#fff"
                strokeWidth={7}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default PaymentBackground
