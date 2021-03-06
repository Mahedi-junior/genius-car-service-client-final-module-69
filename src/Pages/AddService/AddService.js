import React from 'react';
import { useForm } from "react-hook-form";


const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data)
        const url = `https://young-falls-41187.herokuapp.com/service/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
    };


    return (
        <div className='w-50 mx-auto mt-3'>
            <h2 className='text-center'>Please add a Service</h2>
            <form className='d-flex flex-column ' onSubmit={handleSubmit(onSubmit)}>
                <input className='mb-2' placeholder='Name' {...register("name")} />
                <input className='mb-2' placeholder='Price' type="number" {...register("price")} />
                <input className='mb-2' placeholder='Photo URL' type="text" {...register("img")} />

                <textarea className='mb-2' placeholder='Description' {...register("description", { required: true, maxLength: 50 })} />

                <input type="submit" value="Add Service" />
            </form>
        </div>
    );
};

export default AddService;