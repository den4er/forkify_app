// класс для получения запроса пользователя
class SearchView
{
  	// получаем родителя
	parentElement = document.querySelector('.search');
    
  	// получаем значение в поле поиска
  	getQuery()
  	{
      	const query = this.parentElement.querySelector('.search__field').value; // получаем значение
      	this.clearInput(); // очищаем поле поиска
      	return query;
    }
  	
  	// вешаем обработчик на кнопку поиска
    addHandlerSearch(handler)
  	{
  		this.parentElement.addEventListener('submit', function(event){
        	event.preventDefault();
          	handler();
        });
  	}
  
  	// очистка поля поиска
  	clearInput()
  	{
    	this.parentElement.querySelector('.search__field').value = '';
    }
}

export default new SearchView();