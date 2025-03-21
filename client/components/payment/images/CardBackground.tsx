import * as React from 'react'
import Svg, {
    G,
    Rect,
    Path,
    Defs,
    LinearGradient,
    Stop,
    ClipPath,
    SvgProps,
} from 'react-native-svg'

const CardBackground = (props: SvgProps) => {
    return (
        <Svg
            width={350}
            height={205}
            viewBox="0 0 350 205"
            fill="none"
            {...props}
        >
            <G clipPath="url(#clip0_297_12481)">
                <Rect
                    x={0.419434}
                    y={0.515625}
                    width={349.161}
                    height={204.387}
                    rx={15}
                    fill="#fff"
                />
                <Rect
                    x={0.419434}
                    y={0.515625}
                    width={349.161}
                    height={204.387}
                    rx={15}
                    fill="url(#paint0_linear_297_12481)"
                />
                <Path
                    d="M66.92 44.016c-28-6-56 10.5-66.5 19.5v-63h147.999c-15.5 17-53.5 49.5-81.5 43.5z"
                    fill="url(#paint1_linear_297_12481)"
                />
                <Path
                    d="M110.419 102.386c-66.4-7.6-110.5 14.167-119.5 26l-9.5 37.5c22-21.055 76.8-53.132 82-13 6.5 50.165 82.5 30.5 86.5 13s93 20 79-37.5 109.5-2.5 109.5-8.5v-48c-9.833-17-46.2-48.2-113-37-83.5 14-32 77-115 67.5z"
                    fill="url(#paint2_linear_297_12481)"
                />
            </G>
            <Defs>
                <LinearGradient
                    id="paint0_linear_297_12481"
                    x1={175}
                    y1={0.515625}
                    x2={175}
                    y2={204.903}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#9EC7CB" />
                    <Stop offset={1} stopColor="#FFC16E" />
                </LinearGradient>
                <LinearGradient
                    id="paint1_linear_297_12481"
                    x1={74.4194}
                    y1={0.515625}
                    x2={34.4194}
                    y2={63.5156}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#FFC16E" stopOpacity={0.4} />
                    <Stop offset={1} stopColor="#9EC7CB" />
                </LinearGradient>
                <LinearGradient
                    id="paint2_linear_297_12481"
                    x1={268.419}
                    y1={57.886}
                    x2={-8.08058}
                    y2={149.516}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#9EC7CB" stopOpacity={0.7} />
                    <Stop
                        offset={0.9999}
                        stopColor="#FFC16E"
                        stopOpacity={0.5}
                    />
                    <Stop offset={1} stopColor="#F2C335" stopOpacity={0.7} />
                </LinearGradient>
                <ClipPath id="clip0_297_12481">
                    <Rect
                        x={0.419434}
                        y={0.515625}
                        width={349.161}
                        height={204.387}
                        rx={15}
                        fill="#fff"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default CardBackground
