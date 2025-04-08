import { useGetPosts } from '@/hooks/getAllPosts';
import React from 'react'

export const Posts = () => {

  const {data,isPending} = useGetPosts();
  console.log(data)
  return (
    <>
      {isPending && <div>Loading...</div>}
      <div>data</div>
    </>
  )
}

