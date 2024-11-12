Proyecto final Desarrollo móvil 

Todo debe ir documentado en GitHub (Readme.md) 

Definición App -> Problemática  

Actualmente, el sistema eléctrico no cuenta con un registro detallado del consumo energético, lo que limita el conocimiento de los picos de consumo en determinados momentos del día o en días específicos. Para optimizar los recursos y fomentar un consumo más responsable, nace la idea de Solar Link: una aplicación innovadora que permite a los usuarios monitorear y gestionar su energía solar. 

Con Solar Link, cada persona podrá contribuir al medio ambiente y tomar el control de su consumo energético. La plataforma brindará información en tiempo real sobre el consumo y el rendimiento del sistema de energía solar, además de centralizar todas las funciones en un solo lugar. Entre sus beneficios, los usuarios podrán realizar pagos, recibir alertas sobre el estado de su sistema, y contactar a técnicos en caso de fallas, entre otras facilidades. 

Solar Link no solo ayudará a reducir la huella ambiental, sino que también proporcionará una experiencia de consumo energético inteligente, accesible y sostenible. 

 

Arquitectura (5 características de dicha arquitectura) 

a arquitectura en capas es un diseño de software ampliamente utilizado que organiza el sistema en grupos de componentes que se disponen en capas. Aquí tienes algunas de sus características clave: 

Modularidad: Cada capa es independiente y contiene elementos con responsabilidades similares, lo que facilita el mantenimiento y la evolución del sistema. 

Separación de responsabilidades: Cada capa tiene una responsabilidad específica, lo que promueve una clara separación de preocupaciones. Esto significa que los cambios en una capa no afectan directamente a otras capas. 

Interacción restringida: Normalmente, una capa solo interactúa con las capas adyacentes. Esto significa que la capa superior se comunica con la capa inmediatamente inferior, reduciendo las dependencias y mejorando la manejabilidad. 

Reusabilidad: Los componentes de una capa pueden ser reutilizados en diferentes partes del sistema o en otros sistemas, si las interfaces están bien definidas. 

Escalabilidad: Al poder agregar nuevas capas o escalar verticalmente cada una de ellas, la arquitectura permite la expansión del sistema sin grandes cambios estructurales. 

Flexibilidad: Cambiar la implementación de una capa no afecta a otras capas siempre y cuando las interfaces entre capas se mantengan constantes. 

Facilidad de prueba: Al estar dividida en partes bien definidas, es más sencillo realizar pruebas unitarias y de integración en cada capa. 

 

Funcionalidades adicionales 

Alertas y Notificaciones Inteligentes: 

Notificaciones en tiempo real sobre eficiencia baja, altas temperaturas, o carga baja de las baterías. 

Recordatorios de mantenimiento preventivo y alertas de posibles fallas antes de que ocurran. 

Optimización del Consumo Energético: 

Análisis de patrones de consumo energético en el hogar. 

Recomendaciones para optimizar el uso de energía y reducir la factura eléctrica. 

Comparación y Estadísticas: 

Comparativas mensuales y anuales de producción de energía. 

Estadísticas detalladas de eficiencia por temporada o clima, ayudando a planificar futuros proyectos de expansión. 

Gestión de Respaldo: 

Información sobre la carga de respaldo en caso de emergencia y duración estimada de las baterías. 

Alternativas para ajustar el consumo en caso de cortes de energía. 

Asistente Virtual: 

Asistencia guiada para la solución de problemas comunes. 

Respuestas rápidas a preguntas sobre optimización y mantenimiento. 

Integración con Sistemas de Casa Inteligente: 

Sincronización con otros dispositivos de la casa para adaptar el uso de energía según las necesidades diarias. 

Criterios de éxito: 

Facilidad de uso: Lograr que al menos el 90% de los usuarios califiquen la interfaz como intuitiva y fácil de usar en encuestas de satisfacción. 

Tiempo de carga: Asegurar que el tiempo de carga de la aplicación no exceda los 3 segundos en el 95% de las interacciones. 

Actualización de datos en tiempo real: Refrescar los datos de consumo y generación de energía en menos de 5 segundos, para asegurar que el usuario siempre tenga información actualizada. 

