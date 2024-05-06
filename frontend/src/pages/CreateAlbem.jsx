import { Alert, Button, FileInput, Label, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreateAlbem() {

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please Select An Image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/albem/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/albem/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (

    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Add Albem</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <Label>Albem Name</Label>
        <TextInput
            type='text'
            placeholder='Albem Name'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
        />
        <Label>Albem Content</Label>
        <TextInput
            type='text'
            placeholder='Albem Content'
            required
            id='content'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
        />
        <Label>Main Image</Label>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )
        }
        <Label>Image 1 URL</Label>
        <TextInput
            type='text'
            placeholder='Link For Image 1'
            required
            id='image1'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, image1: e.target.value })
            }
        />
        <Label>Image 2 URL</Label>
        <TextInput
            type='text'
            placeholder='Link For Image 2'
            required
            id='image2'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, image2: e.target.value })
            }
        />
        <Label>Image 3 URL</Label>
        <TextInput
            type='text'
            placeholder='Link For Image 3'
            required
            id='image3'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, image3: e.target.value })
            }
        />
        <Label>Image 4 URL</Label>
        <TextInput
            type='text'
            placeholder='Link For Image 4 '
            required
            id='image4'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, image4: e.target.value })
            }
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Add Albem
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}