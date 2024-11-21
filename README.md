 # SolarLink Support 

 

## Problemática  

Actualmente, el sistema eléctrico no cuenta con un registro detallado del consumo energético, lo que limita el conocimiento de los picos de consumo en determinados momentos del día o en días específicos. Para optimizar los recursos y fomentar un consumo más responsable, nace la idea de Solar Link: una aplicación innovadora que permite a los usuarios monitorear y gestionar su energía solar. 

Con SolarLink, cada persona podrá contribuir al medio ambiente y tomar el control de su consumo energético. La plataforma brindará información en tiempo real sobre el consumo y el rendimiento del sistema de energía solar, además de centralizar todas las funciones en un solo lugar. Entre sus beneficios, los usuarios podrán realizar pagos, recibir alertas sobre el estado de su sistema, y contactar a técnicos en caso de fallas, entre otras facilidades. 

Solar Link no solo ayudará a reducir la huella ambiental, sino que también proporcionará una experiencia de consumo energético inteligente, accesible y sostenible. 

 

## Arquitectura  

a arquitectura en capas es un diseño de software ampliamente utilizado que organiza el sistema en grupos de componentes que se disponen en capas. Aquí tienes algunas de sus características clave: 

Modularidad: Cada capa es independiente y contiene elementos con responsabilidades similares, lo que facilita el mantenimiento y la evolución del sistema. 

Separación de responsabilidades: Cada capa tiene una responsabilidad específica, lo que promueve una clara separación de preocupaciones. Esto significa que los cambios en una capa no afectan directamente a otras capas. 

Interacción restringida: Normalmente, una capa solo interactúa con las capas adyacentes. Esto significa que la capa superior se comunica con la capa inmediatamente inferior, reduciendo las dependencias y mejorando la manejabilidad. 

Reusabilidad: Los componentes de una capa pueden ser reutilizados en diferentes partes del sistema o en otros sistemas, si las interfaces están bien definidas. 

Escalabilidad: Al poder agregar nuevas capas o escalar verticalmente cada una de ellas, la arquitectura permite la expansión del sistema sin grandes cambios estructurales. 

Flexibilidad: Cambiar la implementación de una capa no afecta a otras capas siempre y cuando las interfaces entre capas se mantengan constantes. 

Facilidad de prueba: Al estar dividida en partes bien definidas, es más sencillo realizar pruebas unitarias y de integración en cada capa. 

 

## Funcionalidades adicionales 

### Alertas y Notificaciones Inteligentes: 

Notificaciones en tiempo real sobre eficiencia baja, altas temperaturas, o carga baja de las baterías. 

Recordatorios de mantenimiento preventivo y alertas de posibles fallas antes de que ocurran. 

### Optimización del Consumo Energético: 

Análisis de patrones de consumo energético en el hogar. 

Recomendaciones para optimizar el uso de energía y reducir la factura eléctrica. 

### Comparación y Estadísticas: 

Comparativas mensuales y anuales de producción de energía. 

Estadísticas detalladas de eficiencia por temporada o clima, ayudando a planificar futuros proyectos de expansión. 

### Asistente Virtual: 

Asistencia guiada para la solución de problemas comunes. 

Respuestas rápidas a preguntas sobre optimización y mantenimiento. 

## Criterios de éxito: 

### Facilidad de uso: Lograr que al menos el 90% de los usuarios califiquen la interfaz como intuitiva y fácil de usar en encuestas de satisfacción. 

### Tiempo de carga: Asegurar que el tiempo de carga de la aplicación no exceda los 3 segundos en el 95% de las interacciones. 

### Actualización de datos en tiempo real: Refrescar los datos de consumo y generación de energía en menos de 5 segundos, para asegurar que el usuario siempre tenga información actualizada. 

### Precisión del monitoreo: Mantener una precisión en los datos de consumo y generación de energía con un margen de error inferior al 2%. 

