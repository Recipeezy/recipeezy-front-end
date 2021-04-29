import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, IconButton, Button, makeStyles } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Paper, Card } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
    videoCard: {
        minWidth: '150px'
    },
    mealTitle: {
        marginBottom: '50px'
    },
    cardDetails: {
        display: 'flex',
    },
    textContainer: {
        justifyContent: 'center',
        width: '50%'
    },
    img: {
        width: '50%'
    },
    list: {
        alignItems: 'center'
    },
    subHeader: {
        paddingLeft: '15px',
        marginTop: '30px'
    }
});


export default function RecipeDetail({ selectedRecipe, handleGoBack, token }) {
    console.log('selected recipe ', selectedRecipe)
    console.log(selectedRecipe.strYoutube.replace('watch?', 'embed/'))
    const classes = useStyles()

    const [ingredients, setIngredients] = useState([])


    // gets all ingredients and puts in list
    // deletes empty strings to avoid 400 error
    const listIngredients = () => {
        let ingredientsList = []
        for (let i = 1; i < 21; i++) {
            eval('ingredientsList.push(selectedRecipe.strIngredient' + i + ')')
        }
        if (ingredientsList.length > 0) {
            let newingredientsList = ingredientsList.filter(function (ingredient) {
                return (ingredient.length > 0)
            })
            setIngredients(newingredientsList)

        }

        console.log(ingredientsList)

    }

    // Turns list into a list of objects
    const listToObjects = (list) => {
        let listObjects = list.map(x => {
            let properties = {
                "name": x
            }
            return properties
        })
        console.log("LIST", listObjects)
        return listObjects

    }




    //sends request to shoppinglist to add all ingredients
    const addAllIngredients = () => {
        listIngredients()
        console.log('toke', token)
        if (ingredients.length > 0) {
            let ingList = listToObjects(ingredients)
            axios.post(
                'https://recipeezy-app.herokuapp.com/shopping_list/add/', {
                ingredients: ingList
            },
                {
                    headers: { Authorization: `Token ${token}` },
                },
            ).then(() => {
                document.querySelector('.add-ing-button').innerHTML = "ADDED SUCCESSFULLY"
                setTimeout(() => {
                    document.querySelector('.add-ing-button').innerHTML = "Add All Ingredients to Shopping List"
                }, 1500)
            })
        }
    }



    return (
        <Container>
            <IconButton>
                <ArrowBackIcon
                    gutterBottom
                    onClick={handleGoBack}
                >Go back</ArrowBackIcon>
            </IconButton>
            <Typography className={classes.mealTitle} variant='h4' align='center'>
                {selectedRecipe.strMeal}
            </Typography>

            <Grid
                className={classes.root}
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
                container>
                <div className={classes.cardDetails}>
                    <Grid item>
                        <img align='center' alt="recipe-pic" src={selectedRecipe.strMealThumb} />
                    </Grid>
                    <Grid item component={Paper} className={classes.textContainer}>
                        <Typography
                            variant='subtitle1'
                            align="center"
                        >Cuisine: {selectedRecipe.strArea}</Typography>
                        <Typography align='center' variant='subtitle1'>Category: {selectedRecipe.strCategory}</Typography>
                    </Grid>
                </div>
            </Grid>

            <div>
                <ul className='ingredient-list'>
                    <li>{selectedRecipe.strIngredient1}</li>
                    <li>{selectedRecipe.strIngredient2}</li>
                    <li>{selectedRecipe.strIngredient3}</li>
                    <li>{selectedRecipe.strIngredient4}</li>
                    <li>{selectedRecipe.strIngredient5}</li>
                    <li>{selectedRecipe.strIngredient6}</li>
                    <li>{selectedRecipe.strIngredient7}</li>
                    <li>{selectedRecipe.strIngredient8}</li>
                    <li>{selectedRecipe.strIngredient9}</li>
                    <li>{selectedRecipe.strIngredient10}</li>
                    <li>{selectedRecipe.strIngredient11}</li>
                    <li>{selectedRecipe.strIngredient12}</li>
                    <li>{selectedRecipe.strIngredient13}</li>
                    <li>{selectedRecipe.strIngredient14}</li>
                    <li>{selectedRecipe.strIngredient15}</li>
                    <li>{selectedRecipe.strIngredient16}</li>
                    <li>{selectedRecipe.strIngredient17}</li>
                    <li>{selectedRecipe.strIngredient18}</li>
                    <li>{selectedRecipe.strIngredient19}</li>
                    <li>{selectedRecipe.strIngredient20}</li>
                </ul>
                <div className="add-all-ingredients">
                    <button className="add-ing-button" onClick={addAllIngredients}>Add all Ingredients to Shopping List</button>
                </div>
            </div>
            <div>
                <Typography className={classes.subHeader} variant='h5'>
                    Instructions:
                </Typography>
                <Typography variant='body1'>{selectedRecipe.strInstructions}</Typography>
            </div>
            <Card className={classes.videoCard}>
                <CardMedia
                    // width="100%"
                    src={selectedRecipe.strYoutube.replace('watch?v=', 'embed/')}
                    component='iframe'
                    height='400'
                />
            </Card>
        </Container >

    )
}
