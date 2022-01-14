import { useQuery, useMutation } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { isLoading, data, isError, error } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );

  const deleteMutation = useMutation((id) => deletePost(id));
  const updateMutation = useMutation((id) => {
    updatePost(id);
  });

  switch (true) {
    case isLoading:
      return <div>"isLoading"</div>;
    case isError:
      return (
        <>
          <h1>ab</h1>
          <p>{error.toString()}</p>
        </>
      );
    default:
      return (
        <>
          <h3 style={{ color: "blue" }}>{post.title}</h3>
          <button
            onClick={() => {
              deleteMutation.mutate(post.id);
            }}
          >
            Delete
          </button>
          {deleteMutation.isError && <p>Error</p>}
          {deleteMutation.isLoading && <p>Deleting</p>}
          {deleteMutation.isSuccess && <p>Success</p>}
          <button
            onClick={() => {
              updateMutation.mutate(post.id);
            }}
          >
            Update title
          </button>
          {updateMutation.isError && <p>Error</p>}
          {updateMutation.isLoading && <p>Updating</p>}
          {updateMutation.isSuccess && <p>Success</p>}
          <p>{post.body}</p>
          <h4>Comments</h4>
          {data.map((comment) => (
            <li key={comment.id}>
              {comment.email}: {comment.body}
            </li>
          ))}
        </>
      );
  }
}