### Entrega oportuna: Enviar la notificación de pago al menos 7 días antes de la fecha de vencimiento de la factura y enviar recordatorios adicionales 3 días y 1 día antes, si el pago aún no se ha realizado. 

### Confirmación de entrega: Asegurar que el 95% de las notificaciones lleguen exitosamente a los usuarios, sin retrasos. 

Historias de Usuario (Necesidades y Dolores) 

Monitoreo del Consumo Energético 

Historia: 

"Como habitante de la costa en Barranquilla, con un alto consumo de energía debido a que trabajo desde casa, estaba preocupado por los altos costos del kWh. Aunque consideré los paneles solares, no me sentía seguro sobre su funcionalidad ni el impacto real en mis facturas. 

Todo cambió cuando conocí SolarLink: no solo ofrecieron una solución asequible con financiación flexible, sino que me brindaron herramientas claras para monitorear y pagar mi consumo energético fácilmente desde su app. Gracias a ellos, he reducido mis costos, controlo mi energía de forma eficiente y me siento parte de un futuro sostenible. Ahora estoy feliz de haber hecho la transición a energía solar, dejando atrás los precios elevados." 

Necesidad: 

Acceso a datos actualizados sobre consumo energético, generación solar y ahorros acumulados. 

Visualización clara del impacto en la factura y rendimiento del sistema solar. 

Alertas sobre problemas técnicos o caídas de rendimiento. 

Soporte técnico accesible desde la app. 

Dolor: 

Dificultad para monitorear el consumo en tiempo real y optimizar el uso de energía. 

Falta de notificaciones oportunas sobre problemas técnicos o rendimiento del sistema. 

 

Notificaciones de Factura 

Historia: 

"Como usuario, quiero recibir recordatorios antes de la fecha de vencimiento de mi factura, para asegurarme de pagar a tiempo y evitar cargos adicionales." 

Necesidad: 

Recordatorios anticipados y claros sobre fechas de pago. 

Dolor: 

Cargos adicionales o desconexión del servicio por olvidar el pago. 

 

Notificaciones de Fallas del Sistema 

Historia: 

"Como usuario de SolarLink, quiero recibir notificaciones si ocurre una falla en mi sistema de energía solar, para contactar a un técnico y evitar interrupciones." 

Necesidad: 

Notificaciones inmediatas sobre fallas del sistema. 

Dolor: 

Pérdida de energía o daños por no detectar problemas a tiempo. 

 

Control Remoto de Dispositivos 

Historia: 

"Como usuario, quiero controlar ciertos dispositivos desde la app de SolarLink, para reducir el consumo cuando no los necesito." 

Necesidad: 

Control remoto de dispositivos conectados para optimizar el consumo energético. 

Dolor: 

Incremento en costos por dispositivos activos innecesariamente. 

 

Comparación de Consumo 

Historia: 

"Como usuario, quiero comparar mi consumo actual con el de semanas o meses anteriores, para evaluar mi progreso en eficiencia energética." 

Necesidad: 

Historial de consumo detallado para tomar decisiones informadas. 

Dolor: 

Dificultad para medir la efectividad de las estrategias de ahorro. 

 

Acceso a Soporte Técnico 

Historia: 

"Como usuario de SolarLink, quiero contactar rápidamente a un técnico en caso de problemas, para resolver inconvenientes sin demoras." 

Necesidad: 

Asistencia técnica accesible desde la misma plataforma. 

Dolor: 

Frustración por depender de canales externos para obtener soporte. 

 

Información sobre Ahorros Económicos y Ambientales 

Historia: 

"Como usuario, quiero ver cuánto dinero y energía estoy ahorrando cada mes gracias a mi sistema solar, así como el impacto ambiental de mi consumo." 

Necesidad: 

Reportes claros sobre ahorros económicos y ecológicos. 

Dolor: 

Falta de claridad sobre los beneficios de usar energía solar. 

 

## Requerimientos  

## Restricciones  

## Riesgos (confidencialidad) 

 

 
