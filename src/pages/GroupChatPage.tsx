import { ArrowLeft, MessageSquareText } from 'lucide-react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

function GroupChatPage() {
  return (
    <PhoneFrame tone="light">
      <StatusBar dark={false} />

      <div className="mt-4 flex items-center gap-3 text-black">
          <Link to="/find-group/suggestions" className="rounded-full bg-white p-2 shadow-lg">
            <ArrowLeft className="h-4 w-4 text-[#7c7c7c]" />
          </Link>
          <h1 className="text-3xl">Nhóm FlareUp</h1>
        </div>

        <section className="mt-6 text-center text-black">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#f1f1f1]">
            <MessageSquareText className="h-12 w-12" />
          </div>
          <h2 className="mt-4 text-xl sm:text-3xl">Hãy bắt đầu trò chuyện!</h2>

          <div className="mt-8 border-y-2 border-[#b64047] py-4 text-left">
            <div className="mb-3 w-fit rounded-[45px] bg-[#f1a7a3] px-4 py-2 text-sm text-white">
              Chào mọi người!
            </div>
            <div className="w-fit rounded-[45px] bg-[#f1a7a3] px-4 py-2 text-sm text-white">
              Rất vui được làm việc chung với mọi người
            </div>
          </div>

          <div className="mt-4 rounded-[24px] bg-[#f0f1f2] px-4 py-3 text-left text-sm text-[#7d7f85]">
            Gửi tin nhắn....
          </div>
        </section>

      <BottomNav active="chat" />
    </PhoneFrame>
  )
}

export default GroupChatPage
