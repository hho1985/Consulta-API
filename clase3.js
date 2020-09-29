const API_URL = 'https://www.balldontlie.io/api/v1/'
const PEOPLE_URL = 'players/:id'

const STATS_URl= 'https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=abc'

const opts = {crossDomain: true}


document.querySelector('#siguiente').onclick = function(event){
	const idJugador= Number(document.querySelector('#ingreso').value)
	obtenerJugador(idJugador)
	obtenerStats(idJugador)
	mostrarjugadores();
	mostrarStats();

	event.preventDefault();

}

function obtenerStats(id){
	return new Promise((resolve,reject)=>{
		const URL =`${STATS_URL.replace('abc',id)}`
		//const URL= 'https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=2'
		$.get(URL,opts,function(data){
			resolve(data)
		})
		.fail(() =>reject(id))

	})

	.then(function(stats){
		console.log(stats.data[0].games_played)


		
		const $div = document.createElement('div');
		$div.className = 'estadistica';

		const $ppartidos = document.createElement('p');
		$ppartidos.textContent = `Partidos jugados: ${stats.data[0].games_played}`
		$div.appendChild($ppartidos)

		const $pminutos = document.createElement('p');
		$pminutos.textContent = `Minutos jugados: ${stats.data[0].min}`
		$div.appendChild($pminutos)




		const $estadistica = document.querySelector('#estadistica');
		$estadistica.appendChild($div);

		

	})

	.catch(onError2)	
	

}



function obtenerJugador(id){
	return new Promise ((resolve,reject)=>{
		const URL =`${API_URL}${PEOPLE_URL.replace(':id',id)}`
		$.get(URL,opts,function(data){
			resolve(data)
		})
		.fail(() =>reject(id))

	})

	.then(function(jugador){

		const $div = document.createElement('div');
		$div.className = 'jugadores';

		const $pnombre = document.createElement('p');
		$pnombre.textContent = `Nombre: ${jugador.first_name}`
		$div.appendChild($pnombre)

		const $papellido = document.createElement('p');
		$papellido.textContent= `Apellido: ${jugador.last_name}`
		$div.appendChild($papellido)

		const $paltura = document.createElement('p');
		$paltura.textContent = `Altura: ${jugador.height_feet *30} cm`
		$div.appendChild($paltura)

		const $pequipo = document.createElement('p');
		$pequipo.textContent = `Equipo: ${jugador.team.full_name}`
		$div.appendChild($pequipo)
		
	
		const $jugadores = document.querySelector('#jugadores');
		$jugadores.appendChild($div);




	})

	


	.catch(onError)
}

function onError(id){
	console.log("Sucedio un error haciendo la consulta")
}

function onError2(id){
	console.log("Sucedio un error haciendo la consulta de estadisticas")
}


function ocultarJugador() {
	document.querySelector('#jugadores').className = 'oculto';
  }

function mostrarjugadores(){
	document.querySelector('#jugadores').className = '';

}

function mostrarStats(){
	document.querySelector('#estadistica').className = '';
}
  



