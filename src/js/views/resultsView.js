import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View
{
  	// задаем родительский элемент
	parentElement = document.querySelector('.results');
  
  	// формируем данные для отображения
  	generateMarkup()
	{
      	console.log(this.data);
      	return this.data.map(recipe => {
        	return `
              <li class="preview">
                  <a class="preview__link" href="#${recipe.id}">
                    <figure class="preview__fig">
                      <img src="${recipe.image}" alt="${recipe.title}" />
                    </figure>
                    <div class="preview__data">
                      <h4 class="preview__title">${recipe.title}</h4>
                      <p class="preview__publisher">${recipe.publisher}</p>
                    </div>
                  </a>
               </li>
       	`;
        }).join('');
      
       	
	}
}



export default new ResultsView();