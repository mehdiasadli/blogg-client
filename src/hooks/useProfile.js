import { useState } from 'react'
import { useGetCollections } from './useGetCollections'
import { useGetUsersBlogs } from './useGetUsersBlogs'

const tabs = {
  coll: {
    id: 1,
    name: 'coll',
    title: 'Collections'
  },
  blog: {
    id: 2,
    name: 'blog',
    title: 'Blogs'
  }
}

export const useProfile = (userId = null) => {
  const [screen, setScreen] = useState(
    localStorage.getItem('blogg-screen') ? tabs[localStorage.getItem('blogg-screen')] : tabs.coll
  )

  const { collections, isLoading: colLoading } = useGetCollections(1, userId)
  const { blogs, isLoading: blogLoading } = useGetUsersBlogs(1, userId)

  const handleScreen = (screen) => {
    setScreen(screen)
    localStorage.setItem('blogg-screen', screen.name)
  }

  return {
    colLoading,
    collections,
    blogLoading,
    blogs,
    screen,
    setScreen,
    tabs,
    handleScreen
  }
}
