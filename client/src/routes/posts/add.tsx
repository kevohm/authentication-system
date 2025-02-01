import { createFileRoute } from '@tanstack/react-router'
import AddPost from '../../pages/AddPost'

export const Route = createFileRoute('/posts/add')({
  component: AddPost,
})
