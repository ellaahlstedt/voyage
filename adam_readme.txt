ÄNDRINGAR I API:et


GET REQUESTS FÖR DESTINATIONS

HÄMTA ALLA REGIONER/LÄNDER/STÄDER

- Om ni vill hämta alla regioner/länder/städer så kan behöver ni bara en göra en GET-request som innehåller parametern TYPE. Parametern måste antingen vara region, country, city.	
	EXEMPEL: fetch("./logic/destinations.php?type=country").then(r => r.json()).then(console.log);


HÄMTA ALLA LÄNDER FÖR EN REGION ELLER ALLA STÄDER FÖR ETT LAND

- För att hämta en region/land/stad så måste ni ha med två parametrar: id (siffra) och type (region/country/city).
	EXEMPEL:
		fetch("./logic/destinations.php?id=1&type=region").then(r => r.json()).then(console.log);
		fetch("./logic/destinations.php?id=22&type=country").then(r => r.json()).then(console.log);
		fetch("./logic/destinations.php?id=102&type=city").then(r => r.json()).then(console.log);



- Om ni vill hämta alla länder som tillhör en viss region eller alla städer som tillhör en viss land då MÅSTE ni ange en till parameter som heter "all" som måste vara TRUE.
	EXEMPEL:
		*Prova fetcherna för att testa en GET-request*
	fetch("./logic/destinations.php?id=1&type=region&all=true").then(r => r.json()).then(console.log);
	fetch("./logic/destinations.php?id=1&type=region&all=true").then(r => r.json()).then(console.log);
	fetch("./logic/destinations.php?id=3&type=country&all=true").then(r => r.json()).then(console.log);
	fetch("./logic/destinations.php?id=3&type=country&all=true").then(r => r.json()).then(console.log);
	
	
POST REQUESTS FÖR DESTINATIONS

- För att lägga till en region/land/stad så behöver ni skicka med en sådan här request:

{
	userName: "john",
	field: "been" eller "liked",
	token: TOKEN_HÄR,
	type: "regions" eller "countries" eller "cities",
	id: id för regionen/landet/staden
}

- API:et kommer själv identifiera vilken region/land/stad det är.

DELETE REQUESTS FÖR DESTINATIONS

- För att ta bort en region/land/stad så behöver ni skicka med en sådan här body för requesten:

{
	userId: id för användaren,
	userName: användarnamn_här,
	field: "been" eller "liked",
	token: TOKEN_HÄR,
	type: "region" eller "country" eller "city" !!!OBS, INGET "s" eller "ies" i slutet som i POST-requests!!!!,
	id: id för regionen/landet/staden
}
