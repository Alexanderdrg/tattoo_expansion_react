import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function UpdateProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    images: ''
  })

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
      setProduct(await response.json());
      setLoading(false);
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
    alert(product.name, product.description, product.images)
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
        <div className='col-md-4'>
          <img src={product.images} alt={product.images} height="400px" width="400px" />
        </div>
        <form className='col-md-6 mb-3'>
          <label className='form-label lead'>Name</label>
          <input type="text" className='form-control'
            onChange={onChangeName}
            value={product.name}
          />
          <label className='form-label lead mt-3'>Description</label>
          <input type="text" className='form-control'
            onChange={onChangeDescription}
            value={product.description}
          />
          <label className='form-label lead mt-3'>Image</label>
          <input type="text" className='form-control'
            onChange={onChangeImage}
            value={product.images}
          />
          <button type="submit" className="btn btn-outline-dark py-2 my-3" onClick={submitHandler}>Save Changes</button>
        </form>
      </div>
    </div>

  )
}