Precisión del monitoreo: Mantener una precisión en los datos de consumo y generación de energía con un margen de error inferior al 2%. 

Entrega oportuna: Enviar la notificación de pago al menos 7 días antes de la fecha de vencimiento de la factura y enviar recordatorios adicionales 3 días y 1 día antes, si el pago aún no se ha realizado. 

Confirmación de entrega: Asegurar que el 95% de las notificaciones lleguen exitosamente a los usuarios, sin retrasos. 

 

Historias de usuario (Necesidades, dolores) 

 Monitoreo del Consumo Energético 

Historia: Como usuario de SolarLink, quiero ver el consumo energético de mi hogar en tiempo real, para entender cuándo se consume más energía y ajustar mi uso en esos momentos. 

Necesidad: Monitoreo constante y en tiempo real del consumo para optimizar el uso de energía. 

Dolor: Sin información actualizada, es difícil saber cuánta energía se consume en diferentes momentos del día y qué dispositivos están demandando más. 

 Notificaciones de Factura 

Historia: Como usuario, quiero recibir recordatorios antes de la fecha de vencimiento de mi factura, para asegurarme de pagar a tiempo y evitar cargos adicionales. 

Necesidad: Recordatorios anticipados y claros de las fechas de pago. 

Dolor: Olvidar la fecha límite de pago y enfrentarse a cargos adicionales por retraso o desconexión del servicio. 

 Notificaciones de Fallas del Sistema 

Historia: Como usuario de SolarLink, quiero recibir notificaciones si ocurre una falla en mi sistema de energía solar, para que pueda contactar a un técnico y evitar la interrupción del servicio. 

Necesidad: Detección y notificación inmediata de fallas. 

Dolor: No enterarse de los problemas técnicos a tiempo, lo que podría ocasionar pérdida de energía o daños en el sistema. 

Control Remoto de Dispositivos 

Historia: Como usuario, quiero poder controlar ciertos dispositivos desde la aplicación de SolarLink, para reducir el consumo de energía cuando no los necesito. 

Necesidad: Acceso remoto a dispositivos conectados para optimizar el consumo. 

Dolor: Gastar energía en dispositivos que están activos sin que sea necesario, lo que aumenta los costos. 

Comparación de Consumo 

Historia: Como usuario, quiero comparar mi consumo actual con el de semanas o meses anteriores, para ver si estoy logrando reducir el uso de energía. 

Necesidad: Acceso a un historial de consumo detallado para tomar decisiones informadas. 

Dolor: No tener una referencia para medir el progreso de la eficiencia energética y no saber si las acciones de ahorro están dando resultado. 

Acceso a Soporte Técnico 

Historia: Como usuario de SolarLink, quiero tener una opción para contactar rápidamente a un técnico en caso de problemas, para resolver cualquier inconveniente sin demoras. 

Necesidad: Asistencia técnica accesible y rápida desde la misma plataforma. 

Dolor: Tener que buscar ayuda por fuera de la aplicación cuando ocurre una falla, lo que puede ser tardado y frustrante. 

Información sobre Ahorros Económicos y Ambientales 

Historia: Como usuario, quiero ver cuánta energía y dinero estoy ahorrando cada mes gracias a mi sistema solar, así como el impacto ambiental de mi consumo. 

Necesidad: Reportes sobre los ahorros y el impacto ambiental. 

Dolor: No tener claridad sobre los beneficios económicos y ecológicos de usar energía solar. 

 

Requerimientos  

Restricciones  

 

Riesgos (confidencialidad) 

Estilos de arquitectura 

  

Diseño 

UML 

Figma 

Desarrollo 

Testing  

Usuario externo prueba la app y da feedback 

Google Forms para feedback 

Presentación 

Requisitos Técnicos 

Frontend, backend, database 

Gestion de usuarios  

UI-UX 

Navegación (Tabs o drawer) 

Implementación IA (Gemini) 

Gestion de datos locales (mantener sesión iniciada) 

Lector QR o toma de fotos 

integración con librerías (SKIA, stripe, ) 

API externa 

 