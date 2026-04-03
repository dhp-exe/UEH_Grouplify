import { Navigate, Route, Routes } from 'react-router-dom'
import ClassAnalysisPage from './pages/ClassAnalysisPage'
import ExplorePage from './pages/ExplorePage'
import FindGroupMenuPage from './pages/FindGroupMenuPage'
import GroupChatPage from './pages/GroupChatPage'
import MatchingLoadingPage from './pages/MatchingLoadingPage'
import ProfilePage from './pages/ProfilePage'
import SuggestedGroupsPage from './pages/SuggestedGroupsPage'
import TasksPage from './pages/TasksPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/chat/:groupSlug" element={<GroupChatPage />} />
      <Route path="/find-group/menu" element={<FindGroupMenuPage />} />
      <Route path="/find-group/loading" element={<MatchingLoadingPage />} />
      <Route path="/find-group/analysis" element={<ClassAnalysisPage />} />
      <Route path="/find-group/suggestions" element={<SuggestedGroupsPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
