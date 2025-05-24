import { Routes, Route, Link } from 'react-router-dom'
import DebounceDemo from './components/DebounceDemo'
import ArrayReduceDemo from './components/ArrayReduceDemo'
import ArrayFilterDemo from './components/ArrayFilterDemo'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Frontend Interview Kit</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  Home
                </Link>
                <Link to="/javascript" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  JavaScript
                </Link>
                <Link to="/html" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  HTML
                </Link>
                <Link to="/css" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  CSS
                </Link>
                <Link to="/react" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  React
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/javascript/*" element={
            <div className="space-y-8">
              <h1 className="text-3xl font-bold mb-6">JavaScript Concepts</h1>
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Common Patterns</h2>
                  <DebounceDemo />
                </section>
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Array Methods</h2>
                  <ArrayReduceDemo />
                  <div className="mt-8">
                    <ArrayFilterDemo />
                  </div>
                </section>
              </div>
            </div>
          } />
          <Route path="/html/*" element={<div>HTML Section</div>} />
          <Route path="/css/*" element={<div>CSS Section</div>} />
          <Route path="/react/*" element={<div>React Section</div>} />
        </Routes>
      </main>
    </div>
  )
}

function Home() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to Frontend Interview Kit</h2>
      <p className="text-gray-600 mb-4">
        This is a comprehensive collection of frontend interview preparation materials.
        Explore different sections to learn about JavaScript, HTML, CSS, and React concepts.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TopicCard
          title="JavaScript"
          description="Core concepts, ES6+, async programming, and more"
          path="/javascript"
        />
        <TopicCard
          title="HTML"
          description="Semantic HTML, accessibility, and best practices"
          path="/html"
        />
        <TopicCard
          title="CSS"
          description="Modern CSS, layouts, animations, and responsive design"
          path="/css"
        />
        <TopicCard
          title="React"
          description="Components, hooks, state management, and performance"
          path="/react"
        />
      </div>
    </div>
  )
}

interface TopicCardProps {
  title: string
  description: string
  path: string
}

function TopicCard({ title, description, path }: TopicCardProps) {
  return (
    <Link
      to={path}
      className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50 transition-colors"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  )
}

export default App 