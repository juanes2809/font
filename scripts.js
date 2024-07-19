document.addEventListener('DOMContentLoaded', function() {
    
    /*ESTILO MAPA AL DAR CLICK */
    const elements = document.getElementsByClassName('delimPath')
    // Define una función para restaurar el color original de todos los elementos
    function restaurarColorOriginal() {
      for (const element of elements) {
        element.style.fill = ''; // Restaura el color original (azul en este caso)
      }
    }
    
    // Agrega un evento de clic a cada elemento
    for (const element of elements) {
      element.addEventListener('click', function() {
        // Restaura el color original de todos los elementos
       
      });
    }





     /*ESCRIBIR Y ALMACENAR EL NOMBRE DEL DPTO AL SELECCIONAR EL MAPA */
     const links = document.querySelectorAll('.Departamento');
     var departamentoQ = 0
     var cargoQ = 0
     links.forEach(link => {
         link.addEventListener('click', function(event) {
             event.preventDefault();
             /*LIMPIAR RADIO BUTTONS */
             const opcionesRadio = document.querySelectorAll('input[name="opcion"]');
             opcionesRadio.forEach(opcion => {
                 opcion.checked = false
             })
             /*LIMPIAR LISTA DE CANDIDATOS */
             const select = document.getElementById('candidato');
             while (select.options.length > 0) {
                 select.remove(0);
             }
             /*LIMPIAR LISTA DE MCIPIOS Y OCULTARLA*/
             const selectMcipios = document.getElementById('municipio');
             while (selectMcipios.options.length > 0) {
                 selectMcipios.remove(0);
             }
             const municipiosList = document.getElementById('municipios-list');
             municipiosList.style.display = 'none';
         
             // Obtener el valor del atributo name
             const nameValue = event.target.id; // o event.target.getAttribute('name');
             const departamentos = {
                 "COL1283": "Amazonas", 
                 "COL1314": "Antioquia", 
                 "COL1315": "Boyaca", 
                 "COL1316": "Cordoba", 
                 "COL1317": "Santander", 
                 "COL1318": "La Guajira", 
                 "COL1342": "San Andrés y Providencia", 
                 "COL1397": "Caldas", 
                 "COL1398": "Cundinamarca", 
                 "COL1399": "Bogota", 
                 "COL1400": "Quindio", 
                 "COL1401": "Risaralda", 
                 "COL1402": "Tolima", 
                 "COL1403": "Caqueta", 
                 "COL1404": "Cauca", 
                 "COL1405": "Huila", 
                 "COL1406": "Nariño", 
                 "COL1407": "Putumayo", 
                 "COL1408": "Valle del Cauca", 
                 "COL1412": "Atlantico", 
                 "COL1413": "Bolivar", 
                 "COL1414": "Cesar", 
                 "COL1415": "Choco", 
                 "COL1416": "Magdalena", 
                 "COL1417": "Sucre", 
                 "COL1420": "Arauca", 
                 "COL1421": "Norte de Santander", 
                 "COL1422": "Casanare", 
                 "COL1423": "Guaviare", 
                 "COL1424": "Guainia", 
                 "COL1425": "Meta", 
                 "COL1426": "Vaupes", 
                 "COL1427": "Vichada"
             };
             
             let codigo = nameValue;
             let nombreDepartamento = departamentos[codigo] || "Código no encontrado";
             console.log(nombreDepartamento); // Mostrará "Cauca"
             
             // Obtén el elemento div por su ID
             const miElemento = document.getElementById("txtDepartamento");
 
             // Define el texto y el estilo que deseas aplicar
             const texto = nombreDepartamento;
             const estilo = "color: #009688; font-size: 30px; font-weight: bold;";
 
             // Cambia el contenido y el estilo del elemento
             miElemento.textContent = texto;
             miElemento.style = estilo;
             localStorage.setItem("Departamento", texto);
 
             const Departamento = nombreDepartamento.toUpperCase()
             departamentoQ = Departamento
             
         });
     });
 
 
 
 
     /*CONSULTA DE CANDIDATOS POR MUNICIPIOS*/
     const lstMcipios = document.getElementById('municipio');
 
     lstMcipios.addEventListener('change', function() {
 
         const select = document.getElementById('candidato');
         while (select.options.length > 0) {
             select.remove(0);
         }
         var municipio = lstMcipios.options[lstMcipios.value-1].textContent.toUpperCase()
         console.log(municipio)
         fetch(`https://andresrod.pythonanywhere.com/consultar/all?departamento=${departamentoQ}&cargo=${cargoQ}&municipio=${municipio}`)
             .then(response => response.json())
             .then(data => {
                 
                 for (var i = 0; i < data.length; i++) {
                     const nuevoValor = select.options.length + 1;
                     const nuevoElemento = `${data[i]}`;
 
                     const newOption = document.createElement('option');
                     newOption.value = nuevoValor;
                     newOption.text = nuevoElemento;
 
                     select.appendChild(newOption);
                 }
             })
             .catch(error => {
                 console.error('Error al obtener los datos de la API', error);
             });
         
         const selectIrr = document.getElementById('candidatoIrregular');
         while (selectIrr.options.length > 0) {
             selectIrr.remove(0);
         }
         /*BUSCAR CANDIDATOS IRREGULARES*/
         var municipio = lstMcipios.options[lstMcipios.value-1].textContent.toLowerCase()
         municipio = municipio.charAt(0).toUpperCase() + municipio.slice(1)
         departamentoQ2 = departamentoQ.toLowerCase()
         departamentoQ2 = departamentoQ2.charAt(0).toUpperCase() + departamentoQ2.slice(1)
         const selectCandIrr = document.getElementById('candidatoIrregular');
         console.log(municipio)
         console.log(departamentoQ2)
         fetch(`https://andresrod.pythonanywhere.com/filter?departamento=${departamentoQ2}&ciudad=${municipio}`)
         .then(response => response.json())
         .then(data => {
             
             for (var i = 0; i < data.length; i++) {
                 
                 const nuevoValor = selectCandIrr.options.length + 1;
                 const nuevoElemento = `${data[i].UPPER_nombre_representante_legal +' - '+ data[i].Numero_de_Contratos}`;
 
                 const newOption = document.createElement('option');
                 newOption.value = nuevoValor;
                 newOption.text = nuevoElemento;
 
                 selectCandIrr.appendChild(newOption);
             }
         })
         .catch(error => {
             console.error('Error al obtener los datos de la API', error);
         });
     })
 
 
     
 
     /*EVENTOS AL DAR CLICK A ALGUN RADIO BUTTON: CONSULTA DE CANDIDATOS POR DPTO, OCULTAR O MOSTRAR LISTA MCIPIOS*/
     const opcionesRadio = document.querySelectorAll('input[name="opcion"]');
 
     opcionesRadio.forEach(opcion => {
         opcion.addEventListener('change', () => {
 
             /*MOSTRAR LISTA DE MCIPIOS SOLO PARA CONCEJO Y ALCALDE */ 
             const municipiosList = document.getElementById('municipios-list');
             var municipioDefault = 0
             if (opcion.value !== 'Asamblea' && opcion.value !== 'Gobernador') {
                 municipiosList.style.display = 'block';
                 cargoQ = opcion.value.toUpperCase()
                 
                 /*CONSULTA DE MCIPIOS CADA VEZ QUE SE DA CLICK EN UN CARGO */
                 const selectMcipios = document.getElementById('municipio');
                 fetch(`https://andresrod.pythonanywhere.com/municipios?departamento=${departamentoQ}&cargo=${cargoQ}`)
                 .then(response => response.json())
                 .then(data => {
                     console.log(data.length)
                     
                     for (var i = 0; i < data.length; i++) {
                         const nuevoValor = selectMcipios.options.length + 1;  // Valor único para el nuevo elemento
                         const nuevoElemento = `${data[i]}`;
                         municipioDefault = `${data[0]}`;
                         console.log(municipioDefault)
                         const newOption = document.createElement('option');
                         newOption.value = nuevoValor;
                         newOption.text = nuevoElemento;
                         console.log(nuevoElemento)
                         selectMcipios.appendChild(newOption); 
                     }
                     /*BUSCAR CANDIDATOS PARA EL VALOR POR DEFAULT DE LA LISTA DE MCIPIOS DESPUES DE SELECCIONAR EL CARGO*/
                     var municipio = municipioDefault
                     const selectCand = document.getElementById('candidato');
                     
                     fetch(`https://andresrod.pythonanywhere.com/consultar/all?departamento=${departamentoQ}&cargo=${cargoQ}&municipio=${municipio}`)
                     .then(response => response.json())
                     .then(data => {
                         
                         for (var i = 0; i < data.length; i++) {
                             const nuevoValor = selectCand.options.length + 1;
                             const nuevoElemento = `${data[i]}`;
 
                             const newOption = document.createElement('option');
                             newOption.value = nuevoValor;
                             newOption.text = nuevoElemento;
 
                             selectCand.appendChild(newOption);
                         }
                     })
                     .catch(error => {
                         console.error('Error al obtener los datos de la API', error);
                     });
 
 
 
                     /*BUSCAR CANDIDATOS IRREGULARES*/
                     var municipio = municipioDefault.toLowerCase()
                     municipio = municipio.charAt(0).toUpperCase() + municipio.slice(1)
                     departamentoQ2 = departamentoQ.toLowerCase()
                     departamentoQ2 = departamentoQ2.charAt(0).toUpperCase() + departamentoQ2.slice(1)
                     const selectCandIrr = document.getElementById('candidatoIrregular');
                     console.log(municipio)
                     console.log(departamentoQ2)
                     fetch(`https://andresrod.pythonanywhere.com/filter?departamento=${departamentoQ2}&ciudad=${municipio}`)
                     .then(response => response.json())
                     .then(data => {
                         
                         for (var i = 0; i < data.length; i++) {
                             
                             const nuevoValor = selectCandIrr.options.length + 1;
                             const nuevoElemento = `${data[i].UPPER_nombre_representante_legal +' - '+ data[i].Numero_de_Contratos}`;
 
                             const newOption = document.createElement('option');
                             newOption.value = nuevoValor;
                             newOption.text = nuevoElemento;
 
                             selectCandIrr.appendChild(newOption);
                         }
                     })
                     .catch(error => {
                         console.error('Error al obtener los datos de la API', error);
                     });
 
 
 
                 })
                 .catch(error => {
                     console.error('Error al obtener los datos de la API', error);
                 });
 
                 
                 
 
 
             } else {
                 municipiosList.style.display = 'none';
             }
             localStorage.setItem("Cargo", opcion.value);
 
             
 
 
             /*LIMPIAR LISTA DE CANDIDATOS */
             const select = document.getElementById('candidato');
             while (select.options.length > 0) {
                 select.remove(0);
             }
 
             
           // Verifica si la opción de radio está seleccionada
             if (opcion.checked) {
                 // Obtiene el valor de la opción seleccionada
                 if(opcion.value == 'Gobernador' || opcion.value == 'Asamblea'){
                     cargoQ = opcion.value.toUpperCase()
                     fetch(`https://andresrod.pythonanywhere.com/consultar/all?departamento=${departamentoQ}&cargo=${cargoQ}&municipio=`)
                     .then(response => response.json())
                     .then(data => {
                         
                         for (var i = 0; i < data.length; i++) {
                             const nuevoValor = select.options.length + 1;
                             const nuevoElemento = `${data[i]}`;
 
                             const newOption = document.createElement('option');
                             newOption.value = nuevoValor;
                             newOption.text = nuevoElemento;
 
                             select.appendChild(newOption);
                         }
                     })
                     .catch(error => {
                         console.error('Error al obtener los datos de la API', error);
                     });
 
 
 
 
                     /*CONSULTA DEL FILTRO*/
                 }
 
             }
         });
       });
         /*EVENTOS AL DAR CLICK A ALGUN RADIO BUTTON: CONSULTA DE CANDIDATOS POR DPTO, OCULTAR O MOSTRAR LISTA MCIPIOS*/
 
 
 
         // CLICK EN BOTON DE CONSULTAR CANDIDATO
         const openNewTabButton = document.getElementById('open-new-tab');
 
         openNewTabButton.addEventListener('click', function(event) {
             event.preventDefault()
             var nombreCandidato = document.getElementById("candidato")
             .options[document.getElementById("candidato").selectedIndex].textContent
             const page2Url = 'perfil.html?candidato='+nombreCandidato;
             openInNewTab(page2Url)
         });
 
 
         function openInNewTab(href) {
             Object.assign(document.createElement('a'), {
               target: '_blank',
               rel: 'noopener noreferrer',
               href: href,
             }).click();
         }
     
 
 
     
 });
 
 

