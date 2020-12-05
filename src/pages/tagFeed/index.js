import React, { useEffect } from 'react'
import {stringify} from 'query-string'

import useFetch from '../../hooks/useFetch'
import Feed from '../../components/Feed'
import Pagination from '../../components/Pagination'
import {getPaginator, limit} from '../../utils'
import PopularTags from '../../components/PopularTags'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import FeedToggler from '../../components/FeedToggler'

const TagFeed = ({location, match}) => {
  const tagName = match.params.slug
  const {offset, currentPage} = getPaginator(location.search)
  const stringifiedParams = stringify({
    limit,
    offset,
    tag: tagName
  })
  const apiUrl = `/articles?${stringifiedParams}`
  const currentUrl = match.url
  const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)

  useEffect(() => {
    doFetch()
  }, [currentPage, doFetch, tagName])

  return (
    <div className="home-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={tagName} />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={currentUrl}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagFeed
