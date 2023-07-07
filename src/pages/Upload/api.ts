export const uploadPdf = async (file: File, phoneNumber: string): Promise<void> => {
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('phoneNumber', phoneNumber);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload PDF');
    }

    // You can handle the response from the backend here if needed
  } catch (error) {
    throw new Error('Failed to upload PDF');
  }
};
