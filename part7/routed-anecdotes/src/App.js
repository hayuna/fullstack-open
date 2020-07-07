import React, { useState } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Menu from './Menu';
import AnecdoteList from './AnecdoteList';
import About from './About';
import Footer from './Footer';
import CreateNew from './CreateNew';
import Anecdote from './Anecdote';

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info:
                'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1',
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2',
        },
    ]);

    const [notification, setNotification] = useState('');

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0);
        setAnecdotes(anecdotes.concat(anecdote));

        initiateTimedNotification(
            `A new anecdote ${anecdote.content} was created!`,
        );
    };

    const anecdoteById = (id) =>
        anecdotes.find((a) => Number(a.id) === Number(id));

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    };

    const initiateTimedNotification = (message) => {
        setNotification(message);

        setTimeout(() => setNotification(''), 10000);
    };

    const match = useRouteMatch('/anecdotes/:id');
    const anecdote = match ? anecdoteById(match.params.id) : null;

    return (
        <div>
            <h1>Software anecdotes</h1>

            <Menu />

            <Switch>
                <Route path="/anecdotes/:id">
                    <Anecdote anecdote={anecdote} />
                </Route>
                <Route exact path="/">
                    <AnecdoteList
                        notification={notification}
                        anecdotes={anecdotes}
                    />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/create">
                    <CreateNew addNew={addNew} />
                </Route>
            </Switch>

            <Footer />
        </div>
    );
};

export default App;
