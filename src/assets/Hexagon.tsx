import * as React from 'react'

const Hexagon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ? props.width : 32}
      height={props.height ? props.height : 32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.644 8.289L14 .577 27.356 8.29V23.71L14 31.423.644 23.71V8.29z"
        fill={props.fill}
        fillOpacity={props.fillOpacity}
        stroke={props.stroke || 'none'}
        strokeWidth={props.strokeWidth || 1}
      />
    </svg>
  )
}

export default Hexagon
