import { render } from 'preact';
import './index.less';
import { NavBar } from './Components/Navigation/NavBar';
import { Main } from './Components/General/Main';
import { useState } from 'preact/hooks';

let audioContext;
let audioBuffer;

async function playAudio(path: string) {
	if(!audioContext){
		audioContext = new (window.AudioContext)();
	}

	const response = await fetch(path);
	const arrayBuffer = await response.arrayBuffer()
	audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

	const audioSource = audioContext.createBufferSource();
	audioSource.buffer = audioBuffer;
	audioSource.connect(audioContext.destination);
	audioSource.start();
}

window.playAudio = playAudio;


export function App() {
	

	
	return (
		<Main></Main>
	);
}

render(<App />, document.getElementById('app'));
