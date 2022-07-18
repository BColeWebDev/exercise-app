import { useState } from 'react';
import { Pagination, Box, Typography } from '@mui/material';
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



    return (
        <>
            <Box className={`dashboard-body ${displayPages.length === 0 ? "" : " dashboard-body__grid"}`} sx={{ minHeight: "90%", minWidth: "100%" }}>
                {displayPages.length === 0 ?
                    <Box sx={{ display: "flex", justifyContent: "center", padding: ".75rem", alignItems: "center", height: "100%" }}>
                        <Typography variant="h4" component={"h3"} color="text.secondary">No Options 😔</Typography>
                    </Box>
                    :
                    displayPages
                }
            </Box>
            <Box sx={{ backgroundColor: "black", width: "100%", padding: "10px" }}>
                <Pagination count={pageCount - 1} page={pages} onChange={handleChange} size="medium" className='pagination' color='secondary' variant="outlined" shape="rounded" />
            </Box>
        </>
    );
}

export default PaginationControlled;
