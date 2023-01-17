import { useState } from "react"

export const useCountry = (name) => {
  const [value,setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return {
    type : 'text',
    value,
    onChange
  }
}