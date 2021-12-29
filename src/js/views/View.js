import icons from 'url:../../img/icons.svg';

export default class View
{
  	data;
  
    render(data)
    {
      	if(!data || (Array.isArray(data) && data.length === 0) ) return this.renderError();
      	this.data = data;
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
    renderSpinner() 
    {
      const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
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
}