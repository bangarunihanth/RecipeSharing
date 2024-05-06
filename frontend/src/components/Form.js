import React, { useState } from 'react';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import './Form.css';

const RecipeForm = () => {
    let {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function handleFormSubmit(newRecipe) {
        newRecipe.id=Date.now()
        newRecipe.ingredients=newRecipe.ingredients.split(/\r?\n/)
        newRecipe.instructions=newRecipe.instructions.split(/\r?\n/)
        newRecipe.nutritionalInfo=newRecipe.nutritionalInfo.split(/\r?\n/)
        newRecipe.equipment=newRecipe.equipment.split(/\r?\n/)
        newRecipe.tips=newRecipe.tips.split(/\r?\n/)
      //  let form=new FormData()
       // form.append('file',newRecipe.file[0])
        // newRecipe.file=form
        newRecipe.rating=0
        newRecipe.comments=[]
        console.log(newRecipe)
        // let res=await axios.post('http://localhost:4000/recipe-api/new-recipe',newRecipe)
        // console.log(res)
    }

    return (
        <div className="form-container"> {/* Apply the form-container class */}
            <h2>Submit a Recipe</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name :</label>
                    <input type="text" id="name" className="form-control shadow-sm"
                        {...register("name", {
                            required: true
                        })}
                    />
                </div>

                <div>
                    <label>Cuisine :</label>
                    <select
                        {...register("cuisine", {
                            required: true
                        })}
                    >
                        <option value="">Select</option>
                        <option value="north-indian">North Indian</option>
                        <option value="south-indian">South Indian</option>
                        <option value="chinese">Chinese</option>
                        <option value="mexican">Mexican</option>
                        <option value="turkish">Turkish</option>
                        <option value="japanese">Japanese</option>
                        <option value="french">French</option>
                        <option value="italian">Italian</option>
                    </select>
                </div>

                <div>
                    <label>Type :</label>
                    <select
                        {...register("type", {
                            required: true
                        })}
                    >
                        <option value="">Select</option>
                        <option value="veg">Vegeterian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                        <option value="vegan">Vegan</option>
                    </select>
                </div>

                <div>
                    <label>Difficulty Level:</label>
                    <select
                        {...register("difficulty", {
                            required: true
                        })}
                    >
                        <option value="">Select</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <label>Ingredients:</label>
                    <textarea
                        {...register("ingredients", {
                            required: true
                        })}
                    />
                </div>

                <div>
                    <label>Instructions:</label>
                    <textarea
                        {...register("instructions", {
                            required: true
                        })}
                    />
                </div>

                <div>
                    <label>Equipment :</label>
                    <textarea
                        {...register("equipment", {
                            required: true
                        })}
                    />
                </div>

                <div>
                    <label>Cooking Time:</label>
                    <input
                        type="text"
                        {...register("cookingTime", {
                            required: true
                        })}
                    />
                </div>

                <div>
                    <label>Tips :</label>
                    <textarea
                        {...register("tips", {
                            required: true
                        })}
                    />
                </div>

                <div>
                    <label>Nutritional Information:</label>
                    <textarea
                        {...register("nutritionalInfo", {
                            required: true
                        })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image
                    </label>
                    <input type="text" id="image" className="form-control shadow-sm"
                        {...register("image", {
                            required: true,
                        })}
                    />
                </div>

                <button type="submit">Submit Recipe</button>
            </form>
        </div>
    );
};

export default RecipeForm;