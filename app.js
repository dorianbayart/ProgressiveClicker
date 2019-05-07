fps = 20;
delay = Math.floor(1000/fps);
precision = 100;
constProgress = 108;

BIG_NUMBERS = [
	'',
	'mille',
	'million',
	'milliard', /* pow(10, 9) */
	'billion',
	'billiard',
	'trillion',
	'trilliard',
	'quadrillion',
	'quadrilliard',
	'quintillion', /* pow(10, 30) */
	'quintilliard',
	'sextillion',
	'sextilliard',
	'septillion',
	'septilliard',
	'octillion',
	'octilliard',
	'nonillion',
	'nonilliard',
	'décillion', /* pow(10, 60) */
	'décilliard',
	'unodécillion',
	'unodécilliard',
	'duodécillion',
	'duodécilliard',
	'trédécillion',
	'trédécilliard',
	'quattuordécillion',
	'quattuordécilliard',
	'quindécillion', /* pow(10, 90) */
	'quindécilliard',
	'sexdécillion',
	'sexdécilliard', /* pow(10, 99) */
	'septendécillion',
	'septendécilliard',
	'octodécillion',
	'octodécilliard',
	'nonidécillion',
	'nonidécilliard',
	'vigintillion' /* pow(10, 120) */
];

levelRestarted = 0;

villageois = 0;
villageoisDispo = 0;
nourriture = 0;
bois = 0;
or = 0;
pierre = 0;

hotelDeVille = {
	name: 'Hôtel de ville',
	level: 1,
	villageoisMax: 5,
	gain: 0,
	requiredCitizen: 0,
	upgradeCost: [
		{
			type: 'nourriture',
			price: 25
		},
		{
			type: 'bois',
			price: 25
		},
		{
			type: 'or',
			price: 25
		},
		{
			type: 'pierre',
			price: 25
		}
	],
	upgradeGain: 5
}

citoyen = {
	name: 'Villageois',
	level: 0,
	gain: 1,
	cost: [
		{
			type: 'nourriture',
			price: 10
		}
	],
	automaticGain: 0,
	upgradeCost: [
		{
			type: 'nourriture',
			price: 75
		}
	],
	upgradeGain: 0.1
}

nourriture_clic = {
	level: 0,
	gain: 1,
	upgradeCost: [
		{
			type: 'nourriture',
			price: 250
		}
	],
	constProgress: 1000, /* x10 */
	constProgressUpgrade: 1200 /* x12 */
}

bois_clic = {
	level: 0,
	gain: 1,
	upgradeCost: [
		{
			type: 'bois',
			price: 250
		}
	],
	constProgress: 1000, /* x10 */
	constProgressUpgrade: 1200 /* x12 */
}

or_clic = {
	level: 0,
	gain: 1,
	upgradeCost: [
		{
			type: 'or',
			price: 250
		}
	],
	constProgress: 1000, /* x10 */
	constProgressUpgrade: 1200 /* x12 */
}

pierre_clic = {
	level: 0,
	gain: 1,
	upgradeCost: [
		{
			type: 'pierre',
			price: 250
		}
	],
	constProgress: 1000, /* x10 */
	constProgressUpgrade: 1200 /* x12 */
}

ferme = {
	name: 'Ferme',
	level: 0,
	gain: 0,
	requiredCitizen: 1,
	upgradeCost: [
		{
			type: 'bois',
			price: 25
		},
		{
			type: 'or',
			price: 5
		}
	],
	upgradeGain: 1
}

scierie = {
	name: 'Scierie',
	level: 0,
	gain: 0,
	requiredCitizen: 1,
	upgradeCost: [
		{
			type: 'nourriture',
			price: 15
		},
		{
			type: 'pierre',
			price: 10
		}
	],
	upgradeGain: 1
}

mineOr = {
	name: 'Mine d\'or',
	level: 0,
	gain: 0,
	requiredCitizen: 1,
	upgradeCost: [
		{
			type: 'nourriture',
			price: 20
		},
		{
			type: 'bois',
			price: 20
		},
		{
			type: 'pierre',
			price: 30
		}
	],
	upgradeGain: 1
}

carriere = {
	name: 'Carrière',
	level: 0,
	gain: 0,
	requiredCitizen: 1,
	upgradeCost: [
		{
			type: 'nourriture',
			price: 20
		},
		{
			type: 'bois',
			price: 20
		},
		{
			type: 'or',
			price: 10
		}
	],
	upgradeGain: 1
}
	


