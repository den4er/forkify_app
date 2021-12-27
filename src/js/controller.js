import * as model from './model.js';
import recipeView from './views/recipeView.js';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


// получаем и отображаем рецепт блюда
const controlRecipe = async function(){
  try {
    
    const id = window.location.hash.slice(1); // получаем идентификатор без #

    // отображаем спиннер загрузки
    recipeView.renderSpinner(recipeContainer);
    
    if(!id) return;// если id нет, прерываем
    
    // получаем данные о рецепте
    await model.loadRecipe(id); // вызываем метод, получающий и формирующий объект с данными

    // отображаем данные
    recipeView.render(model.state.recipe, icons, recipeContainer);
    
  } catch (err) {
    // вызываем метод отображения ошибки
    recipeView.renderError();
  }
}

// получаем и отображаем список рецептов по поисковому запросу
const controlSearchResults = async function(){
	try{
      	// плучаем данные о рецептах по звпросу
    	await model.loadSearchResults();
      	console.log(model.state.search.results);
    }catch(err){
    	console.log(err);
    }
}
controlSearchResults();

const init = function(){
    recipeView.addHandlerRender(controlRecipe); // передаем обработчик событий слушателю
};
init();