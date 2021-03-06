import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
export default function ShopItemForm({ addShopItem, token, getShopList }) {
    const [name, setName] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(
                'https://recipeezy-app.herokuapp.com/shopping_list/',
                {
                    ingredients: [
                        { name: name }
                    ]
                },
                {
                    headers: { Authorization: `Token ${token}` },
                },
            )
            .then((data) => {
                getShopList()
                setName('')
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <Grid alignItems='center' container style={{ justifyContent: 'center' }} spacing={2}>
                <label htmlFor='item-name'></label>
                <TextField
                    id='item-name'
                    type='text'
                    value={name}
                    placeholder='Add Item'
                    onChange={(event) => setName(event.target.value)}
                ></TextField>
                <Button
                    style={{color:'#004e64'}}
                    color='secondary'
                    size='small'
                    variant='contained'
                    className='submit-btn'
                    type="submit"
                >Add</Button>
            </Grid>
        </form>
    )
}