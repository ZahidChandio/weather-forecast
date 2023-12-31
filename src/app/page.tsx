'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { Provider, useDispatch, useSelector } from "react-redux";

import Weather from './components/Weather';
import Spinner from './components/Spinner';
import { fetchWeather } from "./redux/weather/action";
import { RootState } from "./redux/rootReducer";
import store from "./redux/store";

export default function Home() {
  const [city, setCity] = useState<string>('');
  const dispatch = useDispatch();
  const weatherReducer = useSelector((state: RootState) => state.weather);
  const weather = weatherReducer?.data || null;
  const loading = weatherReducer?.loading || false;
  const error = weatherReducer?.errors || null;
  
  const getWeather = async (e:FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    dispatch(fetchWeather(city));
    setCity('');
  }

  return (
    <Provider store={store}>
      <main className="">
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]"/>
        {/* Background Image */}
        <Image src="https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
          layout='fill' alt='background-image' className='object-cover'
        />
        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pb-0 p-2 sm:p-4 text-white z-10'>
          <form onSubmit={getWeather} className='flex justify-between gap-2 items-center w-full m-auto px-3 py-1.5 bg-transparent border border-gray-300 text-white rounded-xl'>
            <div className='w-full'>
              <input type="text" placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)} className='text-sm bg-transparent border-nono text-white p-2 rounded-md focus:outline-none h-full w-full'/>
            </div>
              <button type='submit' className="text-gray-400" title='search'> 
                <i className='fas fa-search'/>
              </button>
          </form>
        </div>
        {/* Weather */}
        { weather?.main && !loading && !error ? 
          <Weather weather={weather}/>
        :
        loading && 
          <div className='flex justify-center items-center w-full mt-12'>
            <Spinner />
          </div>
        }
        { error && city.length === 0 &&
        <div className='relative flex justify-center items-center w-full mt-12 z-[100]'>
          <p className='text-gray-300 font-semibold'>Oops! Could not fetch data. Try another city.</p>
        </div>
        } 
      </main>
    </Provider>
  )
}
