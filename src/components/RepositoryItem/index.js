import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repoDetails

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="title">{name}</h1>
      <div className="features-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="features-icon"
        />
        <p className="features-count">{starsCount} stars</p>
      </div>
      <div className="features-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="features-icon"
        />
        <p className="features-count">{forksCount} forks</p>
      </div>
      <div className="features-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="features-icon"
        />
        <p className="features-count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
