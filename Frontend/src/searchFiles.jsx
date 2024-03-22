import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchFiles = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`/api/files?search_query=${searchQuery}`);
            setFiles(response.data.files);
        } catch (error) {
            console.error('Fetch files error:', error);
            setError('An error occurred while fetching files');
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [searchQuery]);

    return (
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search files" />
            {error && <p>{error}</p>}
            <ul>
                {files.map((file) => (
                    <li key={file._id}>{file.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchFiles;
