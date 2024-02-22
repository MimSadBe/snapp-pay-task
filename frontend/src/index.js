import React, {Profiler} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    console.log("--- index ---")
    console.log("id, phase, actualDuration, baseDuration, startTime, commitTime: ")
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime)
    console.log("--- index ---")

}

root.render(
    <React.StrictMode>
        <Profiler id="App" onRender={onRender}>
            <App/>
        </Profiler>
    </React.StrictMode>
);

reportWebVitals();
