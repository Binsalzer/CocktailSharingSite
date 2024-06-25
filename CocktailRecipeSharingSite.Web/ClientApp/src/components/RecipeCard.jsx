import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Pages/Home.css';

const RecipeCard = ({ title, imageDataUrl, selectedCategory, categories, ingredients, steps, isPublic }) => {

    const getCategoryName = async categoryId => {
        if (categories!==null) {
            return categories.find(c => c.id === +selectedCategory).name;
        }
        return await axios.get(`/api/recipes/getcategoryname?categoryId=${categoryId}`).data;
    }

    return (
        <div className="card-body d-flex flex-column" style={{ maxHeight: '500px', overflow: 'hidden' }} >
            <h3 className="text-center" style={{ fontFamily: 'Arial, sans-serif', color: 'rgb(52, 58, 64)' }} >{title}</h3>
            <div className="d-flex justify-content-center mb-3">
                <img src={imageDataUrl} alt="Recipe Preview"
                    className="img-fluid" style={{ width: '150px', height: '150px', borderRadius: '10px', objecFit: 'cover' }} ></img>
            </div>
            <div style={{ flex: '1 1 auto', overflowY: 'auto' }} >
                {selectedCategory==='-1' &&<p>
                    <strong>Category:</strong>
                </p>}
                { selectedCategory!== '-1' &&<p>
                    <strong>Category: { categories !== null ? categories.find(c => c.id === +selectedCategory).name : axios.get(`/api/recipes/getcategoryname?categoryId=${selectedCategory}`).data}</strong>
                </p>}
                <p>
                    <strong>Ingredients:</strong>
                </p>
                <div className="mb-2">
                    {ingredients.map(i => <div className="d-flex align-items-center mb-1">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(40, 167, 69)', marginRight: '10px' }} >
                            <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                        </svg>
                        <span>{i}</span>
                    </div>)}
                </div>
                <p>
                    <strong>Steps:</strong>
                </p>
                <div className="mb-2">
                    {steps.map(s => <div className="d-flex align-items-center mb-1">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(23, 162, 184)', marginRight: '10px', marginTop: '5px' }} >
                            <path d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
                        </svg>
                        <span>{s}</span>
                    </div>)}
                </div>
                <p>
                    <strong>Public:</strong>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={!isPublic ? { color: 'rgb(220, 53, 69)' } : { color: 'rgb(40, 167, 69)' }} >
                        <path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path>
                    </svg>
                </p>
            </div>
        </div>
    );
};

export default RecipeCard;