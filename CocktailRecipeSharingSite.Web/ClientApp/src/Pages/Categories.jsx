import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {

    const [text, setText] = useState('');

    const [categories, setCategories] = useState([]);

    const [message, setMessage]=useState('')

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const { data } = await axios.get('/api/recipes/getcategories');
        setCategories(data);
    }

    const onTextChange = e => {
        setText(e.target.value);
        setMessage('');
    }

    const onSubmitClick = async e => {

        e.preventDefault();
        const { data } =await axios.post('/api/recipes/addcategory', { name: text });
        setText('');
        getCategories();
        setMessage(data)
    }


    return (
        <div className="container" style={{ marginTop: '80px' }} >
            <div className="container mt-5" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4 text-center">Categories</h2>
                {message === 'Succesfully Added!' && <h5 className='text-success'>{message}</h5>}
                {message === 'This Category already exists!' && <h5 className='text-danger'>{message}</h5>}
                <form className="mb-4">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Add new category" value={text} onChange={onTextChange}></input>
                        <button type="submit" className="btn btn-primary" onClick={onSubmitClick} disabled={text === ''}>Add</button>
                    </div>
                </form>
                <ul className="list-group shadow-sm">
                    {categories.map(c =>
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={c.id}>
                            {c.name}
                            <span className="badge bg-primary rounded-pill">{c.recipeCount}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Categories