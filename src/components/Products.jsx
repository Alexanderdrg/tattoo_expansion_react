import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

export default function Products() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:8000/api/products/list/");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter);
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
                <div className="col-md-3">
                    <Skeleton height={350}></Skeleton>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}></Skeleton>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}></Skeleton>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}></Skeleton>
                </div>
            </>
        );
    };

    const filterProduct = (cat) => {
        const updatedList = data.filter((x)=>x.category === cat);
        setFilter(updatedList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className='buttons d-flex justify-content-center mb-5 pb-5'>
                    <button className='btn btn-outline-dark' onClick={() => setFilter(data)}>
                        All
                    </button>
                    <button className='btn btn-outline-dark ms-2' onClick={() => filterProduct('another category')}>
                        Not available
                    </button>
                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className='col-md-3 mb-4'>
                                <div class="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.images} class="card-img-top" alt={product.name}
                                        height="250px" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-0">{product.name}</h5>
                                        <p class="card-text lead fw-bold ">${product.price}</p>
                                        <Link to="/products/${id}" class="btn btn-outline-dark">Add to Cart</Link>
                                    </div>
                                </div>
                            </div>
                        </>
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
                        <hr />
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}
