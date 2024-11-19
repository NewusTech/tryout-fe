import React from 'react'

interface TitleProps {
    title: string
}

const TitleAdmin = (props : TitleProps) => {
  return (
    <div className="text-primary font-semibold text-xl md:text-3xl mb-4 md:mb-10">
        {props.title}
      </div>
  )
}

export default TitleAdmin