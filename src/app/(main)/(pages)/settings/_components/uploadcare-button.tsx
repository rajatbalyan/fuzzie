'use client';
import React, { useState } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import Image from 'next/image';

type Props = {
  onUpload: (url: string) => void;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleUpload = (fileInfo: any) => {
    const imageUrl = fileInfo.cdnUrl; // Get the uploaded image URL
    setUploadedImageUrl(imageUrl); // Set the URL in the state
    onUpload(imageUrl); // Pass it to the parent component if needed
  };

  return (
    <div>
      {uploadedImageUrl ? (
        <div>
          <Image src={uploadedImageUrl} alt="Uploaded Image" width={300} height={300} />
          <p>Image Uploaded Successfully!</p>
        </div>
      ) : (
        <FileUploaderRegular
          sourceList="local, url, camera, dropbox"
          classNameUploader="uc-light"
          pubkey="27bb2b1793b4729d5c69"
        />
      )}
    </div>
  );
};

export default UploadCareButton;
