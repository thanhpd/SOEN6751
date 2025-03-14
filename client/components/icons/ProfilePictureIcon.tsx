import * as React from 'react'
import Svg, { G, Rect, Path, Defs, ClipPath } from 'react-native-svg'

const ProfilePictureIcon = () => {
    return (
        <Svg width={78} height={78} viewBox="0 0 78 78" fill="none">
            <G clipPath="url(#clip0_1_1751)">
                <Rect
                    x={2}
                    y={2}
                    width={74}
                    height={74}
                    rx={37}
                    fill="#F3F4F9"
                />
                <Path
                    d="M19 72c0-11.046 8.954-20 20-20s20 8.954 20 20v20H19V72z"
                    fill="#98243C"
                />
                <Rect
                    x={27}
                    y={24}
                    width={24}
                    height={24}
                    rx={12}
                    fill="#98243C"
                />
            </G>
            <Rect
                x={2}
                y={2}
                width={74}
                height={74}
                rx={37}
                stroke="#fff"
                strokeWidth={4}
            />
            <Defs>
                <ClipPath id="clip0_1_1751">
                    <Rect
                        x={2}
                        y={2}
                        width={74}
                        height={74}
                        rx={37}
                        fill="#fff"
                    />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default ProfilePictureIcon
