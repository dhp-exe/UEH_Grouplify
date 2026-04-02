import { ArrowLeft, MessageSquareText } from 'lucide-react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

function GroupChatPage() {
  return (
    <PhoneFrame tone="light">
      <StatusBar dark={false} />

      <div className="origin-top scale-[0.86]">
        <div className="mt-6 flex items-center gap-3 text-black">
          <Link to="/find-group/suggestions" className="rounded-full bg-white p-8 shadow-lg">
            <ArrowLeft className="h-8 w-8 text-[#7c7c7c]" />
          </Link>
          <h1 className="ml-4 text-[78px]">Nhóm FlareUp</h1>
        </div>

        <section className="mt-8 text-center text-black">
          <div className="mx-auto flex h-96 w-96 items-center justify-center rounded-full bg-[#f1f1f1]">
            <MessageSquareText className="h-40 w-40" />
          </div>
          <h2 className="mt-6 text-[66px]">Hãy bắt đầu trò chuyện!</h2>

          <div className="mt-64 border-y-2 border-[#b64047] py-6 text-left">
            <div className="mb-4 w-fit rounded-[45px] bg-[#f1a7a3] px-4 py-2 text-[48px] text-white">
              Chào mọi người!
            </div>
            <div className="w-fit rounded-[45px] bg-[#f1a7a3] px-4 py-2 text-[46px] text-white">
              Rất vui được làm việc chung với mọi người
            </div>
          </div>

          <div className="mt-4 rounded-[24px] bg-[#f0f1f2] px-5 py-4 text-left text-[56px] text-[#7d7f85]">
            Gửi tin nhắn....
          </div>
        </section>
      </div>

      <BottomNav active="chat" />
    </PhoneFrame>
  )
}

export default GroupChatPage
