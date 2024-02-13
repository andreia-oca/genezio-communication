import React, { useState } from 'react';

const QuestionnaireForm = () => {
  // Questions and options based on the CSV content
  const questions = [
    { question: 'Ritm de vorbire', options: ['Foarte rapid', 'Rapid', 'Domol', 'Moderat'] }, 
    { question: 'Stil de comunicare', options: ['Direct la subiect', 'Animat, colorat', 'Calm, rational', 'Specific, concis'] },
    { question: 'Imbracaminte', options: ['Haine de firma, rafinat, tinute formale', 'Culori aprinse, la moda, informal', 'Culori estompate, casual', 'Conservativ, haine clasice, tinuta business'] },
    { question: 'Motivat de', options: ['Rezultate', 'Applauze', 'Aprobare', 'Activitate'] },
    { question: 'Excelezi in conditii de', options: ['Presiune, schimbare', 'Stimulare, distractie', 'Lucru in echipa, sprijin', 'Acuratete, fapte, informatie'] },
    // Add more questions and options here as needed
  ];

  const [answers, setAnswers]: [{[key: string]: number}, any] = useState({});
  const [totals, setTotals] = useState( { column1: 0, column2: 0, column3: 0, column4: 0 })

  //const answers: {[key: string]: number} = {};

  const handleOptionChange = async (question : string, option : number) => {
    setAnswers({...answers, [question]:option});
    //await new Promise((resolve, reject) => setTimeout(resolve, 1000))
    calculateTotal();
    console.log(answers); // Here you might want to send the answers to a backend server or store them in your state for further processing.
    console.log(totals);   
  };

  const calculateTotal = () => {
    const total = { column1: 0, column2: 0, column3: 0, column4: 0 };

    for (var q in answers) {
        if (answers[q] == 0)
            total.column1++;
        else if (answers[q] == 1)
            total.column2++;
        else if (answers[q] == 2)
            total.column3++;
        else if (answers[q] == 3)
            total.column4++;
            }
    setTotals({...total})
  }

  const handleSubmit = (e : any) => {
    e.preventDefault();

    calculateTotal();
    console.log(answers); // Here you might want to send the answers to a backend server or store them in your state for further processing.
    console.log(totals);
};

  // Placeholder for where you might calculate totals if applicable
//   let totals = { column1: 0, column2: 0, column3: 0, column4: 0 };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          {questions.map((item, index) => (
            <tr key={index}>
              <td>{item.question}</td>
              {item.options.map((option, optionIndex) => (
                <td key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name={item.question}
                      value={optionIndex}
                      onChange={() => handleOptionChange(item.question, optionIndex)}
                    />
                    {option}
                  </label>
                </td>
              ))}
            </tr>
          ))}
          {/* Footer row for displaying totals */}
          <tr>
            <td>Total</td>
            <td key={0}>{totals.column1}</td>
            <td key={1}>{totals.column2}</td>
            <td key={2}>{totals.column3}</td>
            <td key={3}>{totals.column4}</td>
          </tr>
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionnaireForm;