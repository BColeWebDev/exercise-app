import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
const Spinner = () => {
    return (
        <div className='loadingSpinnerContainer'>
            <CircularProgress />
        </div>

    );
}

export default Spinner;