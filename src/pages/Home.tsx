import { useState, useEffect } from 'react';
import { getDataListAsync } from '../store/slices/api.slice';
import { useDispatch, useTypedSelector } from '../store/store';


const Home = () => {

  const { isLoading, data } = useTypedSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataListAsync());
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          test
        </div>
      )}
    </>
  )
};

export default Home;