import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Products() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(8);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:8000/api/products/list/?limit=4");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            }
        }
        getProducts();

    }, [])

    const Loading = () => {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </>
        );
    };

    const filterProduct = (act) => {
        const updatedList = data.filter((x) => x.active === act);
        setFilter(updatedList);
    }

    const handleMoreProducts = async () => {
        setLoaded(loaded + 4)

        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:8000/api/products/list/?limit=" + loaded);
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }
            return () => {
                componentMounted = false;

            }
        }
        getProducts();
    }

    const ShowProducts = () => {
        return (
            <>
                <div className='buttons d-flex justify-content-center mb-5 pb-5'>
                    <button className='btn btn-outline-dark' onClick={() => setFilter(data)}>
                        All
                    </button>
                    <button className='btn btn-outline-dark ms-2' onClick={() => filterProduct('category1')}>
                        Category 1
                    </button>
                </div>
                {filter.map((product) => {
                    return (
                        <div className='col-md-3 mb-4' key={product.id}>
                            <div className="card h-100 text-center p-4">
                                <img src={product.images} className="card-img-top" alt={product.name}
                                     height="250px"/>
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{product.name}</h5>
                                    <p className="card-text lead fw-bold ">${product.metadata.price}</p>
                                    <Link to={`/products/${product.id}`} className="btn btn-outline-dark">Add to
                                        Cart</Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        );
    };
    return (
        <div>
            <div className='container my-5 py-5 mt-0'>
                <div className='row'>
                    <div className='col-12 mb-5'>
                        <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
                        <hr/>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {loading ? <Loading/> : <ShowProducts/>}
                </div>
                <div className='row justify-content-center'>
                    <button className='btn btn-outline-dark mt-5 col-md-2' onClick={handleMoreProducts}>Load More
                    </button>
                </div>
            </div>
        </div>
    )
}
