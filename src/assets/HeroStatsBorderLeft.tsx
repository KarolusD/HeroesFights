import * as React from 'react'

const HeroStatsBorderLeft = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={20}
      height={288}
      viewBox="0 0 20 288"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 .5h-9.207L.5 10.793V20h1v-8.793L11.207 1.5H20v-1zM.5 257V32h1v225h-1zm0 20.207V268h1v8.793l9.707 9.707H20v1h-9.207L.5 277.207z"
        fill={props.fill}
      />
    </svg>
  )
}

export default HeroStatsBorderLeft
