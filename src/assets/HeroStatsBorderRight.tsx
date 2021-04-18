import * as React from 'react'

const HeroStatsBorderRight = (props: React.SVGProps<SVGSVGElement>) => {
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
        d="M19.5 20v-9.207L9.207.5H0v1h8.793l9.707 9.707V20h1zm-1 237V32h1v225h-1zm-9.293 30.5H0v-1h8.793l9.707-9.707V268h1v9.207L9.207 287.5z"
        fill={props.fill}
      />
    </svg>
  )
}

export default HeroStatsBorderRight
