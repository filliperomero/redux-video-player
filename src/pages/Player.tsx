import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MessageCircle } from 'lucide-react'

import { Video } from '../components/Video'
import { Header } from '../components/Header'
import { Module } from '../components/Module'
import { useAppSelector } from '../store'
import { start, useCurrentLesson } from '../store/slices/player'
import { api } from '../lib/axios'

export function Player() {
  const dispatch = useDispatch()
  const modules = useAppSelector(state => state.player.course?.modules)
  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    api.get('/courses/1').then(response => {
      dispatch(start(response.data))
    })
  }, [dispatch])

  useEffect(() => {
    if (currentLesson) document.title = `Watching: ${currentLesson.title}`
  }, [currentLesson])

  return (
    <div className='h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center'>
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          
          <Header />

          <button className='flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600'>
            <MessageCircle className='w-4 h-4' />
            Deixar feedback
          </button>
        </div>

        <main className='relative pr-80 flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow'>
          <div className='flex-1'>
            <Video />
          </div>

          <aside className='absolute top-0 bottom-0 right-0 w-80 divide-y-2 divide-zinc-900 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800'>
            {modules && modules.map((module, index) => (
              <Module key={module.id} moduleIndex={index} title={module.title} lessonAmount={module.lessons.length} />
            ))}
          </aside>
        </main>
      </div>
    </div>
  )
}