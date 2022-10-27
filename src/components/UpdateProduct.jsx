import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    images: ''
  })

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
      setProduct(await response.json());
    }

    getProduct();
  }, []);

  const onChangeName = e => {
    setProduct({
      name: e.target.value,
      description: product.description,
      images: product.images
    })
  }

  const onChangeDescription = e => {
    setProduct({
      name: product.name,
      description: e.target.value,
      images: product.images
    })
  }

  const onChangeImage = e => {
    setProduct({
      name: product.name,
      description: product.description,
      images: [
        e.target.value
      ]
    })
  }

  const submitHandler = (e) => {
    alert('Your product has been updated')
    e.preventDefault();
    const response = axios.put(`http://127.0.0.1:8000/api/sellers/${id}/`, {
      name: product.name,
      description: product.description,
      images: product.images
    })
    console.log(response.json())
  }

  return (
    <div className='container my-5'>
      <div className="row py-4">
        <div className='col-md-5'>
          <img src={product.images} alt={product.images} height="400px" width="400px" />
        </div>
        <form className='col-md-6 mb-3'>
          <label className='form-label lead'>Name</label>
          <input type="text" className='form-control'
            onChange={onChangeName}
            value={product.name}
          />
          <label className='form-label lead mt-3'>Description</label>
          <textarea type="text" className='form-control' rows="3"
            onChange={onChangeDescription}
            value={product.description}
          />
          <label className='form-label lead mt-3'>Image</label>
          <input type="text" className='form-control'
            onChange={onChangeImage}
            value={product.images}
          />
          <Link to="/products/sellers" type="button" className="btn btn-outline-dark py-2 my-3">Discard Changes</Link>
          <button type="submit" id='liveAlertBtn' className="btn btn-outline-dark py-2 my-3 ms-2" onClick={submitHandler}>Save Changes</button>
        </form>
      </div>
    </div>

  )
}
