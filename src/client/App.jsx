import * as React from 'react';
import QuizContainer from './container/QuizContainer';

export const App = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px 0 16px' }}>
        <h1>Lucid</h1>
        <h2 style={{ textAlign: 'center'}}>Welcome to UI Team code assessment!</h2>
        <QuizContainer />
    </div>
);
