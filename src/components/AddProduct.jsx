import React, { useState } from 'react'

export default function AddProduct() {

    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState("");
    const [humanPrice, setHumanPrice] = useState("");
    const [price, setPrice] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:8000/api/sellers/list/", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    unit_amount: price,
                    images: images
                }),
            });
            const resJson = await res.json();
            if (res.status === 200) {
                setName("");
                setDescription("");
                setImages("");
                setPrice("");
                setMessage("Product created successfully");
                alert('Your Product has been created')
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className='container my-5 py-5 mt-0'>
                <div className='row'>
                    <div className='col-12 mb-5'>
                        <h1 className='display-6 fw-bolder text-center'>Add Product</h1>
                        <hr />
                    </div>
                </div>
                <div className='container'>
                    <div className="row justify-content-center">
                        <form className='col-md-6 mb-3' onSubmit={handleSubmit}>
                            <label className='form-label lead'>Name</label>
                            <input type="text" className='form-control' placeholder='Required'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className='form-label lead mt-3'>Description</label>
                            <input type="text" className='form-control'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label className='form-label lead mt-3'>Price</label>
                            <input type="text" className='form-control' placeholder='Required'
                                value={humanPrice}
                                onFocus={(e) =>
                                    setHumanPrice(price)
                                }
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                    setHumanPrice(e.target.value)
                                }

                                }
                                onBlur={(e) =>
                                    setHumanPrice(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(e.target.value))
                                }
                            />

                            <label className='form-label lead mt-3'>Image</label>
                            <input type="text" className='form-control'
                                value={images}
                                onChange={(e) => setImages([e.target.value])}
                            />
                            <button type="submit" className="btn btn-outline-dark py-2 my-3">Save Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
