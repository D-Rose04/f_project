import './App.css';
import React, { useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import { UseLoadingContext } from './firebase/hooks/UseLoading'
import Router from './router'

export default function App() {
  const { loading, setLoading } = UseLoadingContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading ?
        <div className='loader'>
          <BounceLoader
            color={"var(--color-sblue-d)"}
            loading={loading}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader" />
        </div>
        : <Router />
      }
    </>
  )
}