import { createFileRoute } from "@tanstack/react-router";
import ViewSinglePost from "../../pages/ViewSinglePost";

export const Route = createFileRoute("/posts/$postId")({
  component: ViewSinglePost,
});
