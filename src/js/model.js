/*

Forkify API

Documentstion:  https://forkify-api.herokuapp.com/
Demo: 		https://forkify-api.herokuapp.com/v2

API key		756138d6-8a4b-4b07-9f2c-61a17bc3ace9

*/


import {API_URL} from './config.js';
import {getJSON} from './helpers.js';

// объект для хранения данных о рецепте
export const state = {
    recipe: {},
  	search: {
    	query: '',
      	results: [],
    }
};

// функция получения рецепта по идентификатору
export const loadRecipe = async function(id){
    try{
        // получаем данные
      	// getJSON - функция из helpers.js
      	// API_URL получаем из файла с конфигом
        const data = await getJSON(`${API_URL}/${id}`); 
 
      	// извлекаем объект с данными в переменную
        const { recipe } = data.data;
    
      	// заполняем свойство recipe объекта state полученными данными
        state.recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients,
        }  
    }catch(err){
    	throw err;	// пробрасываем ошибку в контроллер 
    }

};

// получение списка рецептов по определенному запросу
export const loadSearchResults = async function(query = 'pizza'){
    try{
      	// сохраняем текст запроса
      	state.search.query = query;
      
      	// получаем данные согласно условию поиска
 		const data = await getJSON(`${API_URL}?search=${query}&key=756138d6-8a4b-4b07-9f2c-61a17bc3ace9`);
      
      	// выбираем нужные данные и сохраняем в массив
      	state.search.results = data.data.recipes.map(rec => {
        	return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,	
            }
        });      	
      
    }catch(err){
    	throw err;	// пробрасываем ошибку в контроллер 
    }
}