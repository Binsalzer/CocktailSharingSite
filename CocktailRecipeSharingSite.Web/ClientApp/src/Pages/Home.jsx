import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getAllRecipes = async () => {
            const { data } = await axios.get('/api/recipes/getallrecipes');
            setRecipes(data);
        }
        getAllRecipes();
    }, []);


    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="container mt-5" style={{ backgroundColor: 'rgb(245, 245, 245)', padding: '20px', borderRadius: '10px' }} >
                <div className="jumbotron bg-light p-5 rounded-lg mb-4 shadow">
                    <h1 class="display-4">Welcome to Cocktail Recipe Sharing App!</h1>
                    <p class="lead">
                        Explore the most awesome cocktail recipes! Choose your favorite, and share your ideas with others!
                    </p>
                </div>
                <div className="row">
                    {recipes.map(r => <div className="col-md-4 mb-4" key={r.id }>
                        <div className="card shadow-sm h-100" style={{ borderRadius: '15px' }} >
                            <div className="card-body d-flex flex-column" style={{ maxHeight: '500px', overflow: 'hidden' }} >
                                <RecipeCard
                                    title={r.title}
                                    imageDataUrl={`/api/recipes/viewimage?imageFileName=${r.imageFileName}`}
                                    selectedCategory={r.categoryId}
                                    categories={null}
                                    ingredients={r.ingredients}
                                    steps={r.steps}
                                    isPublic={r.isPublic}
                                />
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default Home;