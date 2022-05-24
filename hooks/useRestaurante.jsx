import { useContext } from 'react'
import RestauranteContext from '../context/RestauranteProvider'

const useRestaurante = () => {
  return useContext(RestauranteContext)
}

export default useRestaurante