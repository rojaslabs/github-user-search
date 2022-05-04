import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import UserCard from '../components/UserCard';
import LoadingPage from '../components/LoadingPage';

const Home = () => {

    const [data, setData] = useState()
    const [query, setQuery] = useState('')
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(30);
    const [isLoading, setIsLoading] = useState(false);

    const URL = `https://api.github.com/search/users?q=${query}&page=${currentPage}&per_page=${perPage}`;

    const getUsers = () => {
        setIsLoading(true)
        axios.get(URL)
            .then((response) => {
                setIsLoading(false)
                setData(response.data)
                setPageCount(Math.ceil(response.data.total_count / perPage))
            })
            .catch((error) => {
                console.log('Error', error);
            })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        getUsers()
    }

    function handlePageClick(selectedObject) {
        setCurrentPage(selectedObject.selected + 1);
    }

    useEffect(() => {
        data && getUsers()
    }, [currentPage])

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name="search" value={query} placeholder='Search GitHub' onChange={(e) => setQuery(e.target.value)} />
                <input type="number" name="items" min={1} max={100} value={perPage} onChange={(e) => setPerPage(e.target.value)} />
                <button type="submit" disabled={query.length < 1}>Search</button>
            </form>
            {data ? <p className='results'>{data?.total_count} repository result(s), {pageCount} page(s)</p> :
            <p className='warning'><strong>Important:</strong> Due to API restrictions, only the first 1,000 requests are available, however, paging is done based on the total data returned by the API (total_count). The number of requests is also limited to 5,000 per hour, returning error 403 when it is exceeded.</p>}
            {!isLoading ? data?.items.map((data, i) => (<UserCard key={i} user={data} />)) : <LoadingPage />}
            {data ? (
                <ReactPaginate
                    pageCount={pageCount}
                    pageRange={2}
                    marginPagesDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    breakClassName={'page'}
                    nextLinkClassName={'page'}
                    pageClassName={'page'}
                    disabledClassName={'disabled'}
                    activeClassName={'active'}
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                />
            ) : null}
        </div>
    );
}

export default Home;