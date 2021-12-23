import * as model from './model.js';
import recipeView from './views/recipeView.js';

import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



// получаем и отображаем рецепт блюда
const controlRecipe = async function () {
  try {
    
    const id = window.location.hash.slice(1); // получаем идентификатор без #

    if(!id) return;// если id нет, прерываем

    // отображаем спиннер загрузки
    recipeView.renderSpinner(recipeContainer);

    // получаем данные
    await model.loadRecipe(id); // вызываем метод, получающий и формирующий объект с данными

    // отображаем данные
    recipeView.render(model.state.recipe, icons, recipeContainer);
    

  } catch (err) {
    alert(err);
  }
}

const events = ['hashchange', 'load']; // указываем события, при которых будет срабатывать обработчик
events.forEach( event => window.addEventListener(event, controlRecipe)); // вешаем обработчик в цикле