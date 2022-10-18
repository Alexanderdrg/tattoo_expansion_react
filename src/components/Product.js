import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../assets/styles/Product.css';

export default function Product() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/products/list/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((currentData) => {
                setData(currentData);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {data &&
                    data.map(({ id, name, price, images }) => (
                        <div className="col mb-5">
                            <div className="card h-100">
                                <img className="card-img-top" src={images} alt="..." />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{name}</h5>
                                        {price}
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to Cart</a></div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    </section>


    // return <div className="Product">
    //     <h1>Stripe API Products</h1>
    //     {loading && <div>A moment please...</div>}
    //     {error && (
    //         <div>{`There is a problem fetching the post data - ${error}`}</div>
    //     )}

    //     <ul>
    //         {data &&
    //             data.map(({ id, name, description }) => (
    //                 <div className="card" key={id}>
    //                     <h3>{name}</h3>
    //                     <p>{description}</p>
    //                 </div>
    //             ))}
    //     </ul>
    // </div>;
}