$.when( $.ready ).then(function() {
	
	initialize();
	
	setInterval(updateValues, delay);
	setInterval(updateContent, delay*4);
	setInterval(hideOrDisplay, delay*10);
	
});

function initialize() {
	hideInitialization();
}

function hideInitialization() {
	$('#hotel_de_ville_card').hide();
	$('#hotel_de_ville_upgrade_components').hide();
	$('#nourriture_card').hide();
	$('#bois_card').hide();
	$('#or_card').hide();
	$('#pierre_card').hide();
	
	$('#noAvailableCitizenPopup').hide();
	$('#tip_limitVillageois').hide();
	
	$('#auto').hide();
	$('#citoyen_auto_upgradable').hide();
	
	$('#nourritureUpgradeCard').hide();
	$('#boisUpgradeCard').hide();
	$('#orUpgradeCard').hide();
	$('#pierreUpgradeCard').hide();
	
	$('#restart').hide();
}


function updateValues() {
	calculateValues();
	
	// Header bar
	$('#villageois').text( Math.floor(villageois) );
	$('#villageoisDispo').text( Math.floor(villageoisDispo) );
	$('#villageoisMax').text( hotelDeVille.villageoisMax );
	$('#nourriture').text( formatNumber( ferme.gain > 1 ? Math.floor(nourriture) : math_floor_10(nourriture) ) );
	$('#bois').text( formatNumber( scierie.gain > 1 ? Math.floor(bois) : math_floor_10(bois) ) );
	$('#or').text( formatNumber( mineOr.gain > 1 ? Math.floor(or) : math_floor_10(or) ) );
	$('#pierre').text( formatNumber( carriere.gain > 1 ? Math.floor(pierre) : math_floor_10(pierre) ) );
}


function calculateValues() {
	villageois = math_floor(villageois + citoyen.automaticGain / fps);
	villageoisDispo = math_floor(villageoisDispo + citoyen.automaticGain / fps);
	nourriture = math_floor(nourriture + ferme.gain / fps);
	bois = math_floor(bois + scierie.gain / fps);
	or = math_floor(or + mineOr.gain / fps);
	pierre = math_floor(pierre + carriere.gain / fps);
}

function updateContent() {
	// Clic
	$('#nourriture_gain_clic').text( nourriture_clic.gain );
	$('#nourriture_clic_upgradeCost').text( costString(nourriture_clic.upgradeCost) );
	$('#nourriture_clic_actual_gain').text( '+' + nourriture_clic.gain );
	$('#nourriture_clic_future_gain').text( '+' + math_floor(nourriture_clic.gain * nourriture_clic.constProgress / 100) );
	$('#bois_gain_clic').text( bois_clic.gain );
	$('#bois_clic_upgradeCost').text( costString(bois_clic.upgradeCost) );
	$('#bois_clic_actual_gain').text( '+' + bois_clic.gain );
	$('#bois_clic_future_gain').text( '+' + math_floor(bois_clic.gain * bois_clic.constProgress / 100) );
	$('#or_gain_clic').text( or_clic.gain );
	$('#or_clic_upgradeCost').text( costString(or_clic.upgradeCost) );
	$('#or_clic_actual_gain').text( '+' + or_clic.gain );
	$('#or_clic_future_gain').text( '+' + math_floor(or_clic.gain * or_clic.constProgress / 100) );
	$('#pierre_gain_clic').text( pierre_clic.gain );
	$('#pierre_clic_upgradeCost').text( costString(pierre_clic.upgradeCost) );
	$('#pierre_clic_actual_gain').text( '+' + pierre_clic.gain );
	$('#pierre_clic_future_gain').text( '+' + math_floor(pierre_clic.gain * pierre_clic.constProgress / 100) );
	
	// Auto buy villageois
	if( $('#auto_villageois').is(":checked") && isClickable(citoyen) ) {
		$('#citoyen_clic').click();
	}
	
	// Hotel
	$('#hotel_de_ville_name').text( hotelDeVille.name );
	$('#hotel_de_ville_level').text( hotelDeVille.level );
	$('#hotel_de_ville_villageois_max').text( hotelDeVille.villageoisMax );
	$('#hotel_de_ville_gain').text( hotelDeVille.gain );
	$('#hotel_de_ville_upgradeCost').text( costString(hotelDeVille.upgradeCost) );
	$('#hotel_de_ville_upgradedGain').text( hotelDeVille.upgradedGain );
	
	// Citizens
	$('#villageois_gain_clic').text( citoyen.gain );
	$('#citoyen_cost').text( costString(citoyen.cost) );
	$('#citoyen_upgradeCost').text( costString(citoyen.upgradeCost) );
	
	// Food card
	$('#nourriture_name').text( ferme.name );
	$('#nourriture_level').text( ferme.level );
	$('#nourriture_gain').text( ferme.gain );
	$('#nourriture_upgradeCost').text( costString(ferme.upgradeCost) );
	$('#nourriture_upgradedGain').text( '+' + ferme.upgradeGain + ' ' + '/ s' );
	
	// Wood card
	$('#bois_name').text( scierie.name );
	$('#bois_level').text( scierie.level );
	$('#bois_gain').text( scierie.gain );
	$('#bois_upgradeCost').text( costString(scierie.upgradeCost) );
	$('#bois_upgradedGain').text( '+' + scierie.upgradeGain + ' ' + '/ s' );
	
	// Gold card
	$('#or_name').text( mineOr.name );
	$('#or_level').text( mineOr.level );
	$('#or_gain').text( mineOr.gain );
	$('#or_upgradeCost').text( costString(mineOr.upgradeCost) );
	$('#or_upgradedGain').text( '+' + mineOr.upgradeGain + ' ' + '/ s' );
	
	// Stone card
	$('#pierre_name').text( carriere.name );
	$('#pierre_level').text( carriere.level );
	$('#pierre_gain').text( carriere.gain );
	$('#pierre_upgradeCost').text( costString(carriere.upgradeCost) );
	$('#pierre_upgradedGain').text( '+' + carriere.upgradeGain + ' ' + '/ s' );
	
	updateUpgradeButtons();
}

