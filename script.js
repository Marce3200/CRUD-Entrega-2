let tareas = [];

window.addEventListener('load', () => { //esa flecha es arrow function //windows:navegador, a la página le agrego un event listener, el load. Cuando cargo la página se ejecuta eso.
	tareas = JSON.parse(localStorage.getItem('tareas')) || []; //si no hay nada en storage, tarea parte como un array vacío.//rescupero data de local storage//se ve si hay algo almacenado en local storage y si lo hay, lo almacena en tarea.
	//ahí digo que es un array. Cuando hago setitem ahi defino el tipo de dato que es, objeto, array o lo que sea. Cuando hago un getitem y no hay nada en storage, quedaria null. Por eso decimos que sino es un array. 
	const nombreInput = document.querySelector('#nombre'); 
	const nuevaListaTareas = document.querySelector('#nueva-lista-tareas');

	const usuario = localStorage.getItem('usuario') || ''; //sección  pon tu nombre aquí queda guardado en local storage

	nombreInput.value = usuario; //si funciona, guarda nombre usuario

	nombreInput.addEventListener('change', (event) => { //change: por cada letra que yo escribo se ejecuta esta funcion y cambia el nombre que está almacenado en local storage
		localStorage.setItem('usuario', event.target.value); //usuario: key   event.target.value: value
	})//estas lineas solo guardan el nombre del input "pon tu nombre"// event trae mucha info, target es una propiedad de event y target tambien es un objeto, por eso va con punto despues.que dice en qué elemeno se generó el evento. el event.target en este caso es el input. el .value es lo que está escrito en el input

	nuevaListaTareas.addEventListener('submit', event => {//arrow function //addeventlistener le pasa el evento a la funcion
		event.preventDefault(); //se accede al prevent default , que es una acción que es una funcion

		const tarea = { //objeto tarea con sus propiedades
			content: event.target.elements.content.value,  //contenido tarea //denro del evento se va al target, dentro del target que es el formulario, accedo a la propiedad elementos .Elemento es un objeto, porque con el punto, se accede hasta el  content. y content es un input
			category: event.target.elements.category.value, // categoria: seleccion trabajo o personal
			realizada: false, //la tarea parte no realizada
			// createdAt: new Date().getTime()//creo que esto no se usa
		}

		tareas.push(tarea); 

		localStorage.setItem('tareas', JSON.stringify(tareas));// stringify convierte en string // set item crea un nuevo dato key-value que lo guarda en local storage

		// Reset the form
		event.target.reset(); // para reiniciar formulario, borra todo los inputs//borra las tareas de la lista de tareas

		MostrarTareas()
	})

	MostrarTareas()//
})

function MostrarTareas () { 
	const listaTareas = document.querySelector('#lista-tareas'); 
	listaTareas.innerHTML = ""; //elemento.innerHTML  Al establecerse se reemplaza la sintaxis HTML del elemento por la nueva.//comillas vacias es para que  la lista este limpia y no vaya agregando lo ya agregado anteriormente.

	tareas.forEach(tarea => {//tareas es un array, y por cada objeto tarea pasa todo lo de abajo
		const itemTarea = document.createElement('div'); //constante local itemTarea, es la tarea agregada//crea espacio para poner la tarea nueva en ese div
		itemTarea.classList.add('item-tarea'); //cada item agregado a la lista, da los estilos tambien en css.

		//todas estas constantes crean los elementos de la lista de tareas creadas
		//todas estas cosas se crean recien cuando se crea la tarea. Creando html con codigo javascrip
		const label = document.createElement('label');//palabras en amarillo no son inventados! son los nombres de las etiquetas
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button'); 
		const deleteButton = document.createElement('button'); 
		const icono = document.createElement('i');
		const icono2 = document.createElement('i');
		icono.classList.add('fa-solid');
		icono.classList.add('fa-pencil');
		icono2.classList.add('fa-solid');
		icono2.classList.add('fa-trash-can');

		input.type = 'checkbox'; //checkbox para tarea ya realizada
		input.checked = tarea.realizada;
		span.classList.add('etiqueta');
		if (tarea.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('trabajo');
		}

		content.classList.add('tarea-content');// la lista de clases, al elemento le puedo dar una clase o varias, y classlist devuelven todas las clases
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${tarea.content}" readonly>`; //comillas al reves permite poner variable. la variable es la que va con el signo $, en este caso, tarea.//readonly:atributo booleano , especifica que el input sólo lectura//
		//A read-only input field cannot be modified (however, a user can tab to it, highlight it, and copy the text from it).//si quisiera usar un appendchild seria muy largo. Por eso se usa en ese caso el inner HTML.
		

		edit.appendChild(icono);
		deleteButton.appendChild(icono2);


		label.appendChild(input); //metodo para agregar hijos. label es un elemento html, le estoy poniendo dentro como hijo otro elemnto html que es un input. Más correcto que el inner. 
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		itemTarea.appendChild(label);
		itemTarea.appendChild(content);
		itemTarea.appendChild(actions);

		listaTareas.appendChild(itemTarea); //todos estos elemntos fueron creados en js no en html, creados de la forma document.createElement

		if (tarea.realizada) {
			itemTarea.classList.add('realizada'); //realizada es atribuuto de clase tarea y es booleano
		}
		
		input.addEventListener('change', (event) => {//arrow function
			tarea.realizada = event.target.checked;//ese valor da true o false. si esta marcado va a ser true//es para cambiar el valor del objeto, y se cambia segun el valor del checkbox
			localStorage.setItem('tareas', JSON.stringify(tareas)); //JSON.stringify convierte array en tareas

			if (tarea.realizada) {
				itemTarea.classList.add('realizada');
			} else {
				itemTarea.classList.remove('realizada');
			}

			MostrarTareas()

		})

		edit.addEventListener('click', () => { //cuando hago clik en el lapicito, necesito saber algo del evento???? no, tonces borro event. 
			const input = content.querySelector('input');
			input.removeAttribute('readonly');//le quito atributo read only y me permite editar
			input.focus(); //focus me deja escribir altiro, se posiciona listo pa escribir
			input.addEventListener('blur', (event) => { //blur es cuando me salgo del input. Cuando me salgo, vuelvo a darle el atributo read only//se ocupa para validar input.Si por ejemplo en facebook escribo mi  mail mal, y paso a la siguiente seccion, me avisa que falto algo, eso lo hace el blur.
				
				// input.setAttribute('readonly', true); en este caso es innecesario porque vuelvo a ocupar la funcion mostrar tarea que viene con un readonlytrue
				tarea.content = event.target.value;//el target es el input, lo que tiene ahora. 
				localStorage.setItem('tareas', JSON.stringify(tareas));//vuelvo a guaradr las tareas en local storgae
				MostrarTareas()//esa funcion tiene readonly true

			})
		})

		deleteButton.addEventListener('dblclick', (event) => { //arrow function
			
			tareas = tareas.filter(t => t != tarea); //si hay algo distinto a tarea
			
			localStorage.setItem('tareas', JSON.stringify(tareas));
			MostrarTareas()
		})

	})
}