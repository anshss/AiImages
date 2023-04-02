import { useState } from 'react';
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Configuration, OpenAIApi } from 'openai'

export default function Home() {

	const [imageUrl, setImageUrl] = useState('');
	const [inputValue, setInputValue] = useState('');


	const configuration = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_GPT_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	async function generateImage() {
		await openai.createImage({
			prompt: inputValue,
			n: 2,
			size: "1024x1024",
		}).then(response => {
			console.log(response.data.data[0].url)
			setImageUrl(response.data.data[0].url);
		})
	}

	function handleInputChange(event) {
		setInputValue(event.target.value);
	}


	return (
		<div className={styles.container}>
			<h2>Generate images from text</h2>
			<div>
				<input className={styles.input} type="text" placeholder="Enter text here" value={inputValue} onChange={handleInputChange} />
				<button onClick={generateImage}> Submit </button>
				<img src={imageUrl} />
			</div>
			<p className={styles.switch}>Switch to desktop</p>

		</div>
	)
}