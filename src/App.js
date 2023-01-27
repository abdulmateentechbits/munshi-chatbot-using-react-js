import { useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from 'openai'

function App() {
  const configuration = new Configuration({
    apiKey: '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'
  });

  const openAi = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {

    setLoading(true);
    try {
      const response = openAi.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 100,
      })
      setResult((await response).data.choices[0].text);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }


  return (
    <div className="App">
      <h2 style={{color:'white'}}>Munshi seh kuch pochlo..</h2>
      <h3 style={{color:'white'}}>By Abdul mateen chitrali</h3>
      {
        result.length > 0 && <div id="results">{result}</div>
      }
      <br /><br />
      <textarea type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='write your queries' className='textarea'></textarea>
      <br /><br />
      <button onClick={handleClick} disabled={loading || prompt.length === 0}>{loading ? "Generating..." : "Generate"}</button><br /><br />
    </div>
  );
}

export default App;