function hideOrDisplay() {
	// Hide tips after a moment
	if( $('#tip_recolteManuelle').is(':visible') && (nourriture > 100 || bois > 100 || or > 100 || pierre > 100) ) {
		$('#tip_recolteManuelle').hide(2500);
	}
	if( $('#tip_gestionVillageois').is(':visible') && (villageois > 20) ) {
		$('#tip_gestionVillageois').delay(1000).hide(2500);
	}
	if( $('#nourriture_blockquote').is(':visible') && (ferme.level > 0) ) {
		$('#nourriture_blockquote').delay(1000).hide(2500);
	}
	if( $('#bois_blockquote').is(':visible') && (scierie.level > 0) ) {
		$('#bois_blockquote').delay(1000).hide(2500);
	}
	if( $('#or_blockquote').is(':visible') && (mineOr.level > 0) ) {
		$('#or_blockquote').delay(1000).hide(2500);
	}
	if( $('#pierre_blockquote').is(':visible') && (carriere.level > 0) ) {
		$('#pierre_blockquote').delay(1000).hide(2500);
	}
	
	/* Popup message */
	if( !$('#auto_villageois').is(":checked") && $('#noAvailableCitizenPopup').is(':hidden') && (villageoisDispo === 0) && $('#hotel_de_ville_card').is(':visible') && villageois > 0 ) {
		$('#noAvailableCitizenPopup').delay(500).show(400);
	} else if( $('#noAvailableCitizenPopup').is(':visible') && (villageoisDispo > 0) ) {
		$('#noAvailableCitizenPopup').hide(400);
	}

	if( $('#auto').is(':hidden') && $('#hotel_de_ville_card').is(':visible') ) {
		if( $('#tip_limitVillageois').is(':hidden') && (villageois === hotelDeVille.villageoisMax) ) {
			$('#tip_limitVillageois').delay(500).show(400);
		} else if ( $('#tip_limitVillageois').is(':visible') && (villageois !== hotelDeVille.villageoisMax) ) {
			$('#tip_limitVillageois').delay(500).hide(400);
		}
	}
	
	
	/* Clics */
	if( $('#hotel_de_ville_card').is(':hidden') && ( nourriture > 0 || bois > 0 || or > 0 || pierre > 0 ) ) {
		$('#hotel_de_ville_card').show(400);
	}
	if( $('#nourritureUpgradeCard').is(':hidden') && nourriture > math_floor(nourriture_clic.upgradeCost[0].price * 85/100)) {
		$('#nourritureUpgradeCard').show(400);
	}
	if( $('#boisUpgradeCard').is(':hidden') && bois > math_floor(bois_clic.upgradeCost[0].price * 85/100)) {
		$('#boisUpgradeCard').show(400);
	}
	if( $('#orUpgradeCard').is(':hidden') && or > math_floor(or_clic.upgradeCost[0].price * 85/100)) {
		$('#orUpgradeCard').show(400);
	}
	if( $('#pierreUpgradeCard').is(':hidden') && pierre > math_floor(pierre_clic.upgradeCost[0].price * 85/100)) {
		$('#pierreUpgradeCard').show(400);
	}
	
	
	if( $('#nourriture_card').is(':hidden') && villageois > 0 ) {
		$('#nourriture_card').show(400);
	}
	
	if( $('#bois_card').is(':hidden') && ferme.gain > 0 ) {
		$('#bois_card').show(400);
	}
	
	if( $('#or_card').is(':hidden') && scierie.gain > 0 ) {
		$('#or_card').show(400);
	}
	
	if( $('#pierre_card').is(':hidden') && mineOr.gain > 0 ) {
		$('#pierre_card').show(400);
	}
	
	if( $('#hotel_de_ville_upgrade_components').is(':hidden') && (
		/*( carriere.gain > 0 )
		|| */(nourriture >= 20 && bois >= 20 && or >= 20 && pierre >= 20)
		|| ( villageois === 5 )
		)) {
		$('#hotel_de_ville_upgrade_components').show(400);
	}
	
	if( $('#auto').is(':hidden') && nourriture > 500 ) {
		$('#auto').show(1000);
	}
	
	if( $('#restart').is(':hidden') && hotelDeVille.level > 9 ) {
		$('#restart').fadeIn(1000);
	}
}


