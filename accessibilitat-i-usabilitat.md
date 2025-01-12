# Preparació

## Tasques a Provar

### **1. Registre/Login**
- **Accessibilitat (LightHouse):** 100%
- **Observacions:**
  - Tant el procés de registre com el de login han estat totalment intuïtius.
  - Els usuaris no han trobat dificultats per accedir o registrar-se a l'aplicació.
- **Problemes identificats:** Cap.
- **Proposta de millora:** Cap en aquesta fase, ja que l'experiència és òptima.

---

### **2. Gestió de Reserves**
- **Accessibilitat (LightHouse):** 100%
- **Observacions:**
  - El botó per afegir reserves està ben posicionat i és fàcilment localitzable.
  - Els usuaris amb poca experiència tecnològica han trobat intuïtiu el procés de creació i finalització de reserves.
  - **Problema detectat:** Alguns usuaris no entenen la funcionalitat del torn, ja que només es notifica la necessitat d'obrir-lo en format d'error quan intenten finalitzar una reserva.
- **Proposta de millora:**
  - Mostrar un missatge proactiu que indiqui clarament la necessitat d'obrir el torn abans de crear o finalitzar una reserva, evitant així confusions.

---

### **3. Historial de Reserves**
- **Accessibilitat (LightHouse):** 100%
- **Observacions:**
  - **Secció Clients:** Els usuaris han trobat el botó "Historial" i han pogut consultar fàcilment l'historial de reserves d'un client concret.
  - **Secció Treballadors:** El botó "Historial" ha permès veure les reserves gestionades per un treballador específic.
  - **Secció Torns:** Els usuaris han trobat un botó per mostrar les reserves associades a un torn. Tot i així, ha calgut explicar que en aquesta secció només es mostren les reserves d'un mateix torn, fet que ha causat certa confusió inicial.
- **Problemes identificats:**
  - A la secció de clients i treballadors, no queda clar quin client o treballador correspon a les reserves mostrades.
- **Proposta de millora:**
  - Afegir una capçalera visible que indiqui el nom del client o treballador a la vista d'historial de reserves.
  - En la secció de torns, afegir un text descriptiu o una notificació que aclareixi que només es mostren les reserves d'un torn concret.

---

## Resum dels Resultats
### Problemes Identificats
1. **Gestió de Reserves:**
   - La necessitat d'obrir el torn només es comunica en forma d'error després d'intentar finalitzar una reserva, causant confusió.
2. **Historial de Reserves:**
   - Manca de claredat sobre quin client o treballador correspon a les reserves mostrades.

### Propostes de Millora
1. **Gestió de Reserves:**
   - Afegir un missatge proactiu per indicar que cal obrir un torn abans de crear o finalitzar reserves.
2. **Historial de Reserves:**
   - Afegir una capçalera descriptiva a les seccions de clients i treballadors per indicar clarament les reserves mostrades.
   - Afegir un text explicatiu a la secció de torns per contextualitzar millor la informació presentada.

---

## Implementació
### Millores Implementades
1. **Gestió de Reserves:**
   - S'ha afegit un missatge dinàmic visible durant el procés de creació de reserves per informar sobre la necessitat d'obrir un torn.
2. **Historial de Reserves:**
   - S'ha afegit una capçalera descriptiva a les seccions de clients i treballadors.

### Beneficis Aportats
- **Accessibilitat:** S'han reduït les confusions derivades d'una mala interpretació de les funcionalitats.
- **Usabilitat:** Els usuaris poden comprendre millor el context de les reserves i finalitzar les accions sense problemes.

---

## Conclusions
El procés d'avaluació ha permès identificar punts de millora clars en l'accessibilitat i usabilitat de l'aplicació. Amb la implementació de les propostes esmentades, es millora l'experiència de l'usuari i es redueix el risc d'errors, especialment per a persones amb poca experiència tecnològica.
