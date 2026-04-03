import type { ReactNode } from 'react'

type PhoneFrameProps = {
  tone: 'teal' | 'light'
  children: ReactNode
}

function PhoneFrame({ tone, children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen flex w-full justify-center">
      <main
        className={`phone-frame w-full max-w-md h-screen sm:h-[800px] ${tone === 'teal' ? 'screen-teal' : 'screen-light'}`}
      >
        <div className="phone-content">{children}</div>
      </main>
    </div>
  )
}

export default PhoneFrame
