

import Layout from '@/components/layout';
import { useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Products() {
    const api_link = 'https://fakestoreapi.com/products'
    const [product, setproduct] = useState([])
    fetch(api_link).then(res => res.json()).then(data => setproduct(data))

    const columns = [
        {
            name: "Title",
            title: "title",
            selector: row => row.title
        }, 
        {
            name: "Price",
            price: "price",
            selector: row => row.price
        }, 
        {
            name: "Description",
            description: "description",
            selector: row => row.description
        },
        {
            name: "Images",
            images: "images",
            selector: row => <img src={row.image} width={50} height={50} />
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <button
                        onClick={() =>
                            alert("Can not Edit now!")
                        }
                        className="btn btn-primary me-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() =>
                            alert("Can not Delete now!")
                        }
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </>
            ),
        },
    ]

    function handleFilter(event) {
        const newData = product.filter((row) => {
            return row.title.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setproduct(newData);
    }

    return (
        <Layout products>

            <div class="container">
                <DataTable columns={columns} data={product}
                    fixedHeader
                    highlightOnHover
                    title="Product listing"
                    pagination
                    actions={
                        <div className="text-end">
                            <input
                                type="text"
                                className="rounded border-1"
                                style={{
                                    padding: "10px",
                                }}
                                placeholder="Search products"
                                onChange={handleFilter}
                            ></input>
                        </div>
                    }
                />
            </div>

        </Layout>
    )
}