function updateUpgradeButtons() {
	$('.upgradeButton').each(function( i ) {
		let upgradable = false;
		if( $( this ).is( '#hotel_de_ville_upgrade' ) ) {
			upgradable = isUpgradable(hotelDeVille);
		} else if( $( this ).is( '#citoyen_clic' ) ) {
			upgradable = isClickable(citoyen);
		} else if( $( this ).is( '#citoyen_upgrade' ) ) {
			upgradable = isUpgradable(citoyen);
		} else if( $( this ).is( '#nourriture_upgrade' ) ) {
			upgradable = isUpgradable(ferme);
		} else if( $( this ).is( '#bois_upgrade' ) ) {
			upgradable = isUpgradable(scierie);
		} else if( $( this ).is( '#or_upgrade' ) ) {
			upgradable = isUpgradable(mineOr);
		} else if( $( this ).is( '#pierre_upgrade' ) ) {
			upgradable = isUpgradable(carriere);
		} else if( $( this ).is( '#nourriture_clic_upgrade' ) ) {
			upgradable = isUpgradable(nourriture_clic);
		} else if( $( this ).is( '#bois_clic_upgrade' ) ) {
			upgradable = isUpgradable(bois_clic);
		} else if( $( this ).is( '#or_clic_upgrade' ) ) {
			upgradable = isUpgradable(or_clic);
		} else if( $( this ).is( '#pierre_clic_upgrade' ) ) {
			upgradable = isUpgradable(pierre_clic);
		}
		if( $( this ).hasClass( 'disabled' ) && upgradable ) {
			$( this ).removeClass( "disabled" );
		} else if( !$( this ).hasClass( 'disabled' ) && !upgradable ) {
			$( this ).addClass( "disabled" );
		}
		
	});
}

function isUpgradable(batiment) {
	let isUpgradable = true;
	$.each(batiment.upgradeCost, function( j ) {
		switch($( this )[0].type) {
			case 'nourriture':
				if($( this )[0].price > nourriture) {
					isUpgradable = false;
					return false;
				}
				break;
			case 'bois':
				if($( this )[0].price > bois) {
					isUpgradable = false;
					return false;
				}
				break;
			case 'or':
				if($( this )[0].price > or) {
					isUpgradable = false;
					return false;
				}
				break;
			case 'pierre':
				if($( this )[0].price > pierre) {
					isUpgradable = false;
					return false;
				}
				break;
		}
		return true;
	});
	if(batiment.requiredCitizen > villageoisDispo) {
		isUpgradable = false;
	}
	return isUpgradable;
}

