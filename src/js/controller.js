import * as model from './model.js';
import recipeView from './views/recipeView.js';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



// получаем и отображаем рецепт блюда
const controlRecipe = async function () {
  try {
    
    const id = window.location.hash.slice(1); // получаем идентификатор без #

    // отображаем спиннер загрузки
    recipeView.renderSpinner(recipeContainer);
    
    if(!id) return;// если id нет, прерываем
    
    // получаем данные
    await model.loadRecipe(id); // вызываем метод, получающий и формирующий объект с данными

    // отображаем данные
    recipeView.render(model.state.recipe, icons, recipeContainer);
    

  } catch (err) {
    console.log(err);
  }
}

// const events = ['hashchange', 'load']; // указываем события, при которых будет срабатывать обработчик
// events.forEach( event => window.addEventListener(event, controlRecipe)); // вешаем обработчик в цикле

const init = function(){
    recipeView.addHandlerRender(controlRecipe); // передаем обработчик событий слушателю
};
init();