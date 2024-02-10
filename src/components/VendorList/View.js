import React, { useState, useEffect } from 'react';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll,
} from 'firebase/storage';
import { storage } from '../../../src/config/firestore'; // Update with your Firestore config
import { useDropzone } from 'react-dropzone';

const View = ({ selectedEmployee, setIsViewing }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileMetadata, setFileMetadata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');

  const employeeFilesRef = ref(storage, `employee_files/${selectedEmployee.id}/`);

  useEffect(() => {
    const fetchEmployeeFiles = async () => {
      try {
        const response = await listAll(employeeFilesRef);
        const promises = response.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { name: item.name, ref: item, url };
        });
        Promise.all(promises).then((fileList) => {
          setFileMetadata(fileList);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching employee files:', error);
        setLoading(false);
      }
    };

    // Retrieve notes for the selected employee from localStorage
    const storedNotes = localStorage.getItem(`employee_notes_${selectedEmployee.id}`);
    if (storedNotes) {
      setNotes(storedNotes);
    }

    fetchEmployeeFiles();
  }, [selectedEmployee]);

  const handleBack = () => {
    setIsViewing(false);
  };

  const openFile = async (fileRef) => {
    const url = await getDownloadURL(fileRef);
    window.open(url, '_blank');
  };

  const removeFile = async (fileRefToDelete) => {
    await deleteObject(fileRefToDelete);
    setUploadedFile(null);

    const updatedFileMetadata = fileMetadata.filter((file) => file.ref !== fileRefToDelete);
    setFileMetadata(updatedFileMetadata);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const saveNotes = () => {
    localStorage.setItem(`employee_notes_${selectedEmployee.id}`, notes);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileRef = ref(employeeFilesRef, `${file.name}`);
      await uploadBytes(fileRef, file);

      const url = await getDownloadURL(fileRef);
      setUploadedFile({ name: file.name, url });
    },
  });

  return (
    <div className="vendor-details">
      <h2>Vendor Details</h2>
      {selectedEmployee && (
        <>
          {/* Employee details */}
          <p><strong>Client Name:</strong> {selectedEmployee.clientName}</p> 
          <p><strong>Company Name:</strong> {selectedEmployee.companyName}</p>
          <p><strong>Email:</strong> {selectedEmployee.email}</p> 
          <p><strong>Phone Number:</strong> {selectedEmployee.phoneNumber}</p> 
          <p><strong>Status:</strong> {selectedEmployee.status}</p> 
          <p><strong>Contract Start:</strong> {selectedEmployee.startDate}</p> 
          <p><strong>Contract End:</strong> {selectedEmployee.endDate}</p>
          
          {/* Uploaded file section */}
          {uploadedFile && (
            <div>
              <p>File uploaded: {uploadedFile.name}</p>
              <button onClick={() => openFile(employeeFilesRef.child(uploadedFile.name))}>
                Open File
              </button>
              <button onClick={() => removeFile(employeeFilesRef.child(uploadedFile.name))}>
                Remove File
              </button>
            </div>
          )}

          {/* Dropzone for file upload */}
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag 'n' drop a file here, or click to select a file</p>
            {uploadedFile && <p>File uploaded: {uploadedFile.name}</p>}
          </div>

          {/* Displaying existing files */}
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              fileMetadata.map((file, index) => (
                <div key={index}>
                  <button onClick={() => openFile(file.ref)}>Open File</button>
                  <button onClick={() => removeFile(file.ref)}>Delete File</button>
                  <p>{file.name}</p>
                </div>
              ))
            )}
          </div>

          {/* Notepad functionality */}
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Add notes for this employee..."
            rows={6}
            cols={50}
          />
          <button onClick={saveNotes}>Save Notes</button>

          {/* Back button */}
          <button onClick={handleBack} className="button muted-button">
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default View;
