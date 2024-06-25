import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createComponent } from '../api/component'; // import the createUser function from your API file

export default function Create() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const handleSubmit = () => {
        const component = {
            name,
            code,
        };

        createComponent(component)
            .then((res) => {
                console.log(res);
                window.alert("Component created successfully!!!");
            })
            .catch((error) => {
                console.error(error);
                console.log(component);
            });
    };

    return (
        <form>
            <h2 style={{ textAlign: 'center' }}>Create a new Component</h2>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <TextField
                    id="name-input"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    name="name"
                    required
                    sx={{ width: '50%' }}
                />
                <TextField
                    id="code-input"
                    label="Code"
                    variant="outlined"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    name="code"
                    required
                    multiline
                    rows={4}
                    sx={{ width: '50%' }}
                />
                <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                    Create Component
                </Button>
            </Box>
        </form>
    );
}
