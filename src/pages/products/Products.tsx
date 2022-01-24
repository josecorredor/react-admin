import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../components/Paginator';
import Wrapper from '../../components/Wrapper';
import { Product } from '../../models/products';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [last_page, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`/products?page=${page}`);
                setProducts(data.data);
                setLastPage(data.meta.last_page)
            }
        )();
    }, [page]);

    

    const del = async (id_product:number) => {
        if(window.confirm('Are you sure you want to delete this record?')){
            await axios.delete(`/products/${id_product}`);

            setProducts(products.filter((p: Product) => p.id_product !== id_product));
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                    <Link to="/products/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {products.map((p: Product) => {
                                return(
                                    <tr key={p.id_product}>
                                        <td>{p.id_product}</td>
                                        <td><img src={p.image} width="50" /></td>
                                        <td>{p.title}</td>
                                        <td>{p.description}</td>
                                        <td>{p.price}</td>
                                        <td width="10%">
                                            <div className="btn-group mr-2">
                                                    <Link to = {`/products/${p.id_product}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                                </div>
                                                <div className="btn-group mr-2">
                                                    <a href="#" className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => del(p.id_product)}
                                                    >Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            <Paginator page={page} last_page={last_page} pageChanged={setPage}/>    
        </Wrapper>
    );
};

export default Products;