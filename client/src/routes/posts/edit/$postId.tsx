import { createFileRoute } from '@tanstack/react-router'
import EditPost from '../../../pages/EditPost'

export const Route = createFileRoute('/posts/edit/$postId')({
  component: EditPost
})

