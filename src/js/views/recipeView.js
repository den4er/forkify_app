import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional';


class RecipeView
{
    data; // данные рецепта
    icons; // иконки
    parentElement; // родитель, куда вставляем данные
  	errorMessage = `We could not find this recipe. Please try another one!`;
  	message = '';
    
    
    render(data, icons, parentElement)
    {
        // заполняем объект свойствами
        this.data = data;
        this.icons = icons;
        this.parentElement = parentElement;
        
        const markup = this.generateMarkup(); // генерируем блок
         
        this.clear(); // очищаем родителя
        this.parentElement.insertAdjacentHTML('afterbegin', markup); // вставляем блок на страницу
    }
    
    
    // метод очистки контейнера
    clear()
    {
        this.parentElement.innerHTML = '';
    }
    
    
    // метод отображения спиннера
    renderSpinner(parentElement) 
    {
      this.parentElement = parentElement;
      const markup = `
        <div class="spinner">
          <svg>
            <use href="${this.icons}#icon-loader"></use>
          </svg>
        </div>
      `;
      
      this.clear(); // очищаем родителя
      this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    
    // метод отображения ошибок
    renderError(message = this.errorMessage)
    {
        const markup = `
            <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        
        this.clear(); // очищаем родителя
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    
    // метод вывода сообщения
    renderMessage(message = this.message)
    {
        const markup = `
            <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        
        this.clear(); // очищаем родителя
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    
  	// слушатели событий
  	addHandlerRender(handler)
  	{
    	const events = ['hashchange', 'load']; // указываем события, при которых будет срабатывать обработчик
		events.forEach( event => window.addEventListener(event, handler)); // вешаем обработчик в цикле
    }
  
  
    // метод генерации выходных данных шаблона
    generateMarkup()
    {
        return `
          <figure class="recipe__fig">
            <img src="${this.data.image}" alt="${this.data.title}" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${this.data.title}</span>
            </h1>
          </figure>   
    
          <div class="recipe__details">
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${this.icons}#icon-clock"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${this.data.cookingTime}</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <svg class="recipe__info-icon">
                <use href="${this.icons}#icon-users"></use>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${this.data.servings}</span>
              <span class="recipe__info-text">servings</span>
    
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${this.icons}#icon-minus-circle"></use>
                  </svg>
                </button>
                <button class="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="${this.icons}#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>
    
            <div class="recipe__user-generated">
              <svg>
                <use href="${this.icons}#icon-user"></use>
              </svg>
            </div>
            <button class="btn--round">
              <svg class="">
                <use href="${this.icons}#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>
    
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
    
        ${this.data.ingredients.map(this.generateIngredients).join('')}
    
            </ul>
          </div>
    
          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${this.data.publisher}</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${this.data.sourceUrl}"
              target="_blank"
            >
              <span>Directions</span>
              <svg class="search__icon">
                <use href="${this.icons}#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        `;
    
    }
  	
  	
  	// метод отображения ингридиентов
  	generateIngredients(ing) {
          return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
        }
}

export default new RecipeView(); // экспортируем объект