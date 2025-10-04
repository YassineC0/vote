import React, { useEffect } from 'react';
import axios from 'axios';

function TestAPI() {
    useEffect(() => {
        axios.get('http://localhost:8080/api/voters') // Update with your backend endpoint
            .then(response => {
                console.log('API Response:', response.data);
            })
            .catch(error => {
                console.error('Error connecting to backend:', error);
            });
    }, []);

    return <div>Check the console for the API response.</div>;
}

export default TestAPI;
