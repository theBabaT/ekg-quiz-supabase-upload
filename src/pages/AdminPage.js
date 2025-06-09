import React, { useState, useContext } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const AdminPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const { sets, addSet, addQuestion } = useContext(QuestionContext);
  const [selectedSet, setSelectedSet] = useState('');
  const [question, setQuestion] = useState({
    image: '',
    text: '',
    choices: ['', '', '', '', ''],
    correct: 0,
    explanation: ''
  });

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const { data, error } = await supabase
      .storage
      .from('ekg-bilder')
      .upload(fileName, file);

    if (error) {
      console.error('Upload-Fehler:', error.message);
      alert('Fehler beim Hochladen!');
      return null;
    }

    const { data: publicUrl } = supabase.storage.from('ekg-bilder').getPublicUrl(fileName);
    return publicUrl.publicUrl;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await uploadImage(file);
      if (url) setQuestion({ ...question, image: url });
    }
  };

  const handleAddQuestion = () => {
    if (!selectedSet) return alert('Bitte ein Set auswählen!');
    addQuestion({ set: selectedSet, ...question });
    alert('Frage gespeichert!');
    setQuestion({
      image: '',
      text: '',
      choices: ['', '', '', '', ''],
      correct: 0,
      explanation: ''
    });
  };

  if (!loggedIn) {
    return (
      <div>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setLoggedIn(password === 'admin123')}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Adminbereich</h2>

      <input type="text" placeholder="Neues Set" onKeyDown={(e) => {
        if (e.key === 'Enter') {
          addSet(e.target.value);
          setSelectedSet(e.target.value);
          e.target.value = '';
        }
      }} />
      <ul>
        {sets.map((set, i) => (
          <li key={i}>
            <button onClick={() => setSelectedSet(set)}>
              {set} {selectedSet === set ? '✅' : ''}
            </button>
          </li>
        ))}
      </ul>

      <h3>Neue Frage: {selectedSet}</h3>
      <input type="file" onChange={handleImageUpload} />
      <input type="text" placeholder="Fragetext" value={question.text} onChange={(e) => setQuestion({ ...question, text: e.target.value })} />
      {question.choices.map((c, i) => (
        <input key={i} type="text" placeholder={`Antwort ${i + 1}`} value={c}
          onChange={(e) => {
            const choices = [...question.choices];
            choices[i] = e.target.value;
            setQuestion({ ...question, choices });
          }} />
      ))}
      <input type="number" min="0" max="4" value={question.correct} onChange={(e) => setQuestion({ ...question, correct: Number(e.target.value) })} />
      <textarea placeholder="Erklärung" value={question.explanation} onChange={(e) => setQuestion({ ...question, explanation: e.target.value })}></textarea>
      <button onClick={handleAddQuestion}>Frage speichern</button>
    </div>
  );
};

export default AdminPage;
