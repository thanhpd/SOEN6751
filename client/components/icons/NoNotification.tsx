import * as React from 'react'
import Svg, {
    G,
    Circle,
    Path,
    Defs,
    RadialGradient,
    Stop,
    SvgProps,
} from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function NoNotification(props: SvgProps) {
    return (
        <Svg
            width={292}
            height={292}
            viewBox="0 0 292 292"
            fill="none"
            {...props}
        >
            <G filter="url(#filter0_d_591_15318)" shapeRendering="crispEdges">
                <Circle
                    cx={146}
                    cy={142}
                    r={134}
                    fill="#F6F6F6"
                    fillOpacity={0.5}
                />
                <Circle
                    cx={146}
                    cy={142}
                    r={136}
                    stroke="url(#paint0_radial_591_15318)"
                    strokeWidth={4}
                />
            </G>
            <Circle
                cx={146}
                cy={142}
                r={121}
                stroke="url(#paint1_radial_591_15318)"
                strokeOpacity={0.8}
                strokeWidth={4}
            />
            <G filter="url(#filter1_d_591_15318)">
                <Path
                    d="M213 142c0 37.003-29.997 67-67 67s-67-29.997-67-67 29.997-67 67-67 67 29.997 67 67z"
                    fill="#fff"
                    fillOpacity={0.8}
                />
            </G>
            <G filter="url(#filter2_d_591_15318)">
                <Path
                    d="M179 142c0 18.225-14.775 33-33 33s-33-14.775-33-33 14.775-33 33-33 33 14.775 33 33z"
                    fill="#98243C"
                />
            </G>
            <Path
                d="M160.21 144.305l-3.71 3.728-3.71-3.728-2.485 2.485 3.727 3.71-3.727 3.71 2.485 2.485 3.71-3.727 3.71 3.727 2.485-2.485-3.728-3.71 3.728-3.71M146 122.5a3.51 3.51 0 00-3.5 3.5v.508a12.247 12.247 0 00-8.75 11.742v10.5l-3.5 3.5V154h16.362a10.39 10.39 0 01-.612-3.5h-8.75v-12.25a8.749 8.749 0 1117.5 0v1.908a11.546 11.546 0 011.75-.158 9.72 9.72 0 011.75.158v-1.908c0-5.565-3.71-10.255-8.75-11.742V126a3.503 3.503 0 00-3.5-3.5zm-3.5 33.25a3.5 3.5 0 006.387 1.978 10.97 10.97 0 01-1.47-1.978H142.5z"
                fill="#fff"
            />
            <Defs>
                <RadialGradient
                    id="paint0_radial_591_15318"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(58.107 -4.973 29.496) scale(303.715)"
                >
                    <Stop stopColor="#98243C" />
                    <Stop offset={1} stopOpacity={0} />
                </RadialGradient>
                <RadialGradient
                    id="paint1_radial_591_15318"
                    cx={0}
                    cy={0}
                    r={1}
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="rotate(52.091 -14.489 53.343) scale(297.849)"
                >
                    <Stop stopOpacity={0.55} />
                    <Stop offset={1} stopOpacity={0} />
                </RadialGradient>
            </Defs>
        </Svg>
    )
}

export default NoNotification
