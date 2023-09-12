import React  from 'react'
import {useParams} from 'react-router-dom'

import { DUMMY_POSTS } from '../../DummyDatas'
import ViewPostAndComments from '../components/ViewPosts/ViewPostAndComments'
import MainNavigation from '../../shared/components/Navigation/MainNavigation'

function ViewPosts() {

    const id= useParams().postId
  const loadedPost = DUMMY_POSTS.filter(post => post.postId === id)

  return (
    <React.Fragment>
      <MainNavigation />
      <ViewPostAndComments items={loadedPost}/>
    </React.Fragment>
  )
}

export default ViewPosts