// slider

const data = {
    "2020": {
        "Bogotá": 30,
        "Antioquia": 10,
        "Valle del Cauca": 25
    },
    "2021": {
        "Bogotá": 35,
        "Antioquia": 50,
        "Valle del Cauca": 20
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const paths = document.querySelectorAll('.delimPath');
    const popup = document.getElementById('info');
    const slider = document.getElementById('year-slider');
    const selectedYear = document.getElementById('selected-year');

    function getColor(value) {
        const colors = ['#ffccc', '#ff6666', '#ff3333', '#cc0000', '#660000'];
        if (value < 10) return colors[0];
        if (value < 20) return colors[1];
        if (value < 30) return colors[2];
        if (value < 40) return colors[3];
        return colors[4];
    }

    function updateColors(year) {
        const values = data[year];
        paths.forEach(path => {
            const departmentName = path.parentNode.getAttribute('xlink:title');
            const value = values[departmentName] || 0;
            path.style.fill = getColor(value);
        });
    }

    slider.addEventListener('input', (event) => {
        const year = event.target.value;
        selectedYear.textContent = year;
        updateColors(year);
    });

    paths.forEach(path => {
        path.addEventListener('mouseenter', (event) => {
            const name = event.target.parentNode.getAttribute('xlink:title');
            const rect = event.target.getBoundingClientRect();

            popup.style.display = 'block';
            popup.style.left = `${rect.left + window.scrollX}px`;
            popup.style.top = `${rect.top + window.scrollY}px`;
            popup.textContent = `Información de ${name}`;
        });

        path.addEventListener('mouseleave', () => {
            popup.style.display = 'none';
        });
    });

    // Inicializar colores con el año predeterminado
    updateColors(slider.value);
});

