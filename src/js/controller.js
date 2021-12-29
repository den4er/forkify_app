import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot){
	module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');


// получаем и отображаем рецепт блюда
const controlRecipe = async function(){
  try {
    
    const id = window.location.hash.slice(1); // получаем идентификатор без #

    if(!id) return;// если id нет, прерываем
    
    // отображаем спиннер загрузки
    recipeView.renderSpinner();
       
    // получаем данные о рецепте
    await model.loadRecipe(id); // вызываем метод, получающий и формирующий объект с данными

    // отображаем данные
    recipeView.render(model.state.recipe);
    
  } catch (err) {
    // вызываем метод отображения ошибки
    recipeView.renderError();
  }
};


// получаем и отображаем список рецептов по поисковому запросу
const controlSearchResults = async function(){
	try{  
      	// получаем строку поиска
	    const query = searchView.getQuery();  
      	if(!query) return; // если строки нет, прерываем
      
        // показываем спиннер
      	resultsView.renderSpinner();
      	
      	// плучаем данные о рецептах по запросу
    	await model.loadSearchResults(query);
      
      	// отображаем данные
      	resultsView.render(model.state.search.results);
      
    }catch(err){
    	console.log(err);
    }
};


const init = function(){
    recipeView.addHandlerRender(controlRecipe); // передаем обработчик события отображения
  	searchView.addHandlerSearch(controlSearchResults); // передаем обработчик события поиска
};
init();