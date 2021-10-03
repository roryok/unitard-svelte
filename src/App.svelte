<script>

	import UnitConverter from './unitconverter.js'

	const theconverter = new UnitConverter()
	export let name;

	const suggestions = {
		"lb": "kg",
		"kg": "lb",
		"oz": "g",
		"g": "oz",
		"km": "mi",
		"mi": "km",
		"nmi": "mi",
		"cm": "in",
		"in": "cm",
		"ft": "m",
		"yd": "m",
		"m": "ft",
		"sqft" : "sqm",
		"sqyd" : "sqm",
		"sqmi" : "sqkm",
		"sqm" : "sqft",
		"sqkm" : "sqmi",
		"sqin" : "sqcm",
		"sqcm" : "sqin",
		"ac" : "ha",
		"ha" : "ac",
	}

	const units = [
		{ 
			type: "Weight", 
			measures: [
				{ id: "kg", name: "kg (kilograms)" },
				{ id: "g", name: "g (grams)" },
				{ id: "mg", name: "mg (miligrams)" },
				{ id: "lb", name: "lb (pounds)" },
				{ id: "oz", name: "oz (ounces)" },
			],
		},
		{ 
			type: "Distance", 
			measures: [
				{ id: "km", name: "km (kilometres)" },
				{ id: "m", name: "m (metres)" },
				{ id: "cm", name: "cm (centimetres)" },
				{ id: "mm", name: "mm (milimetres)" },
				{ id: "mi", name: "mi (miles)" },
				{ id: "in", name: "in (inches)" },
				{ id: "ft", name: "ft (feet)" },
				{ id: "yd", name: "yd (yards)" },
				{ id: "nmi", name: "nmi (nautical miles" },
			],
		},
		{ 
			type: "Area", 
			measures: [
				{ id: "sqmi", name: "sq mi (square miles)" },
				{ id: "sqin", name: "sq in (square inches)" },
				{ id: "sqft", name: "sq ft (square feet)" },
				{ id: "sqyd", name: "sq yd (square yards)" },
				{ id: "sqkm", name: "sq km (square kilometres)" },       
				{ id: "sqm", name: "sq m (square metres)" },
				{ id: "sqcm", name: "sq cm (square centimetres)" },
				{ id: "ha", name: "ha (hectares)" },
				{ id: "ar", name: "ar (ares)" },
				{ id: "ac", name: "ac (acres)" },
			],
		},
	];

    let lastClickedType = "inputamount";

	let amount = 8;
	let selectedFrom = "m";
	let selectedTo = "ft";

	$: converted = theconverter.convert(selectedFrom, selectedTo, amount);

</script>

<main>
  <header class="header">
	<img src="favicon.png" />
    <h1>Unitard</h1>
  </header>

  <main class="main">
	
      <label>Amount</label>
      <input type="number" name="amount" class="amount" bind:value={amount} />
      <label>From</label>
      <select class="unitselector" bind:value={selectedFrom}>
		{#each units as unit}
			<optgroup label={unit.type}>
				{#each unit.measures as measure}
				<option value={measure.id}>{measure.name}</option>
				{/each}
			</optgroup>
		{/each}
      </select>     
      <label>To</label>
      <select class="unitselector" bind:value={selectedTo}>
		{#each units as unit}
			<optgroup label={unit.type}>
				{#each unit.measures as measure}
				<option value={measure.id}>{measure.name}</option>
				{/each}
			</optgroup>
		{/each}
      </select>          
	  <label>Converted</label>
      <input type="text" disabled name="converted" class="converted" value={converted} />
  </main>

</main>

<style>

	body {

	}

	main {
		text-align: left;
		padding: 0;
		margin: 0 auto;
	}
	
	.header {
		background: #77c;
		color: #fff;
		display: flex;
	}

	.header img {
		height: 64px;
	}

	h1 {
		font-size: 3em;
		padding: 0;
		line-height: 0;
	}

	input, select {
		width: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>