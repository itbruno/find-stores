import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function Home() {
    const [stores, setStores] = useState([]);


    useEffect(() => {
        getStores();
        
    },[stores])

    async function getStores() {
        const response = await api.get('/api/stores');

        setStores(response.data);
    }

    async function registerStore(e) {
        e.preventDefault();

        const store_name = document.querySelector('#store_name');
        const store_url = document.querySelector('#store_url');
        const store_category = document.querySelector('#store_category');

        const response = await api.post('/api/register', {
            name: store_name.value,
            url: store_url.value,
            category: store_category.value
        });

        store_name.value = '';
        store_url.value = '';
        store_category.value = '';

        return setStores([...stores, response.data]);
    }


    return (
        <>
            <h2>Cadastrar</h2>
            <form>
                <div>
                    <label htmlFor="name">Nome da loja</label>
                    <input type="text" id="store_name" required/>
                </div>

                <div>
                    <label htmlFor="name">Url da loja</label>
                    <input type="text" id="store_url" required/>
                </div>

                <div>
                    <label htmlFor="name">Categoria</label>
                    <select id="store_category" required >
                        <option value="Roupa e Acessórios">Roupa e Acessórios</option>
                        <option value="Design">Design</option>
                        <option value="UX">UX</option>
                        <option value="Móveis">Móveis</option>
                        <option value="Alimentos">Alimentos</option>
                    </select>
                </div>

                <button type="button" onClick={registerStore}>Cadastrar</button>
            </form>

            <div id="stores">
                { stores.map((store) => (
                    <div key={store._id} className="store-item">
                        <h3>{store.name}</h3>
                        <p>{store.category}</p>
                        <a rel="noopener noreferrer" href={store.url} target="_blank">{store.url}</a>
                        <p>--</p>
                    </div>
                    
                ))}
            </div>
        </>
    );   
}

export default Home;