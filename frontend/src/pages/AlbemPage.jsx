import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AlbemCard from '../components/AlbemCard';

export default function AlbemPage() {
  
  const { albemSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [albem, setAlbem] = useState(null);
  const [recentAlbems, setRecentAlbems] = useState(null);

  useEffect(() => {
    const fetchAlbem = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/albem/getalbems?slug=${albemSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setAlbem(data.albems[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchAlbem();
  }, [albemSlug]);

  useEffect(() => {
    try {
      const fetchRecentAlbems = async () => {
        const res = await fetch(`/api/albem/getalbems?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentAlbems(data.albems);
        }
      };
      fetchRecentAlbems();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
    
    return (
      
      <main className='flex flex-col mx-auto sm:mx-auto sm:px-20 min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-full mx-auto lg:text-4xl'>
          {albem && albem.title}
        </h1>
        <span className='ml-auto mx-20'>{albem && new Date(albem.createdAt).toLocaleDateString()}</span>
        <hr class="border-b-1 border-gray-500 sm:mx-20 "/>

        <div className='p-3 border-slate-500 sm:mx-20 mx-auto text-xs'>
          
            <h2 className='text-xl mt-2 text-center font-serif max-w-full mx-auto lg:text-xl text-gray-500'>
              {albem && albem.content}
            </h2>
            
        </div>

        <div className='mx-auto flex'>
          <img
            src={albem && albem.image1}
            alt={albem && albem.title}
            className='p-1 max-h-[250px] w-auto object-cover'
          />
          <img
            src={albem && albem.image2}
            alt={albem && albem.title}
            className='p-1 max-h-[250px] w-auto object-cover'
          />
        </div>
        <div className='mx-auto flex '>
          <img
            src={albem && albem.image3}
            alt={albem && albem.title}
            className='p-1 max-h-[250px] w-auto object-cover'
          />
          <img
            src={albem && albem.image4}
            alt={albem && albem.title}
            className='p-1 max-h-[250px] w-auto object-cover'
          />
        </div>
       
        
        <div className='mx-auto p-10 sm:px-20 albem-content' dangerouslySetInnerHTML={{ __html: albem && albem.content }}></div>


        <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>New Albems...</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center mx-10'>
          {recentAlbems &&
            recentAlbems.map((albem) => <AlbemCard key={albem._id} albem={albem} />)}
        </div>
      </div>

      </main>
    );
  }