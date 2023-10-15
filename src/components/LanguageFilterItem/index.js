import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, updateActiveLanguageId, isActive} = props
  const {id, language} = languageDetails
  const languageBtnClass = isActive ? 'inactive active' : 'inactive'

  const onClickLanguageItem = () => {
    updateActiveLanguageId(id)
  }

  return (
    <li>
      <div>
        <button
          onClick={onClickLanguageItem}
          className={languageBtnClass}
          type="button"
        >
          {language}
        </button>
      </div>
    </li>
  )
}

export default LanguageFilterItem
