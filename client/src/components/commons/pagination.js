import { useState } from 'react';
import { Pagination, Box, Paper } from '@mui/material';
import usePagination from '../hooks/usePagination';
import Exercise from '../page-components/Exercise';

const PaginationControlled = ({ data }) => {
    // state of pagination
    const [pages, setPages] = useState(1);

    // pages to display 
    const perPage = 20

    const pagination = usePagination(data, perPage);


    //current pages visit
    const pagesVisit = pages * perPage

    // round up a decimal place
    const pageCount = Math.ceil(data.length / perPage)


    const handleChange = (e, page) => {
        setPages(page);
        pagination.jump(page)
    };

    //Displaying pages dynamically
    const displayPages = data.slice(pagesVisit, pagesVisit + perPage).map(data => {
        return (<Box key={data.id} sx={{ height: "100%" }}><Exercise exercise={data} /></Box>)
    })



    return (<>
        <div className='dashboard-body dashboard-body__grid'>
            {displayPages}
        </div>
        <Paper elevation={4}>
            <Pagination count={pageCount} page={pages} onChange={handleChange} size="large" className='pagination' color='secondary' variant="outlined" shape="rounded" />

        </Paper>
    </>);
}

export default PaginationControlled;
