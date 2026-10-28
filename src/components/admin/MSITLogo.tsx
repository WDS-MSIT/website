import Image from 'next/image'
import React from 'react'

const MSITLogo = () => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      maxWidth: '30rem',
    }}
  >
    <Image
      alt="Maharaja Surajmal Institute of Technology emblem"
      height={88}
      src="/msit-icon.png"
      style={{ height: '5.5rem', objectFit: 'contain', width: '5.5rem' }}
      width={88}
    />
    <span
      style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.25,
        textAlign: 'left',
      }}
    >
      Maharaja Surajmal Institute of Technology
    </span>
  </div>
)

export default MSITLogo
