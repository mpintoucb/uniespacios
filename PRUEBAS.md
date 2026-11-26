# Pruebas funcionales · UniEspacios v1.0
 
| ID | Caso | Pasos | Resultado esperado | Obtenido | Estado |
|----|------|-------|--------------------|----------|--------|
| P01 | Buscar por tipo | Inicio → Laboratorio → Buscar | Solo aparece Laboratorio L3 | | |
| P02 | Ver detalle | Resultados → Sala Multimedia | Capacidad, ubicación y equipamiento | | |
| P03 | Reservar | Detalle → Reservar → fecha y horario → Confirmar | Pantalla «Reserva realizada» con código UE-… | | |
| P04 | La reserva se guarda | Mis reservas | Aparece la reserva recién hecha | | |
| P05 | Persistencia | Ctrl + C en la API → npm run dev → Mis reservas | La reserva sigue ahí | | |
| P06 | Cancelar | Mis reservas → reserva → Cancelar → Sí | Ya no aparece como activa | | |
| P07 | Dato inválido (400) | Navegador: localhost:3000/api/espacios?tipo=Piscina | {"error":"Tipo de espacio no válido"} | | |
| P08 | No existe (404) | Navegador: localhost:3000/api/espacios/999 | {"error":"Espacio no encontrado"} | | |
| P09 | API apagada | Ctrl + C en la API → Confirmar una reserva | Aviso «No se pudo conectar con la API…» | | |
| P10 | Celular | Repetir P01 a P04 en Expo Go | Igual que en la web | | |
