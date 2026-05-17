import React, { useState } from 'react'
import './Add.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'

const Add = () => {

    const url = import.meta.env.VITE_BACKEND_URL;

    const [image, setImage] = useState(false)

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    // INPUT CHANGE
    const onChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // FORM SUBMIT
    const onSubmitHandler = async (event) => {

        event.preventDefault();

        // CHECK IMAGE
        if (!image) {

            toast.error("Please upload image")

            return;
        }

        // FORM DATA
        const formData = new FormData();

        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("image", image)

        try {

            // SEND REQUEST
            const response = await axios.post(
                `${url}/api/food/add`,
                formData
            )

            // SUCCESS
            if (response.data.success) {

                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                })

                setImage(false)

                toast.success(response.data.message)

            }

            // FAILED
            else {

                toast.error(response.data.message)
            }

        }

        catch (error) {

            console.log(error)

            toast.error("Server Error")
        }
    }

    return (

        <div className='add'>

            <form
                className="flex-col"
                onSubmit={onSubmitHandler}
            >

                {/* IMAGE */}
                <div className="add-img-upload flex-col">

                    <p>Upload image</p>

                    <label htmlFor='image'>

                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : assets.upload_area
                            }
                            alt=''
                        />

                    </label>

                    <input
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                        type='file'
                        id='image'
                        hidden
                        required
                    />

                </div>


                {/* PRODUCT NAME */}
                <div className="add-product-name flex-col">

                    <p>Product Name</p>

                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type='text'
                        name='name'
                        placeholder='type here'
                        required
                    />

                </div>


                {/* DESCRIPTION */}
                <div className="add-product-description flex-col">

                    <p>Product Description</p>

                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name='description'
                        rows="6"
                        placeholder='write content here'
                        required
                    ></textarea>

                </div>


                {/* CATEGORY + PRICE */}
                <div className="add-category-price">

                    <div className="add-category flex-col">

                        <p>Product Category</p>

                        <select
                            onChange={onChangeHandler}
                            name='category'
                        >

                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>

                        </select>

                    </div>


                    {/* PRICE */}
                    <div className="add-price flex-col">

                        <p>Product Price</p>

                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type='number'
                            name='price'
                            placeholder='$20'
                            required
                        />

                    </div>

                </div>


                {/* BUTTON */}
                <button
                    type='submit'
                    className='add-btn'
                >
                    ADD
                </button>

            </form>

        </div>
    )
}

export default Add