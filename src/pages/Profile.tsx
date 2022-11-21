import {useState, useEffect} from 'react';
import userService from '../services/user.service';
import { useTypedSelector } from '../store/store';
import { setSession } from '../utils';

const Profile = () => {
  const { user } = useTypedSelector(state => state.auth);
  const [customerData, setCustomerData] = useState<any>(null);

  const getCustomerDetail = () => {
    userService.getCustomerDetail().then((res) => {
      console.log(res.data);
      if (res.data.status) {
        setCustomerData(res.data.data);
      }
    })
  }

  useEffect(() => {
    if (user?.accessToken) {
      setSession(user.accessToken);
      getCustomerDetail();
    }
  }, []);
  return(
    <div>
      <p>{customerData?.id}</p>
      <p>{customerData?.status}</p>
      <p>{new Date(customerData?.current_period_end * 1000).toString()}</p>
      <p>{new Date(customerData?.cancel_at * 1000).toString()}</p>
      <p>{new Date(customerData?.canceled_at * 1000).toString()}</p>
      <p>{new Date(customerData?.created * 1000).toString()}</p>
      <p>{new Date(customerData?.start_date * 1000).toString()}</p>
      <p>{new Date(customerData?.current_period_start * 1000).toString()}</p>
      <p>{customerData?.id}</p>
      <p>{customerData?.id}</p>
      <p>{customerData?.id}</p>
      <p>{customerData?.id}</p>
      <p>{customerData?.id}</p>
    </div>
  )
}

export default Profile;