function isClickable(batiment) { // For Citizen
	let isUpgradable = true;
	$.each(batiment.cost, function( j ) {
		switch($( this )[0].type) {
			case 'nourriture':
				if($( this )[0].price > nourriture) {
					isUpgradable = false;
					return false;
				}
				break;
			case 'bois':
				if($( this )[0].price > bois) {
					isUpgradable = false;
					return false;
				}
				break;
			case 'or':
				if($( this )[0].price > or) {
					isUpgradable = false;
					return false;
				}
				break;
			case 'pierre':
				if($( this )[0].price > pierre) {
					isUpgradable = false;
					return false;
				}
				break;
		}
		return true;
	});
	if(batiment.requiredCitizen > villageoisDispo || villageois === hotelDeVille.villageoisMax) {
		isUpgradable = false;
	}
	return isUpgradable;
}


function updatePreUpgrade(batiment) {
	let coutNourriture = 0, coutBois = 0, coutOr = 0, coutPierre = 0;
	for(let i = 0; i < batiment.upgradeCost.length; i++) {
		switch(batiment.upgradeCost[i].type) {
			case 'nourriture':
				if(batiment.upgradeCost[i].price > nourriture) return false;
				coutNourriture = batiment.upgradeCost[i].price;
				break;
			case 'bois':
				if(batiment.upgradeCost[i].price > bois) return false;
				coutBois = batiment.upgradeCost[i].price;
				break;
			case 'or':
				if(batiment.upgradeCost[i].price > or) return false;
				coutOr = batiment.upgradeCost[i].price;
				break;
			case 'pierre':
				if(batiment.upgradeCost[i].price > pierre) return false;
				coutPierre = batiment.upgradeCost[i].price;
				break;
		}
	}
	if(batiment.requiredCitizen && batiment.requiredCitizen > villageoisDispo) {
		return false;
	}
	nourriture -= coutNourriture;
	bois -= coutBois;
	or -= coutOr;
	pierre -= coutPierre;
	villageoisDispo -= batiment.requiredCitizen ? batiment.requiredCitizen : 0;
	return true;
}

function updatePreUpgradeCitizen(batiment) {
	let coutNourriture = 0, coutBois = 0, coutOr = 0, coutPierre = 0;
	for(let i = 0; i < batiment.cost.length; i++) {
		switch(batiment.cost[i].type) {
			case 'nourriture':
				if(batiment.cost[i].price > nourriture) return false;
				coutNourriture = batiment.cost[i].price;
				break;
			case 'bois':
				if(batiment.cost[i].price > bois) return false;
				coutBois = batiment.cost[i].price;
				break;
			case 'or':
				if(batiment.cost[i].price > or) return false;
				coutOr = batiment.cost[i].price;
				break;
			case 'pierre':
				if(batiment.cost[i].price > pierre) return false;
				coutPierre = batiment.cost[i].price;
				break;
		}
	}
	if(villageois + citoyen.gain > hotelDeVille.villageoisMax) {
		return false;
	}
	nourriture -= coutNourriture;
	bois -= coutBois;
	or -= coutOr;
	pierre -= coutPierre;
	return true;
}

function updatePostUpgrade(batiment) {
	if(batiment == citoyen) {
		for(let i = 0; i < batiment.cost.length; i++) {
			let newPrice = Math.floor(batiment.cost[i].price * 102 / 100);
			if( batiment.cost[i].price === newPrice ) newPrice ++;
			batiment.cost[i].price = newPrice;
		}
		return;
	} else if(batiment == hotelDeVille) {
		for(let i = 0; i < batiment.upgradeCost.length; i++) {
			let newPrice = Math.floor(batiment.upgradeCost[i].price * 115 / 100);
			if( batiment.upgradeCost[i].price === newPrice ) newPrice ++;
			batiment.upgradeCost[i].price = newPrice;
		}
		return;
	} else {
		for(let i = 0; i < batiment.upgradeCost.length; i++) {
			let newPrice = Math.floor(batiment.upgradeCost[i].price * constProgress / 100);
			if( batiment.upgradeCost[i].price === newPrice ) newPrice ++;
			batiment.upgradeCost[i].price = newPrice;
		}
	}
}

