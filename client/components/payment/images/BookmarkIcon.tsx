import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function BookmarkIcon(props: SvgProps) {
    return (
        <Svg width={19} height={25} viewBox="0 0 19 25" fill="none" {...props}>
            <Path
                d="M.446 24.492V2.296A2.296 2.296 0 012.742 0H16.52a2.296 2.296 0 012.296 2.296v22.197L9.63 19.134.446 24.492z"
                fill="#000"
            />
        </Svg>
    )
}

export default BookmarkIcon
