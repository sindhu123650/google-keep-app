import { useContext, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';
import axios from 'axios';

// Styled components
const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`;

// Archive Component
const Archive = ({ archive }) => {
    const { archiveNotes, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);

    const unArchiveNote = (archive) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        setAcrchiveNotes(updatedNotes);
        setNotes(prevArr => [archive, ...prevArr]);
    };

    const deleteNote = (archive) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        setAcrchiveNotes(updatedNotes);
        setDeleteNotes(prevArr => [archive, ...prevArr]);
    };

    return (
        <StyledCard>
            
            <CardContent>
                <Typography>{archive.heading}</Typography>
                <Typography>{archive.text}</Typography>
            </CardContent>
            <CardActions>
                <Unarchive fontSize="small" style={{ marginLeft: 'auto' }} onClick={() => unArchiveNote(archive)} />
                <Delete fontSize="small" onClick={() => deleteNote(archive)} />
            </CardActions>
        </StyledCard>
    );
};

// ArchiveNotes Component
const ArchiveNotes = () => {
    const { archiveNotes, setArchiveNotes } = useContext(DataContext);

    useEffect(() => {
        const fetchArchiveNotes = async () => {
            const response = await axios.get('/api/archive');
            setArchiveNotes(response.data);
        };

        fetchArchiveNotes();
    }, [setArchiveNotes]);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Typography variant="h6">Trash Notes - Deleted notes in the last 30 days</Typography>
                <Grid container>
                    {archiveNotes.map(archive => (
                        <Grid item key={archive.id}>
                            <Archive archive={archive} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default ArchiveNotes;
