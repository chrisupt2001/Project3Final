import Container from '../components/Container';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import ErrorAlert from '../components/ErrorAlert';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Breadcrumbs from '../components/Breadcrumbs';

const Book = () => {

    const params = useParams();

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
   
    const getData = async () => {
    
    const url = `https://api.matgargano.com/api/books/${params.id}`;
    
    setLoading(true);
        setError(false);
        try {
            const request = await fetch(url);
            const response = await request.json();
            setBook(response);

            console.log(response)
           
        } catch(e) {
            setError('Error: ' + e.message);
        } finally {
            setLoading(false);
        }    
    
    }
    
    useEffect(() => {
        getData();
    }, []);

    return (<Container>

        <Breadcrumbs></Breadcrumbs>
        
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {!error && loading && <div className="max-w-[230px]"><Skeleton count="10" /></div>}
        {!error && !loading && 

<div>
    <img src={book.imageURL}/>
    <h3><b>Author: </b>{book.author}</h3>
    <h3><b>Country of Origin: </b>{book.country}</h3>
    <h3><b>Book ID Number: </b>{book.id}</h3>
    <h3><b>Number of Pages: </b>{book.pages}</h3>
    <h3><b>Book Published By: </b>{book.publisher}</h3>
    <h3><b>Book Title: </b>{book.title}</h3>
    <h3><b>Book Year: </b>{book.year}</h3></div>}
    </Container>)
}

export default Book;