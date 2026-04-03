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

      <section className="mt-12 text-center">
        <div className="mx-auto h-36 w-36 rounded-full border-4 border-[#37f0e7] p-3">
          <div className="h-full w-full animate-spin rounded-full border-4 border-[#2ed8d2] border-t-transparent" />
        </div>

        <h2 className="mt-6 text-xl sm:text-3xl">Đang phân tích kỹ năng lớp...</h2>
        <p className="mt-2 text-lg sm:text-xl">Đang tìm nhóm phù hợp nhất cho bạn...</p>

        <div className="mx-auto mt-14 h-6 w-[88%] rounded-full border-2 border-[#3cc8d1] p-1">
          <div className="h-full w-[60%] animate-pulse rounded-full bg-[#33bcc9]" />
        </div>
      </section>
    </PhoneFrame>
  )
}

export default MatchingLoadingPage
