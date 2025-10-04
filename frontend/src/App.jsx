import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Button } from './components/ui/button'
import MainLayout from './layout/MainLayout'
import TopicSelect from './pages/TopicSelect'
import Loading from './pages/Loading'
import QuizScreen from './pages/QuizScreen'
import ResultScreen from './pages/ResultScreen'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path : '/',
        element: <TopicSelect/>
      },
      {
        path : '/loading',
        element: <Loading/>
      },
      {
        path: '/quiz',
        element: <QuizScreen/>
      },
      {
        path: '/result',
        element: <ResultScreen/>
      }
    ]
  }
])

function App() {
  
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
