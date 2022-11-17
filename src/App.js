import { useState ,useEffect , useRef} from 'react';
import './App.css';
import FlashcardList from './FlashcardList';
import axios from 'axios';


function App() {
  const [flashcards , setFlashcards] = useState([])
  const [categories , setCategories] = useState([])

  const categoryEl = useRef();
  const amountEl = useRef()

  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

  /*
  used for testing the api
  useEffect(()=>{  
  },[]) */

  // it is used to remove the weird html codes and convert them into string characters 
  function decodeString(str){
    let textArea = document.createElement("textarea")
    textArea.innerHTML = str
    return textArea.value;
  }

  function handleSubmit(e){
    e.preventDefault();
    axios.get('https://opentdb.com/api.php?amount',{
      params :{
        amount :amountEl.current.value,
        category : categoryEl.current.value
      }
    }).then(res =>{
      setFlashcards(res.data.results.map((questionItem , index)=>{
        const answer = decodeString(questionItem.correct_answer)
        const options = [...questionItem.incorrect_answers.map(a => decodeString(a)),answer]
        return {
          id : `${index}-${Date.now()}`,
          question : decodeString(questionItem.question),
          answer : answer,
          options : options.sort(()=> Math.random() - 0.5)
        }
      }))
    })
  }

  return (
    <>
    <form className='header' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='category'>Category</label>
        <select id='category' ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>
              {category.name}
            </option>
          })}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='amount'>Number of Questions</label>
        <input type={'number'} id='amount' min='1' step='1' defaultValue={10} ref={amountEl}/>
      </div>
      <div className='form-group'>
        <button className='btn'>Generate</button>
      </div>
    </form>
    <div className='container'>
      <FlashcardList flashcards={flashcards} />
    </div>
    </>
  );
}

// placeholder 
// const Sample_Flashcards = [
//   {
//     id :1,
//     question : 'Question1',
//     answer : 'Answer',
//     options : [
//       "Answer 1",
//       "Answer 2",
//       "Answer 3",
//       "Answer 4"
//     ]
//   },
//   {
//     id : 2 ,
//     question : 'Question2',
//     answer : 'Answer',
//     options : [
//       "Answer 1",
//       "Answer 2",
//       "Answer 3",
//       "Answer 4"
//     ]
//   }
// ]

export default App;