function costString(upgradeCost) {
	let cost = '';
	if(	upgradeCost.length === 4
		&& upgradeCost[0].price === upgradeCost[1].price
		&& upgradeCost[1].price === upgradeCost[2].price
		&& upgradeCost[2].price === upgradeCost[3].price) {
		cost = upgradeCost[0].price + ' de chaque';
	} else {
		for(let i = 0; i < upgradeCost.length; i++) {
			if(cost !== '') cost += ' / ';
			cost += upgradeCost[i].price + ' ' + upgradeCost[i].type.charAt(0);
		}
	}
	return cost;
}






$('#hotel_de_ville_upgrade').click(() => {
	if(updatePreUpgrade(hotelDeVille)) {
		hotelDeVille.villageoisMax = math_floor( hotelDeVille.villageoisMax + hotelDeVille.upgradeGain );
		hotelDeVille.level ++;
		updatePostUpgrade(hotelDeVille);
	}
});
$('#citoyen_clic').click(() => {
	if(updatePreUpgradeCitizen(citoyen)) {
		villageois = math_floor( villageois + citoyen.gain );
		villageoisDispo = math_floor( villageoisDispo + citoyen.gain );
		updatePostUpgrade(citoyen);
	}
});
$('#citoyen_upgrade').click(() => {
	if(updatePreUpgrade(citoyen)) {
		citoyen.gain = math_floor( citoyen.gain + citoyen.upgradeGain );
		citoyen.level ++;
		updatePostUpgrade(citoyen);
	}
});
$('#nourriture_clic').click(() => {
	nourriture = math_floor( nourriture + nourriture_clic.gain );
});
$('#nourriture_clic_upgrade').click(() => {
	if(updatePreUpgrade(nourriture_clic)) {
		$('#nourritureUpgradeCard').hide();
		nourriture_clic.gain = math_floor( nourriture_clic.gain * nourriture_clic.constProgress / 100 );
		for(let i = 0; i < nourriture_clic.upgradeCost.length; i++) {
			nourriture_clic.upgradeCost[i].price = Math.floor(nourriture_clic.upgradeCost[i].price * nourriture_clic.constProgressUpgrade / 100);
		}
		nourriture_clic.level ++;
	}
});
$('#nourriture_upgrade').click(() => {
	if(updatePreUpgrade(ferme)) {
		// ferme.upgradeGain = math_floor( ferme.gain + ferme.upgradeGain );
		ferme.gain = math_floor( ferme.gain + ferme.upgradeGain );
		ferme.level ++;
		updatePostUpgrade(ferme);
	}
});
$('#bois_clic').click(() => {
	bois = math_floor( bois + bois_clic.gain );
});
$('#bois_clic_upgrade').click(() => {
	if(updatePreUpgrade(bois_clic)) {
		$('#boisUpgradeCard').hide();
		bois_clic.gain = math_floor( bois_clic.gain * bois_clic.constProgress / 100 );
		for(let i = 0; i < bois_clic.upgradeCost.length; i++) {
			bois_clic.upgradeCost[i].price = Math.floor(bois_clic.upgradeCost[i].price * bois_clic.constProgressUpgrade / 100);
		}
		bois_clic.level ++;
	}
});
$('#bois_upgrade').click(() => {
	if(updatePreUpgrade(scierie)) {
		scierie.gain = math_floor( scierie.gain + scierie.upgradeGain );
		scierie.level ++;
		updatePostUpgrade(scierie);
	}
});
$('#or_clic').click(() => {
	or = math_floor( or + or_clic.gain );
});
$('#or_clic_upgrade').click(() => {
	if(updatePreUpgrade(or_clic)) {
		$('#orUpgradeCard').hide();
		or_clic.gain = math_floor( or_clic.gain * or_clic.constProgress / 100 );
		for(let i = 0; i < or_clic.upgradeCost.length; i++) {
			or_clic.upgradeCost[i].price = Math.floor(or_clic.upgradeCost[i].price * or_clic.constProgressUpgrade / 100);
		}
		or_clic.level ++;
	}
});
$('#or_upgrade').click(() => {
	if(updatePreUpgrade(mineOr)) {
		mineOr.gain = math_floor( mineOr.gain + mineOr.upgradeGain );
		mineOr.level ++;
		updatePostUpgrade(mineOr);
	}
});
$('#pierre_clic').click(() => {
	pierre = math_floor( pierre + pierre_clic.gain );
});
$('#pierre_clic_upgrade').click(() => {
	if(updatePreUpgrade(pierre_clic)) {
		$('#pierreUpgradeCard').hide();
		pierre_clic.gain = math_floor( pierre_clic.gain * pierre_clic.constProgress / 100 );
		for(let i = 0; i < pierre_clic.upgradeCost.length; i++) {
			pierre_clic.upgradeCost[i].price = Math.floor(pierre_clic.upgradeCost[i].price * pierre_clic.constProgressUpgrade / 100);
		}
		pierre_clic.level ++;
	}
});
$('#pierre_upgrade').click(() => {
	if(updatePreUpgrade(carriere)) {
		carriere.gain = math_floor( carriere.gain + carriere.upgradeGain );
		carriere.level ++;
		updatePostUpgrade(carriere);
	}
});

