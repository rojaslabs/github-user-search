import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import UserCard from '../components/UserCard';

const Home = () => {

    const [data, setData] = useState()
    const [query, setQuery] = useState('')
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(30);

    const URL = `https://api.github.com/search/users?q=${query}&page=${currentPage}&per_page=${perPage}`;


    const getUsers = () => {
        axios.get(URL)
            .then((response) => {
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
            {data && <p className='results'>{data.total_count} repository result(s), {pageCount} page(s)</p>}
            {data?.items.map((data, i) => (
                <UserCard key={i} user={data} />
            ))}
            {data && (
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
                />
            )}
        </div>
    );
}

export default Home;