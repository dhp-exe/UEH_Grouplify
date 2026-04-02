import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import StatusBar from '../components/StatusBar'

function MatchingLoadingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/find-group/analysis'), 1800)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <PhoneFrame tone="teal">
      <StatusBar />

      <section className="mt-20 text-center">
        <div className="mx-auto h-64 w-64 rounded-full border-8 border-[#37f0e7] p-5">
          <div className="h-full w-full animate-spin rounded-full border-4 border-[#2ed8d2] border-t-transparent" />
        </div>

        <h2 className="mt-8 text-[66px]">Đang phân tích kỹ năng lớp...</h2>
        <p className="mt-2 text-[56px]">Đang tìm nhóm phù hợp nhất cho bạn...</p>

        <div className="mx-auto mt-36 h-12 w-[88%] rounded-full border-4 border-[#3cc8d1] p-1">
          <div className="h-full w-[60%] animate-pulse rounded-full bg-[#33bcc9]" />
        </div>
      </section>
    </PhoneFrame>
  )
}

export default MatchingLoadingPage
