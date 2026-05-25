Tenemos por un lado un totem, que vamos a tener una tablet conectada. En esa tablet la idea es que haya un quiz cuyo objetivo es obtener el tipo de pelo de los usuarios que responden las preguntas. 

A continuacion te voy a mandar un listado de pantallas, las cuales deberian ser parte del quiz para obtener la informacion que necesitamos para definir el tipo de pelo. En base a las respuestas del quiz, no solo es necesario recolar esa info, sino que ademas poder recomendar un producto de la marca que se alinee con las necesidades del usuario que responde. El producto que las personas recibemn al responder el quiz es una muestra de una crema con un shot que la marca vende. Lo importante es poder segun las respuestas entregar el producto que necesite el cliente. 

Esta tablet esta pensada para que este ubicada de forma vertical en el totem. 

Las preguntas del quiz son simples, queremos dividir cada pregunta en pantallas distintas, acompañadas por animaciones, loading states que llamen la atencion y que esten alineados a la marca y sus productos. A continuacion te comento las pantallas que pensamos, podes sugerir recomendaciones y preguntar lo que no entiendas. 

Las opciones de las preguntas, no quiero que esten puestas en texto, sino que o imagen ilustrada o imagen generada pero que se vea represetativa con la respuesta. 

pantalla 1: animacion de un frasco tipo serum con gotero, que se va llenando con las gotas que caen (en loop) -

hay un boton de inicio el cual si haces clic va a pantalla 2
pantalla 2 (transicion):  splash de un liquido que termine en el logo de perla pli

pantalla 3: 
primer pregunta - Cómo se ve tu cabello el dia despues de lavarlo? 

opciones: 1) graso, 2) normal, 3) seco, 4) mixto

usuario responde > selecciona una de las 4 opciones > pantalla que muestra de alguna forma cual fue la respuesta seleccionada, dandole una especie de feedback al usuario > pasa a la siguiente pregunta

En el momento que pasa a la segunda pregunta, sucede una animacion tipo transicion a la siguiente pregunta. 

pantalla 4: 
segunda pregunta - como reacciona tu cabello al agua? 

opciones: 1) repele (tarda en mojarse completamente), 2) normal (absorbe humedad de forma equilibrada), 3) absorbe rapdio (se empapa al instante, pero se seca rapido) , 4) sugeri una repsuesta posible para esta opcion

usuario responde > selecciona una de las 4 opciones > pantalla que muestra de alguna forma cual fue la respuesta seleccionada, dandole una especie de feedback al usuario > pasa a la siguiente pregunta

En el momento que pasa a la siguiente pregunta, sucede una animacion tipo transicion a la siguiente pregunta. 

pantalla 5: 
tercer pregunta - Cual es la forma natural de tu cabello? 

opciones: 1) lacio, 2) ondulado, 3) ruloso, 4) sugeri una opcion 4

usuario responde > selecciona una de las 4 opciones > pantalla que muestra de alguna forma cual fue la respuesta seleccionada, dandole una especie de feedback al usuario > pasa a la siguiente pregunta

En el momento que pasa a la siguiente pregunta, sucede una animacion tipo transicion a la siguiente pregunta. 

pantalla 6: 
cuarta pregunta - Tenes decoloracion o reflejos? 

opciones: 1) ninguno, 2) parcial, 3) decoloracion total, 4) teñida (te tapas canas)

usuario responde > selecciona una de las 4 opciones > pantalla que muestra de alguna forma cual fue la respuesta seleccionada, dandole una especie de feedback al usuario > pasa a la siguiente pregunta

En el momento que pasa a la siguiente pregunta, sucede una animacion tipo transicion a la siguiente pregunta. 

pantalla 7: 
quinta pregunta - Cual es el grosor de tu pelo? 

opciones: 1) fino, 2) medio, 3) grueso 4) sugeri una opcion 4 

usuario responde > selecciona una de las 4 opciones > pantalla que muestra de alguna forma cual fue la respuesta seleccionada, dandole una especie de feedback al usuario > pasa a la siguiente pregunta

En el momento que pasa a la siguiente pregunta, sucede una animacion tipo transicion a la siguiente pregunta. 

pantalla 8: 
sexta pregunta - Como esta tu cuero cabelludo? 

opciones: 1) graso, 2) normal, 3) seco 4) sensible

usuario responde > selecciona una de las 4 opciones > pantalla que muestra de alguna forma cual fue la respuesta seleccionada, dandole una especie de feedback al usuario > pasa a la siguiente pregunta

En el momento que pasa a la siguiente pregunta, sucede una animacion tipo transicion a la siguiente pregunta. 

---- siempre tenemos que darle la opcion al usuario que pueda ir para atras (y si se seecciono, que pueda ver la repsuesta seleccionada)

Una vez que completo todas las preguntas, te muestra una pantalla final con las preguntas y las reespuestas completadas. De forma de que si quiere cambiar alguna repsuesta pueda hacerlo. 

Boton de "Finalizaste tu diagnostico capilar" - haces clic en el btn y te lleva a pantalla final que te muestra cual es tu tipo de pelo. Con el tipo de pelo, ademas te sugiere tu "rutina ideal de productos perla pli para el cuidado de tu pelo" - usa fotos de los productos de la web de perla pli para sugerir ej: serum + crema + shampoo o otra opcion. 

 Ahi aparece en la pantalla la opcion de "dejanos tu mail, y llevate una muestra de regalo para tu tipo de pelo".

Si la persona agrega mail ---> se va a dispensar el producto y se agradece. Esta informacion de tipo de pelo, diagnostico con respuesta y mail, SE DEBE GUARDAR EN UNA BASE DE DATOS PARA SU USO POSTERIOR!!! (mail, informacion de tipo de pelo, necesidad). No queremos usar una base de datos compleja, con que se guarde esta informacion en un google sheets, es suficiente. 
Si la persona NO agrega mail ----> mensaje de gracias por participar, seguinos en instagram y enterate de nuestras promos. qr con el ig de perla pli. 

transicion de fin.


P: Para las imágenes de las opciones, ¿qué estilo preferís?
R: Imágenes generadas tipo realistas/fotográficas

P: ¿Cómo definimos el 'tipo de pelo' final a partir de las 6 respuestas?
R: Una etiqueta simple tipo 'Pelo seco con tendencia a frizz' (yo armo la lógica de mapeo)

P: Sobre la base de datos en Google Sheets: ¿cómo se va a hacer la escritura?
R: No sé, recomendá lo más simple que funcione

P: ¿Necesitás que ya empiece a generar algo o solo querés la planificación primero?
R: Generá YA un prototipo HTML funcional del quiz completo para ver


Lo que entregamos como producto son pocillos de crema con shots integrados, las opciones son 4: Selene (shot control de frizz), Lumina (shot de brillo), Aquaella (nutricion e hidracion), Fortana (fuerza y resistencia). 

Y mantene la estetica de la web de perla pli -  https://perlapli.com/collections/todo-perla-pli

Usa esta imagen de referecia para usar la animacion del principio.