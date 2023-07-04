import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { callAPI } from '../utils/CallApi'
import { ProductDetails, ProductRatings } from './'

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const getProduct = () => { 
        callAPI(`data/products.json`)
        .then((productResults) => {
            //setProduct: used to update product
            setProduct(productResults[id]);
        });
     }

    useEffect(() => {
        getProduct();
    }, []);

    // Safety check
    if (!product?.title) return <h1>Loading Product ...</h1>;

  return ( product &&
    <div className='h-screen bg-amazonclone-background'>
        <div className='min-w-[1000px] max-w-[1500px] m-auto bg-orange-400'>
            <div className='grid grid-cols-10 gap-2'>
                {/* Left */}
                <div className='col-span-3 p-8 rounded bg-white m-auto'>
                    <img src={`${product.image}`}/>
                </div>
                {/* Middle */}
                <div className='col-span-5 p-4 rounded bg-white divide-y divide-gray-400'>
                    <div className='mb-3'>
                        <ProductDetails product={product} ratings={true} />
                    </div>
                    <div></div>
                </div>
                {/* Right */}
                <div className='col-span-2 bg-green-400'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductPage