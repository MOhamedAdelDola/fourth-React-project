import { useState } from 'react';
import './App.css';
import FlashcardList from './FlashcardList';


function App() {
  const [flashcards , setFlashcard] = useState(Sample_Flashcards)
  return (
    <FlashcardList flashcards={flashcards} />
  );
}

const Sample_Flashcards = [
  {
    id :1,
    question : 'Question1',
    answer : 'Answer',
    options : [
      "Answer 1",
      "Answer 2",
      "Answer 3",
      "Answer 4"
    ]
  },
  {
    id : 2 ,
    question : 'Question2',
    answer : 'Answer',
    options : [
      "Answer 1",
      "Answer 2",
      "Answer 3",
      "Answer 4"
    ]
  }
]

export default App;
