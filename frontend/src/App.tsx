import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskList from './components/TaskList'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App