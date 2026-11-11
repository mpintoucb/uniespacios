import './FormField.css'
 
function FormField({ label, type = 'text', defaultValue, options, value, onChange }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {options ? (
        <select className="field__input" value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          className="field__input"
          type={type}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
      )}
    </label>
  )
}
 
export default FormField