<template>
    <div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<style>
		.form-group {
			position: relative;
			padding-top: 0.5rem;
		}

		input:placeholder-shown + label {
			opacity: 0;
			transform: translateY(1rem);
		}
		
		hr {
			margin: -30px auto 10px;
			padding: 0;
			height: 50px;
			border: none;
			border-bottom: 1px solid #1f1209;
			box-shadow: 0 20px 20px -20px #333;
			width: 95%;
		}
		
		.bdy {
			margin-left: 5px;
		}
		
		label {
		position: relative;
		top: 0;
		font-size: var(--font-size-small);
		opacity: 1;
		transform: translateY(0);
		transition: all 0.2s ease-out;
		color: aliceblue;
		font-weight: bold;
		}

		html, body {
			height: 100%;
		}
		body {
			margin: 0;
			background: linear-gradient(45deg, #49a09d, #5f2c82);
			font-family: sans-serif;
			font-weight: 100;
		}
		.container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		table {
			width: 800px;
			border-collapse: collapse;
			overflow: hidden;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		}
		th, td {
			padding: 15px;
			background-color: rgba(255, 255, 255, 0.2);
			color: #fff;
		}
		th {
			text-align: left;
		}
		thead th {
			background-color: #55608f;
		}
		tbody tr:hover {
			background-color: rgba(255, 255, 255, 0.3);
		}
		tbody td {
			position: relative;
		}
		tbody td:hover:before {
			content: "";
			position: absolute;
			left: 0;
			right: 0;
			top: -9999px;
			bottom: -9999px;
			background-color: rgba(255, 255, 255, 0.2);
			z-index: -1;
		}



		/* цветовые схемы тем */
		.dark {
			background: linear-gradient(45deg, #49a09d, #5f2c82);
		}
		.light {
			background: linear-gradient(45deg, pink, rgb(95, 190, 245));
		}



		/* Стили для кнопки */
		button,
		button:after {
			width: 150px;
			height: 76px;
			line-height: 78px;
			font-size: 20px;
			font-family: 'Bebas Neue', sans-serif;
			background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
			border: 0;
			color: #fff;
			letter-spacing: 3px;
			box-shadow: 6px 0px 0px #00E6F6;
			outline: transparent;
			position: relative;
			user-select: none;
			-webkit-user-select: none;
			touch-action: manipulation;
		}

		button:after {
			--slice-0: inset(50% 50% 50% 50%);
			--slice-1: inset(80% -6px 0 0);
			--slice-2: inset(50% -6px 30% 0);
			--slice-3: inset(10% -6px 85% 0);
			--slice-4: inset(40% -6px 43% 0);
			--slice-5: inset(80% -6px 5% 0);
			
			content: 'Практика';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
			text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
			clip-path: var(--slice-0);
		}

		button:hover:after {
			animation: 1s glitch;
			animation-timing-function: steps(2, end);
		}

		@keyframes glitch {
		0% {
			clip-path: var(--slice-1);
			transform: translate(-20px, -10px);
		}
		10% {
			clip-path: var(--slice-3);
			transform: translate(10px, 10px);
		}
		20% {
			clip-path: var(--slice-1);
			transform: translate(-10px, 10px);
		}
		30% {
			clip-path: var(--slice-3);
			transform: translate(0px, 5px);
		}
		40% {
			clip-path: var(--slice-2);
			transform: translate(-5px, 0px);
		}
		50% {
			clip-path: var(--slice-3);
			transform: translate(5px, 0px);
		}
		60% {
			clip-path: var(--slice-4);
			transform: translate(5px, 10px);
		}
		70% {
			clip-path: var(--slice-2);
			transform: translate(-10px, 10px);
		}
		80% {
			clip-path: var(--slice-5);
			transform: translate(20px, -10px);
		}
		90% {
			clip-path: var(--slice-1);
			transform: translate(-10px, 0px);
		}
		100% {
			clip-path: var(--slice-1);
			transform: translate(0);
		}
		}

		@media (min-width: 768px) {
		button,
		button:after {
			width: 200px;
			height: 86px;
			line-height: 88px;
		}

		button {
			width: 300px;
			height: 80px;
		}
	}
	</style>