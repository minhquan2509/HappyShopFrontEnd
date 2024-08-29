import { FunctionComponent, useState } from 'react'

export type Operation = 'decrease' | 'increase'

interface Props {
  removeProductCallback: (productId: number) => void
  handleUpdateQuantity: (productId: number, operation: Operation) => void
  productId: number
}


export const Quantifier: FunctionComponent<Props> = ({ removeProductCallback, handleUpdateQuantity, productId }) => {
  const [value, setValue] = useState<number>(1)

  const reduce = ():void => {
    handleUpdateQuantity(productId, 'decrease')

    setValue(prevState => {
      const updatedValue = prevState - 1
      if (updatedValue === 0) {
        removeProductCallback(productId)
      }
      return updatedValue
    })
  }

  const increase = ():void => {
    handleUpdateQuantity(productId, 'increase')
    setValue(prevState => prevState + 1)
  }

  return (
    <div className="container" >
      <input type="button" value="-" className="btn btn-success" onClick={reduce} />
      <input type="number"
             step="1"
             max=""
             min={0}
             value={value}
             onChange={e => setValue(parseInt(e.target.value))}
              />
      <input type="button" value="+" className="btn btn-success" onClick={increase} />
    </div>
  )
}