$('#restart').click(() => {
	initialize();
	$('#auto').show();
	initializeValues(hotelDeVille.level);
});

function initializeValues(level) {
	levelRestarted += level;
	nourriture = 0;
	bois = 0;
	or = 0;
	pierre = 0;
	villageois = 0;
	villageoisDispo = 0;
	hotelDeVille.villageoisMax = 5;
	hotelDeVille.level = 1;
	hotelDeVille.upgradeCost = [
		{
			type: 'nourriture',
			price: 25
		},
		{
			type: 'bois',
			price: 25
		},
		{
			type: 'or',
			price: 25
		},
		{
			type: 'pierre',
			price: 25
		}
	];
	
	citoyen.level = 0;
	citoyen.gain = 1;
	citoyen.cost = [
			{
				type: 'nourriture',
				price: 10
			}
		];
	citoyen.automaticGain = 0,
	citoyen.upgradeCost = [
			{
				type: 'nourriture',
				price: 75
			}
		];
	citoyen.upgradeGain = 0.1;
	
	nourriture_clic.level = 0;
	nourriture_clic.gain = 1;
	nourriture_clic.upgradeCost = [
			{
				type: 'nourriture',
				price: 250
			}
		];
	bois_clic.level = 0;
	bois_clic.gain = 1;
	bois_clic.upgradeCost = [
			{
				type: 'bois',
				price: 250
			}
		];
	or_clic.level = 0;
	or_clic.gain = 1;
	or_clic.upgradeCost = [
			{
				type: 'or',
				price: 250
			}
		];
	pierre_clic.level = 0;
	pierre_clic.gain = 1;
	pierre_clic.upgradeCost = [
			{
				type: 'pierre',
				price: 250
			}
		];
	
	ferme.level = 0;
	ferme.gain = 0;
	ferme.upgradeCost = [
			{
				type: 'bois',
				price: 25
			},
			{
				type: 'or',
				price: 5
			}
		];
	ferme.upgradeGain = Math.floor(levelRestarted/2);
	
	scierie.level = 0;
	scierie.gain = 0;
	scierie.upgradeCost = [
			{
				type: 'nourriture',
				price: 15
			},
			{
				type: 'pierre',
				price: 10
			}
		];
	scierie.upgradeGain = Math.floor(levelRestarted/2);
	
	mineOr.level = 0;
	mineOr.gain = 0;
	mineOr.upgradeCost = [
			{
				type: 'nourriture',
				price: 20
			},
			{
				type: 'bois',
				price: 20
			},
			{
				type: 'pierre',
				price: 30
			}
		];
	mineOr.upgradeGain = Math.floor(levelRestarted/2);
	
	carriere.level = 0;
	carriere.gain = 0;
	carriere.upgradeCost = [
			{
				type: 'nourriture',
				price: 20
			},
			{
				type: 'bois',
				price: 20
			},
			{
				type: 'or',
				price: 10
			}
		];
	carriere.upgradeGain = Math.floor(levelRestarted/2);

}

// utils
function math_floor(value) {
	return Math.floor(value * precision) / precision;
}
function math_floor_10(value) {
	return Math.floor(value);
}

function formatNumber(n) {
	if( n < 1000) return n;
	let f;
	let i = -1;
	do {
		i++;
		f = Math.floor(n / Math.pow(1000, i) * 1000) / 1000;
	} while(f > 1000)
	return Number.parseFloat(f).toFixed(3) + ' ' + BIG_NUMBERS[i] + (i > 0 && f >= 2 ? 's' : '');
}
