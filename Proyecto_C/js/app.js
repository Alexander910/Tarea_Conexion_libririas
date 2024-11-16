document.addEventListener('DOMContentLoaded', function () {
  // Selección del formulario y la tabla de tareas
  const taskForm = document.getElementById('taskForm');
  const taskTable = document.getElementById('taskTable');

  // Manejo del envío del formulario
  taskForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      // Obtener el valor de la tarea
      const taskInput = document.getElementById('task');
      const taskText = taskInput.value.trim();

      // Validar que el campo no esté vacío
      if (taskText === '') {
          Swal.fire({
              title: 'Campo vacío',
              text: 'Por favor, ingrese una tarea antes de agregarla.',
              icon: 'warning',
              confirmButtonText: 'OK'
          });
          return;
      }

      // Mostrar una alerta de carga mientras se envía la solicitud
      Swal.fire({
          title: 'Guardando tarea...',
          text: 'Por favor espere.',
          icon: 'info',
          showConfirmButton: false,
          allowOutsideClick: false
      });

      try {
          // Enviar la tarea al backend usando fetch
          const response = await fetch('./php', {  /* Aquí deberia dar la conexion si te sale calidad de todas formas mñanaa solo se entrega avances */
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ task: taskText })
          });

          const result = await response.json();

          if (result.success) {
              // Mostrar mensaje de éxito
              Swal.fire({
                  title: 'Tarea Guardada',
                  text: `Su tarea "${taskText}" se ha guardado con éxito!`,
                  icon: 'success',
                  confirmButtonText: 'OK'
              });

              // Opcional: agregar la tarea a la tabla directamente
              addTaskToTable(taskText);

              // Limpiar el formulario
              taskInput.value = '';
          } else {
              throw new Error(result.message);
          }
      } catch (error) {
          // Mostrar mensaje de error
          Swal.fire({
              title: 'Error',
              text: `No se pudo guardar la tarea: ${error.message}`,
              icon: 'error',
              confirmButtonText: 'OK'
          });
      }
  });

  /**
   * Agregar una tarea a la tabla.
   * @param {string} taskText - Texto de la tarea.
   */
  function addTaskToTable(taskText) {
      const tableBody = taskTable.querySelector('tbody');
      const newRow = document.createElement('tr');

      newRow.innerHTML = `
          <td>${taskText}</td>
          <td>
              <button class="btn btn-danger btn-sm delete-task">Eliminar</button>
          </td>
      `;

      tableBody.appendChild(newRow);
  }
});
