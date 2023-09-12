import React, { useCallback, useContext, useEffect, useState} from 'react'
import MainNavigation from '../../shared/components/Navigation/MainNavigation'
import AllOrders from '../components/OrderHistory/AllOrders'
import { AuthContext } from '../../shared/contexts/AuthContext'
import axios from 'axios'

function OrderHistory() {

    const [allOrders, setAllOrders] = useState(null);
    const auth=useContext(AuthContext)

    const getAllOrders = useCallback(() => {
        axios
          .get(
            process.env.REACT_APP_BACKEND_URL +
              `/users/all-orders/${auth.userData.userId}`
          )
          .then((res) => {
            setAllOrders(res.data)
          })
    },[auth])



    useEffect(() => {
      getAllOrders()
    }, [getAllOrders])

    return (
      <React.Fragment>
            <MainNavigation />
            {allOrders &&
            <AllOrders orders={ allOrders } />
            }
      </React.Fragment>
    )
}

export default OrderHistory
