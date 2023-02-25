import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useDropzone } from 'react-dropzone';
import classes from './DropImage.module.css';
import Button from '@mui/material/Button';
import { getProperThumbnail, sliceName } from '../../utils/helpers';
import { useDispatch } from 'react-redux';
import { setImages } from '../store/complaintSlice';
import Image from 'next/image';


const DropImage = ({maximumImage}) => {
  const [myFiles, setMyFiles] = useState([]);  
const [hideDropzone,setHideDropzone] =useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    // print the state `myFiles` whenever it is updated:
 if(myFiles.length>=maximumImage) setHideDropzone(true)
 else setHideDropzone(false)
let img=[]

for(let image of myFiles)img.push(image.dataURL)

   if(myFiles.length>=1) dispatch(setImages(img));
  }, [myFiles,dispatch,maximumImage]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // acceptedFiles: array of accepted files (similar to event.target.files):
    acceptedFiles.forEach((file) => {
      // (file) is of type BLOB
      const reader = new FileReader(); // JavaScript built-in
      reader.onload = () => {
        // keep the previously stored files in the state,
        // and add to them the newly dropped ones.
     
          setMyFiles((prevState) => [
            ...prevState,
            { fileInfo: file, dataURL: reader.result },
          ]);
      };
 

      reader.readAsDataURL(file);

    });

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, 
    maxFiles: 5,
  });

  const handleDelete = (e, indexToBeDeleted) => {
    e.preventDefault();
    setMyFiles(myFiles.filter((file, index) => index !== indexToBeDeleted));
  };

  return (
    <Fragment>
      {!hideDropzone &&  <div className='w-full'>
        {' '}
        <div
          className='border-dashed border-2 border-gray-800 w-full mx-4 mx-auto h-32 bg-blue-200 justify-center items-center flex'
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive
            ? 'Drag Active'
            : `Drop or upload 1 file at a time here (max ${maximumImage} )`}
        </div>
      </div>}
      <div className='w-full '>
        {myFiles.map((file, index) => {
          return (
            <div key={index} className={classes.filePreviewItem}>
              <Image
                // src={file.dataURL}
                src={getProperThumbnail(file)}
                className={classes.fileThumbnail}
              height='50'
              width='50'
              alt='image'
              />
              <span className={classes.span}>
                {sliceName(file.fileInfo.name)}
              </span>
              {/* <span>{file.fileInfo.type}</span> */}
              <span className={classes.span}>
                {(file.fileInfo.size / 1024).toFixed(2)} KB
              </span>
              {/* <span>{getProperThumbnail(file.fileInfo.name)}</span> */}
              <Button
                variant='text'
                color='error'
                onClick={(event) => handleDelete(event, index)}
                className='bg-red-400'
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default DropImage;
