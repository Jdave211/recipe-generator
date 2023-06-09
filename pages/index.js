import Head from 'next/head';
import {useState} from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async() =>{
    setIsGenerating(true);

    console.log('Calling OpenAI...')
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'},
      body: JSON.stringify({userInput}),
    });

    const data = await response.json();
    const {output} = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText = (event) =>{
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate a Recipe</h1>
          </div>
          <div className="header-subtitle">
            <h2>insert the ingredients you would wish to use to create a dish (ex. eggs, flour, pasta sauce, berries, etc).</h2>
          </div>
        </div>
      </div>
      <div className="prompt-container">
          <textarea
          value={userInput} 
          onChange={onUserChangedText}
          placeholder="enter your ingredients here" 
          className="prompt-box" />
      
      <div className="prompt-buttons">
        <a 
          className={isGenerating ? 'generate-button loading' : 'generate-button'}
          onClick={callGenerateEndpoint}>
          <div className="generate">
            {isGenerating ? <span className='loader'></span> : <p>Generate</p>}
         </div>
        </a>
      </div> 
      </div>
      {apiOutput &&(
        <div className='output'>
          <div className='output-header-container'>
            <div className='output-header'>
              <h3>Your Recipe</h3>
            </div>
          </div>
          <div className='output-content'>
            <p>{apiOutput}</p>
          </div>
        </div>
      )} 
    </div>
  );
};

export default Home;
