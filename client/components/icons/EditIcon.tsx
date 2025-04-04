import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function EditIcon(props: SvgProps) {
  return (
    <Svg
      width={21}
      height={19}
      viewBox="0 0 21 19"
      fill="none"
      {...props}
    >
      <Path
        d="M14.678 3.03l3.289 3.288a.357.357 0 010 .503l-7.963 7.963-3.383.375a.71.71 0 01-.784-.784l.376-3.383 7.962-7.962a.356.356 0 01.503 0zm5.906-.835L18.805.415a1.426 1.426 0 00-2.012 0l-1.29 1.291a.356.356 0 000 .503l3.288 3.289a.356.356 0 00.503 0l1.29-1.29a1.426 1.426 0 000-2.013zM14 12.618v3.712H2.333V4.663h8.378a.449.449 0 00.31-.128l1.459-1.458a.438.438 0 00-.31-.747H1.75A1.75 1.75 0 000 4.08v12.833c0 .966.784 1.75 1.75 1.75h12.833a1.75 1.75 0 001.75-1.75V11.16c0-.39-.47-.583-.747-.31l-1.458 1.458a.449.449 0 00-.128.31z"
        fill="#fff"
      />
    </Svg>
  )
}

export default EditIcon
