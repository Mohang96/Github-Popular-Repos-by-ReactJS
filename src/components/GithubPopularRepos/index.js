import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    reposList: [],
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getReposList()
  }

  getReposList = async () => {
    this.setState({status: apiStatusConstants.inProgress})

    const {activeLanguageId} = this.state
    const githubPopularReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(githubPopularReposApiUrl)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const initialReposList = data.popular_repos
      const finalReposList = initialReposList.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({
        status: apiStatusConstants.success,
        reposList: finalReposList,
      })
    } else if (response.ok === false) {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderInProgressView = () => (
    <div data-testid="loader" className="in-progress-view">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {reposList} = this.state

    return (
      <div className="success-view-container">
        <ul className="success-view-repos-list">
          {reposList.map(eachRepo => (
            <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
    </div>
  )

  renderReposList = () => {
    const {status} = this.state

    switch (status) {
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  updateActiveLanguageId = id => {
    this.setState({activeLanguageId: id}, this.getReposList)
  }

  renderLanguageFilters = () => {
    const {activeLanguageId} = this.state

    return (
      <ul className="language-options-list">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageDetails={eachLanguage}
            updateActiveLanguageId={this.updateActiveLanguageId}
            isActive={eachLanguage.id === activeLanguageId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="background-container">
        <h1 className="heading">Popular</h1>
        <div className="language-fliters-container">
          {this.renderLanguageFilters()}
        </div>
        {this.renderReposList()}
      </div>
    )
  }
}

export default GithubPopularRepos
