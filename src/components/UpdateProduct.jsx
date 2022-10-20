import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';


export default function UpdateProduct() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(id);

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
          <p className='lead'>
            Name
          </p>
          <div class="input-group mb-3">
            <input type="text" class="form-control" defaultValue={product.name} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <p className='lead mt-4'>Description</p>
          <div class="input-group mb-3">
            <input type="text" class="form-control" defaultValue={product.description} aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <a href={product.payment_link} target="_blank" rel="noreferrer" className='btn btn-outline-dark px-3 py-2'>
            Save changes
          </a>
        </div>
      </>
    )
  }
  return (
    <div>
      <div className='container my-5 py-5 mt-0 mb-0'>
        <div className='row'>
          <div className='col-12 mb-0'>
            <h1 className='display-6 fw-bolder text-center'>Update this product</h1>
            <hr />
          </div>
        </div>
      </div>
      <div className='container py-2'>
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  )
}
