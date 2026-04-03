import { ArrowLeft, MessageSquareText, SendHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

const groupNameBySlug: Record<string, string> = {
  flareup: 'Nhóm FlareUp',
  groupy: 'Nhóm Groupy',
}

const mockMessages = ['Chào mọi người!', 'Rất vui được làm việc chung với mọi người']

function GroupChatPage() {
  const { groupSlug } = useParams<{ groupSlug: string }>()
  const groupName = groupSlug ? (groupNameBySlug[groupSlug.toLowerCase()] ?? 'Nhóm FlareUp') : 'Nhóm FlareUp'
  const [inputValue, setInputValue] = useState('')
  const [sentMessages, setSentMessages] = useState<string[]>([])

  const hasSentMessage = sentMessages.length > 0
  const isTyping = inputValue.trim().length > 0

  const handleSend = (customMessage?: string) => {
    const content = (customMessage ?? inputValue).trim()
    if (!content) return

    setSentMessages((prev) => [...prev, content])
    setInputValue('')
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSend()
  }

  return (
    <PhoneFrame tone="light">
      <StatusBar dark={false} />

      <div className="mt-4 flex items-center gap-3 text-black">
          <Link to="/find-group/suggestions" className="rounded-full bg-white transition hover:scale-105 p-2 shadow-lg">
            <ArrowLeft className="h-4 w-4 text-[#7c7c7c]" />
          </Link>
          <h1 className="text-3xl">{groupName}</h1>
        </div>

        <section className="mt-6 text-center text-black">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#f1f1f1]">
            <MessageSquareText className="h-12 w-12" />
          </div>
          <h2 className="mt-4 text-xl sm:text-3xl">Hãy bắt đầu trò chuyện!</h2>

          <div className="mt-8 space-y-3 border-y-2 border-[#b64047] py-4 text-left">
            {!hasSentMessage &&
              mockMessages.map((message) => (
                <button
                  key={message}
                  type="button"
                  onClick={() => handleSend(message)}
                  className="block w-fit ml-auto mr-auto rounded-[45px] bg-[#f1a7a3] px-4 py-2 text-sm text-white transition-transform duration-200 transition hover:scale-[1.02] focus-visible:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1a7a3]"
                >
                  {message}
                </button>
              ))}

            {sentMessages.map((message, index) => (
              <div
                key={`${message}-${index}`}
                className="ml-auto w-fit rounded-[45px] bg-[#f1a7a3] px-4 py-2 text-sm text-white"
              >
                {message}
              </div>
            ))}

            {isTyping && (
              <div className="ml-auto w-fit rounded-[45px] bg-[#eceff2] px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#8f98a1]" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#8f98a1]" style={{ animationDelay: '120ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#8f98a1]" style={{ animationDelay: '240ms' }} />
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-4 flex items-center gap-2 rounded-[24px] bg-[#f0f1f2] px-4 py-2 text-left"
          >
            <input
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Gửi tin nhắn...."
              className="w-full bg-transparent text-sm text-[#4d4f54] outline-none placeholder:text-[#7d7f85]"
            />
            <button
              type="submit"
              disabled={!isTyping}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1a7a3] text-white transition-all duration-200 enabled:hover:scale-110 enabled:focus-visible:scale-110 enabled:focus-visible:outline-none enabled:focus-visible:ring-2 enabled:focus-visible:ring-[#f1a7a3] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Gửi tin nhắn"
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          </form>
        </section>

      <BottomNav active="chat" />
    </PhoneFrame>
  )
}

export default GroupChatPage
