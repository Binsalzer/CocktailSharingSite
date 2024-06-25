import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


const AddRecipe = () => {

    const [title, setTitle] = useState('')

    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('-1');

    const [ingredients, setIngredients] = useState(['']);

    const ingredientElements = [];

    for (let i = 0; i < ingredients.length; i++) {
        ingredientElements.push(<input
            type="text"
            className="form-control mb-2"
            key={i}
            value={ingredients[i]}
            onChange={(e) => OnIngredientChange(i, e)}>
        </input>)
    }

    const [steps, setSteps] = useState(['']);

    const stepElements = [];

    for (let i = 0; i < steps.length; i++) {
        stepElements.push(<textarea
            className="form-control mb-2"
            rows="3"
            key={i}
            value={steps[i]}
            onChange={(e) => onStepChange(i, e)}>
        </textarea>)
    }

    const [image, setImage] = useState();

    let imageDataUrl = '';
    if (image) {
        imageDataUrl = URL.createObjectURL(image);
    }

    const [isPublic, setIsPublic] = useState(false);


    const navigate = useNavigate()

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        const { data } = await axios.get('/api/recipes/getcategories');
        setCategories(data);
    }

    const onCategoryChange = e => {
        setSelectedCategory(e.target.value);
    }

    const onAddIngredientClick = () => {
        let copy = [...ingredients, ''];
        setIngredients(copy);
    }

    const OnIngredientChange = (index, e) => {
        let copy = [...ingredients];
        copy[index] = e.target.value;
        setIngredients(copy);
    }

    const onStepChange = (index, e) => {
        let copy = [...steps];
        copy[index] = e.target.value;
        setSteps(copy)
    }

    const onAddStepClick = () => {
        let copy = [...steps, ''];
        setSteps(copy);
    }

    const onImageSelect = e => {
        setImage(e.target.files[0])
    }

    const onCheckChange = () => {
        setIsPublic(!isPublic);
    }

    const onSubmitClick = async e => {
        e.preventDefault();
        let imageFile = {
            base64: null,
            fileName: null
        };
        if (image) {
            imageFile = {
                base64: await toBase64(image),
                fileName: image.name
            };
        }

        const recipe = {
            title: title,
            imageFileName: null,
            isPublic: isPublic,
            categoryId: selectedCategory,
            ingredients: ingredients,
            steps: steps
        }

        await axios.post('/api/recipes/addrecipe', { recipe, imageFile })
        navigate('/')
    }


    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container mt-5 d-flex">
                <div className="card shadow-sm" style={{ maxWidth: '600px', width: '100%', borderRadius: '15px', backgroundColor: 'rgb(248, 249, 250)' }} >
                    <div className="card-body" style={{ padding: '20px' }} >
                        <h2 className="mb-4 text-center" style={{ fontFamily: 'Arial, sans-serif', color: 'rgb(52, 58, 64)' }}>Add a New Recipe</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Recipe Title</label>
                                <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select className="form-select" id="category" onChange={onCategoryChange}>
                                    <option value="-1">Select a category</option>
                                    {categories.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ingredients" className="form-label">Ingredients</label>
                                {ingredientElements}
                                <button type="button" className="btn btn-success" onClick={onAddIngredientClick}>Add Ingredient</button>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="steps" className="form-label">Steps</label>
                                {stepElements}
                                <button type="button" className="btn btn-success" onClick={onAddStepClick}>Add Step</button>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Upload Image</label>
                                <input type="file" className="form-control" id="image"  onChange={onImageSelect }></input>
                            </div>
                            <img src={imageDataUrl} alt="Recipe" class="img-fluid mb-3" style={{maxHeight: '200px', borderRadius: '10px'}}></img>
                            <div className="mb-3">
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="isPublic" checked={isPublic} onChange={onCheckChange}></input>
                                    <label className="form-check-label" for="isPublic">Share this recipe publicly</label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100"
                                    style={{ marginTop: '10px' }}
                                    disabled={!title || selectedCategory === '-1' || ingredients.includes('') || steps.includes('')}                                    onClick={onSubmitClick}
                                >Add Recipe</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card shadow-sm ms-4"
                    style={{ position: 'sticky', top: '20px', maxWidth: ' 400px', width: '100%', height: 'fit-content', borderRadius: '15px', backgroundColor: 'rgb(248, 249, 250)' }} >
                    <div className="card-body" style={{ padding: '20px' }} >
                        <h3 className="text-center" style={{ fontFamily: 'Arial, sans-serif', color: 'rgb(52, 58, 64)' }} >Recipe Preview</h3>
                        <div className="card shadow-sm h-100" style={{ borderRadius: '15px' }} >
                            <RecipeCard
                                title={title}
                                imageDataUrl={imageDataUrl}
                                selectedCategory={selectedCategory}
                                categories={categories}
                                ingredients={ingredients}
                                steps={steps}
                                isPublic={isPublic}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddRecipe