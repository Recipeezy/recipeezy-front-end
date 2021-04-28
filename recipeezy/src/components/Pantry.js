import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FoodItem from './FoodItem.js'
import FoodItemForm from './FoodItemForm.js'
import axios from 'axios'
import lodash from 'lodash'




export default function Pantry({ token }) {
    const [foodList, setFoodList] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [isAtLimit, setIsAtLimit] = useState(false)

    const history = useHistory()


    useEffect(() => {
        console.log('token is ', token)
        axios
            .get('https://recipeezy-app.herokuapp.com/pantry/', {
                headers: {
                    Authorization: `Token ${token}`
                },
            })
            .then((data) => {
                function setFood(data) {
                    setFoodList(lodash.uniqBy(data, 'name'))
                }
                setFood(data.data[0].ingredients_list)
            })
        getSearch()

    }, [])


    const addFoodItem = (newItem) => {
        setFoodList([...foodList, newItem])
    }


    const getSearch = () => {
        axios.get(`https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${selectedIngredients.join()}`).then((response) => {
            if (response.data.meals) {
                setSearchResults((response.data.meals && response.data.meals.length > 10) ? response.data.meals.slice(0, 10).map((obj) => obj.idMeal) : response.data.meals.map((obj) => obj.idMeal))


            }
            console.log('SEARCH', searchResults)

        })
    }

    const handleSearch = () => {
        if (searchResults.length > 0) {
            history.push('/searchresults', { search: searchResults, item: selectedIngredients.join() })
        }
    }



    return (
        <div className='pantry-wrapper'>
            <h1>Pantry</h1>
            <Link to='/' type='button'>home</Link>

            {foodList ? (
                <div>
                    {foodList.map((food) => (
                        <FoodItem food={food} key={food.id} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} token={token} isAtLimit={isAtLimit} setIsAtLimit={setIsAtLimit} />
                    ))}
                    {isAtLimit ? (
                        <div><p>You may only select a maximum of 4 ingredients</p></div>
                    ) : (
                        <p></p>
                    )}

                    <FoodItemForm addFoodItem={addFoodItem} token={token} />

                    <button className='search-ingredients' onClick={handleSearch}>Search</button>

                    <div>
                        <h2 className="errorh2"></h2>

                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    )
}
