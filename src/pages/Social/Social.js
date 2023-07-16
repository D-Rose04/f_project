import React, { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import Post from '../../components/app/Post/Post'

function Social() {
  const [setTitle, setSidebar, setSidebarCols]=useOutletContext()

  const postsExample = [
    {
      id: 1,
      user: {
        image: "https://images.placeholders.dev/?width=45&height=45",
        name: "Fulano de Tal",
        desc: 'Cat Owner'
      },
      time: new Date('2023-06-23T19:45:34Z'),
      postBody: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quam voluptatem illo corrupti. Earum esse placeat tempore autem fugit porro adipisci illum! Reprehenderit, eum harum. Necessitatibus incidunt harum laudantium totam',
      postImage: 'https://images.placeholders.dev/?width=900&height=900',
      likes: 356,
      dislikes: 14,
      comments: [
        {
          id: 'c-01',
          user: {
            image: 'https://images.placeholders.dev/?width=45&height=45',
            name: 'Marco Diaz',
          },
          time: new Date('2023-06-23T20:20:34Z'),
          commentBody: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quam voluptatem illo corrupti. Earum esse placeat tempore autem fugit porro adipisci illum! Reprehenderit, eum harum. Necessitatibus incidunt harum laudantium totam.',
          replies: [
            {
              id: 'c-01-r-01',
              user: {
                image: 'https://images.placeholders.dev/?width=45&height=45',
                name: 'Star Butterfly',
              },
              time: new Date('2023-06-23T20:30:34Z'),
              replyBody: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
            },
            {
              id: 'c-01-r-02',
              user: {
                image: 'https://images.placeholders.dev/?width=45&height=45',
                name: 'Eclipsa Butterfly',
              },
              time: new Date('2023-06-23T20:40:34Z'),
              replyBody: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum soluta eum, id nisi maxime iusto dolorem sed beatae, numquam blanditiis veniam est, itaque officia! Optio rem aliquam laborum facilis repellat.',
            },
          ]
        },
        {
          id: 'c-02',
          user: {
            image: 'https://images.placeholders.dev/?width=45&height=45',
            name: 'Jane Doe',
          },
          time: new Date('2023-06-23T21:00:34Z'),
          commentBody: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quam voluptatem illo corrupti. Earum esse placeat tempore autem fugit porro adipisci illum! ',
          replies: []
        },
      ]
    },
    {
      id: 2,
      user: {
        image: "https://images.placeholders.dev/?width=45&height=45",
        name: "Fulanito de Tal",
        desc: 'Dog Owner'
      },
      time: new Date('2023-06-23T18:45:34Z'),
      postBody: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit quam voluptatem illo corrupti. Earum esse placeat tempore autem fugit porro adipisci illum! Reprehenderit, eum harum. Necessitatibus incidunt harum laudantium totam',
      postImage: 'https://images.placeholders.dev/?width=1600&height=900',
      likes: 35,
      dislikes: 67,
      comments: []
    }
  ]

  useEffect(() => {
    setTitle("Social")
    setSidebarCols(2)
    setSidebar(<h5 className='text-dark'>Social sidebar</h5>)
  }, [])
  return (
    <>
      {postsExample.map(p => <Post key={p.id} post={p} />)}
      {/* <Post /> */}
    </>
  )
}

export default Social