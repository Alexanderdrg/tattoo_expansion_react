import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';

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
        <div className="px-4 px-lg-5 mt-5">
            <Row className="gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {data &&
                    data.map(({ id, name, price, images }) => (
                        <Col className='mb-5' key={id}>
                            <Card style={{ width: '18rem', height: '25rem' }}>
                                <Card.Img src={images} style={{ width: '10rem' }} className="mx-auto mt-4"></Card.Img>
                                <Card.Body>
                                    <Card.Title className="text-center">{name}</Card.Title>
                                    <Card.Text className="text-center">{price}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="p-4 pt-0 border-top-0 bg-transparent">
                                    <Card.Text className="text-center">
                                        <Button variant="outline-primary">Add to cart</Button>
                                    </Card.Text>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
            </Row>
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