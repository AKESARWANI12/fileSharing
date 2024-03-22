import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { ChatState } from '../Context/ChatProvider';

const Users = () => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const toast = useToast();
    const { user } = ChatState();
    const handleSearch = async () => {   
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data}= await axios.get(`http://localhost:5000/api/user?search=${search}`, config);          
            // const { data } = await axios.get(
            //     `${process.env.REACT_APP_BACKEND_URL}/api/user?search=${search}`,
            //     config
            // );
            
            setSearchResult(data);
            setLoading(false);
        } catch (error) {
            console.error('Error occurred while searching users:', error);
            setLoading(false);
            toast({
                title: 'Error occurred!',
                description: 'Failed to load the search results',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left',
            });
        }
    };

    return (
      <div className="container mt-5">
    <h1 className="text-center mb-1" style={{ fontSize: '3rem' }}>🔍 Search Users</h1>
    <div className="input-group mb-1" style={{ borderColor: 'white', borderWidth: '3px' }}>
    <input
        type="text"
        className="form-control"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ backgroundColor: 'darkgray', borderColor: 'blue', borderWidth: '3px' ,color: 'black'}}
    />
  <button
    className="btn btn-outline-secondary"
    type="button"
    onClick={handleSearch}
    style={{
        borderColor: 'blue',
        borderWidth: '3px',
        color: 'black'
    }}
>
    Search
</button>
</div>

          <div className="text-center">
              {loading && <p>Loading...</p>}
              {searchResult.length > 0 && (
                <table className="table table-bordered" style={{ borderWidth: '3px', borderColor: 'black' }}>
    <thead>
        <tr>
            <th style={{ borderWidth: '2px', borderColor: 'gray' }}>#</th>
            <th style={{ borderWidth: '2px', borderColor: 'gray' }}>Name</th>
            <th style={{ borderWidth: '2px', borderColor: 'gray' }}>Email</th>
            <th style={{ borderWidth: '2px', borderColor: 'gray' }}>Joined At</th>
        </tr>
    </thead>
    <tbody>
        {searchResult.map((user, index) => (
            <tr key={user._id}>
                <td style={{ borderWidth: '2px', borderColor: 'gray' }}>{index + 1}</td>
                <td style={{ borderWidth: '2px', borderColor: 'gray' }}>{user.name}</td>
                <td style={{ borderWidth: '2px', borderColor: 'gray' }}>{user.email}</td>
                <td style={{ borderWidth: '2px', borderColor: 'gray' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
        ))}
    </tbody>
</table>


              )}
              {searchResult.length === 0 && !loading && <p className="text-2xl">No users found.</p>}
          </div>
      </div>
  );
};

export default Users;

