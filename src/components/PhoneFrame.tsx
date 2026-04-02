import type { ReactNode } from 'react'

type PhoneFrameProps = {
  tone: 'teal' | 'light'
  children: ReactNode
}

function PhoneFrame({ tone, children }: PhoneFrameProps) {
  return (
    <main className={`phone-frame ${tone === 'teal' ? 'screen-teal' : 'screen-light'}`}>
      <div className="phone-content">{children}</div>
    </main>
  )
}

export default PhoneFrame
