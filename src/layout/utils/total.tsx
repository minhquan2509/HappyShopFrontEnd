import { FunctionComponent } from 'react'


import dinhdangso from './dinhdangso'

interface Props {
  amount: number
}

export const TotalPrice: FunctionComponent<Props> = ({ amount }) => {
return <div className="container">Total: {dinhdangso(amount)}</div>
}