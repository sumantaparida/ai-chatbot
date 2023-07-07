import type { ReactNode } from 'react';
import React, { useState } from 'react';

import { uploadPdf } from './api';
import { UploadWrapper } from './style';

interface UploadProps {
  children?: ReactNode;
}

const Upload: React.FC<UploadProps> = props => {
  const [file, setFile] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPhoneNumber(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (file && phoneNumber) {
      setIsLoading(true);

      try {
        await uploadPdf(file, phoneNumber);
        console.log('Upload successful');
        // Perform any additional actions or handle success state
      } catch (error) {
        console.error(error);
        // Handle error state
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <UploadWrapper className="bg-gray-900">
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input title="file" type="file" accept=".pdf" onChange={handleFileChange} />
        <input title="phn number" type="tel" placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange} />
        <button type="submit" disabled={!file || !phoneNumber || isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {props.children}
    </UploadWrapper>
  );
};

export default Upload;
