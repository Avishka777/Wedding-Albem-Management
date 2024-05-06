import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import PdfDocument from './PdfDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';

const DashAlbems = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userAlbems, setUserAlbems] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [albemIdToDelete, setAlbemIdToDelete] = useState('');

  useEffect(() => {
    const fetchAlbems = async () => {
      try {
        const res = await fetch(`/api/albem/getalbems?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserAlbems(data.albems);
          if (data.albems.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchAlbems();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userAlbems.length;
    try {
      const res = await fetch(
        `/api/albem/getalbems?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserAlbems((prev) => [...prev, ...data.albems]);
        if (data.albems.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteAlbem = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/albem/deletealbem/${albemIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserAlbems((prev) =>
          prev.filter((albem) => albem._id !== albemIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='w-full p-5 table-auto overflow-x-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userAlbems.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Albem Image</Table.HeadCell>
              <Table.HeadCell>Albem Title</Table.HeadCell>
              <Table.HeadCell>Albem Content</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            {userAlbems.map((albem) => (
              <Table.Body className='divide-y' key={albem._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(albem.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/albem/${albem.slug}`}>
                      <img src={albem.image} alt={albem.title} className='w-20 h-10 object-cover bg-gray-500' />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/albem/${albem.slug}`}>
                      {albem.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{albem.content}</Table.Cell>
                  <Table.Cell>
                    <span onClick={() => { setShowModal(true); setAlbemIdToDelete(albem._id); }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-albem/${albem._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              Show More...
            </button>
          )}
        </>
      ) : (
        <p>You Have No Albems Yet.</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are You Sure You Want To Delete This Albem?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteAlbem}>
                Yes, I'm Sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <PDFDownloadLink document={<PdfDocument data={userAlbems} />} fileName="Albems.pdf">
  {({ blob, url, loading, error }) => (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
      disabled={loading}
    >
      {loading ? 'Loading document...' : 'Download PDF'}
    </button>
  )}
</PDFDownloadLink>

    </div>
  );
}

export default DashAlbems;
