import Image from 'next/image'
import React from 'react'

const MSITIcon = () => (
  <Image
    alt="MSIT"
    height={48}
    src="/msit-icon.png"
    style={{ display: 'block', height: '3rem', objectFit: 'contain', width: '3rem' }}
    width={48}
  />
)

export default MSITIcon
