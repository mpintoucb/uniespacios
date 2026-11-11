import './FilterSummary.css'

function FilterSummary({ date, from, to, spaceType }) {
  const displayDate = date.split('-').reverse().join('/')

  return (
    <div className="filter-summary">
      {displayDate} · {from}–{to} · {spaceType}
    </div>
  )
}

export default FilterSummary
