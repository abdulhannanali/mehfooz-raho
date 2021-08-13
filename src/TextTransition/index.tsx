import React, { useEffect, useState, ReactElement } from 'react'

interface TextTransitionProps extends JSX.IntrinsicAttributes {
  textArray: ReactElement[];
  delay: number;
}

export default function TextTransition (props: TextTransitionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => setCurrentIndex((currentIndex + 1) % props.textArray.length),
      props.delay
    )
    return () => clearTimeout(timer)
  })

  return (
    <div className="TextTransition" {...props}>
      {props.textArray[currentIndex]}
    </div>
  )
}
