import { useState } from "react";

function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    // display current paginated data
    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    //  Next paginated data
    function next() {
        setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
    }
    // previous paginated data
    function prev() {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    }
    // jump paginated page 
    function jump(page) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
    }
    //   return obj
    return { next, prev, jump, currentData, currentPage, maxPage };
}

export default usePagination;
