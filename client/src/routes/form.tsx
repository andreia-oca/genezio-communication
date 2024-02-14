import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const QuestionnaireForm = () => {
  // Questions and options based on the CSV content
  const questions = [
    { question: 'Vorbesti mai mult despre', options: ['Rezultatele pe care vrei sa le ai','Vise si aspiratii','Sentimente si experiente de viata','Fapte si cifre']},
    { question: 'Ritm de vorbire', options: ['Foarte rapid', 'Rapid', 'Domol', 'Moderat'] },
    { question: 'Stil de comunicare', options: ['Direct la subiect', 'Animat, colorat', 'Calm, rational', 'Specific, concis'] },
    { question: 'Imbracaminte', options: ['Haine de firma, rafinat, tinute formale', 'Culori aprinse, la moda, informal', 'Culori estompate, casual', 'Conservativ, haine clasice, tinuta business'] },
    { question: 'Motivat de', options: ['Rezultate', 'Applauze', 'Aprobare', 'Activitate'] },
    { question: 'Excelezi in conditii de', options: ['Presiune, schimbare', 'Stimulare, distractie', 'Lucru in echipa, sprijin', 'Acuratete, fapte, informatie'] },
    { question: 'Expresia furiei', options: ['Nerabdator, agresiv','Usor frustrabil, comportament exploziv','Devii usor confuz','Abordare rationala']},
    { question: 'Stil de lucru,', options: ['Intens, mai multe lucruri odata','Adori libertatea si interactiunea cu multi oameni','Flexibil, cooperativ, vrei sa fi de ajutor celorlalti','Profund, atentie la detalii, un singur lucru odata']},
    { question: 'La birou', options: ['Birou ordonat si organizat pe prioritati','Gadgeturi, lucruri interesante','Mementouri sentimentale, suveniruri','Carti de specialitate la indemana']},
    { question: 'Ritm de lucru', options: ['Tumultos, foarte rapid','Te plictisesti repede, treci de la una la alta','Calculat, nu tolerezi usor presiunea','Metodic, ritm constant',]},
    { question: 'Urasti', options: ['Sa pierzi vremea','Sa reinventezi roata','Confruntarea','Sa nu ai dreptate']},
    { question: 'Rol in echipa', options: ['Leader - din nevoia de a controla','Relationare - nevoia de a fi in centrul atentiei','Impaciuitor - nevoia de a se simti inclus','Furnizor de informatii - nevoia de a fi exact']},
    { question: 'Vrea sa ti se aprecieze', options: ['Productivitatea','Contributia','Implicarea','Calitatea muncii']},
    { question: 'Recompensa', options: ['Putere','Recunoastere','Aprobare','Responsabilitate']},
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

  const navigate = useNavigate();

  const handleSubmit = (e : any) => {
    e.preventDefault();

    calculateTotal();
    //call backend function to store results and date

    try {
      navigate('/');
    } catch (error) {
      console.error(error);
    }
    console.log(answers); // Here you might want to send the answers to a backend server or store them in your state for further processing.
    console.log(totals);
};

  // Placeholder for where you might calculate totals if applicable
//   let totals = { column1: 0, column2: 0, column3: 0, column4: 0 };

  // const addNewResult = async () => {
  //   try {
  //     const user = await AuthService.getInstance().userInfo();
  //     const member:TeamMember = {
  //       id: 0,
  //       email: user.email,
  //       fullname: user.name ?? "",
  //       image_url: "",
  //       panther_percentage: totals.column1 / 14 * 100,
  //       owl_percentage: totals.column2 / 14 * 100,
  //       dolphin_percentage: totals.column3 / 14 * 100,
  //       peacock_percentage: totals.column4 / 14 * 100,
  //     }
  //     await BackendService.addNewResults(member);
  //     console.log('Results added');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
      <Button variant="primary" type="submit">Submit</Button>
    </form>
  );
};

export default QuestionnaireForm;
