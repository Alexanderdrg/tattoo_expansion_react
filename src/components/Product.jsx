import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/action';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addToCart(product))
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
            setProduct(await response.json());
            setLoading(false);
        }

        getProduct();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-6">
                    <Skeleton height={400}></Skeleton>
                </div>
            </>
        )
    }

    const ShowProduct = () => {
        return (
            <>
                <div className='col-md-4'>
                    <img src={product.images} alt={product.name} height="400px" width="400px" />
                </div>
                <div className='col-md-6'>
                    {/* <h4 className='text-uppercase text-black-50'>
                    {product.category}
                </h4> */}
                    <h1 className='display-5'>
                        {product.name}
                    </h1>
                    <h3 className='display-6 fw-bold my-4'>
                        $ {product.price}
                    </h3>
                    <p className='lead'>{product.description}</p>
                    <button className='btn btn-outline-dark px-4 py-2'

                        onClick={() => addProduct(product)}>
                        Add to Cart
                    </button>
                    <Link to="/cart" className='btn btn-outline-dark ms-2 px-3 py-2'>
                        Go to Cart
                    </Link>
                    <a href={product.payment_link} target="_blank" rel="noreferrer" className='btn btn-outline-dark px-3 py-2 ms-2'>
                        Buy Now!
                    </a>
                </div>
            </>
        )
    }
    return (
        <div>
            <div className='container py-5'>
                <div className="row py-4">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}
