var eventTypes = [
  {
    id: 1
    type: "time",
    metadata: {}
  },
  {
    id: 2,
    type: "sleep",
    metadata: {}
  },
  {
    id: 3,
    type: "sleep-sleep-wakeup",
    metadata: {
      description: "Calcula diferença entre horas de dormir e acordar"
    }
  }
]
var eventTypeAliases = {
  "fui dormir": "sleep"
}


/**
 * Retorna lista de horas dormidas baseado em eventos como:
 * - "dormi 8h": calcula 8*60 min de sono
 * - "boa noite" + "bomdia": calcula diferença entre horas
 *
 * @param  {Array}  eventsList  Array de Objetos
 * @return {Array}  Array de objetos a serem inseridos na Tabela dia-a-dia
 */
function getDayToDayFromEvents_sleepHours(eventsList) {
  return [];
}
