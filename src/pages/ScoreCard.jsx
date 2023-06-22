import { useState, useEffect } from "react";
import "../globaltable.css";

const ScoreCard = () => {
  
  const [marksOne, setMarksOne] = useState(0);
  const [marksTwo, setMarksTwo] = useState(0);
  const [marksThree, setMarksThree] = useState(0);

  const [scoreGradeOne, setScoreGradeOne] = useState("");
  const [scoreGradeTwo, setScoreGradeTwo] = useState("");
  const [scoreGradeThree, setScoreGradeThree] = useState("");

  const totalScore = {
    scoreOne: 10,
    scoreTwo: 5,
    scoreThree: 0,
    scoreFour: 0,
    scoreFive: 0,
    scoreSix: 5,
    scoreSeven: 5,
  };

  function scoreOneGrade(score) {
    if (score >= 40) {
      setMarksOne(10);
      setScoreGradeOne("excellent");
    } else if (score >= 35 && score <= 39) {
      setMarksOne(8);
      setScoreGradeOne("good");
    } else if (score >= 30 && score <= 34) {
      setMarksOne(5);
      setScoreGradeOne("average");
    } else if (score >= 25 && score <= 29) {
      setMarksOne(3);
      setScoreGradeOne("poor");
    } else if (score < 25) {
      setMarksOne(0);
      setScoreGradeOne("worst");
    }

  }

  function scoreTwoGrade(score){
    if (score >= 25) {
      setMarksTwo(10);
      setScoreGradeTwo("excellent");
    } else if (score >= 20 && score <= 24) {
      setMarksTwo(8);
      setScoreGradeTwo("good");
    } else if (score >= 15 && score <= 19) {
      setMarksTwo(5);
      setScoreGradeTwo("average");
    } else if (score >= 10 && score <= 14) {
      setMarksTwo(3);
      setScoreGradeTwo("poor");
    } else if (score < 10) {
      setMarksTwo(0);
      setScoreGradeTwo("worst");
    }
  }

  function scoreThreeGrade(score){
    if (score >= 15) {
      setMarksThree(10);
      setScoreGradeThree("excellent");
    } else if (score >= 11 && score <= 14) {
      setMarksThree(8);
      setScoreGradeThree("good");
    } else if (score >= 10 && score <= 12) {
      setMarksThree(5);
      setScoreGradeThree("average");
    } else if (score >= 5 && score <= 9) {
      setMarksThree(3);
      setScoreGradeThree("poor");
    } else if (score < 5) {
      setMarksThree(0);
      setScoreGradeThree("worst");
    }
  }

  function scoreFourGrade(score){
    if (score >= 15) {
      setMarksThree(10);
      setScoreGradeThree("excellent");
    } else if (score >= 11 && score <= 14) {
      setMarksThree(8);
      setScoreGradeThree("good");
    } else if (score >= 10 && score <= 12) {
      setMarksThree(5);
      setScoreGradeThree("average");
    } else if (score >= 5 && score <= 9) {
      setMarksThree(3);
      setScoreGradeThree("poor");
    } else if (score < 5) {
      setMarksThree(0);
      setScoreGradeThree("worst");
    }
  }

  function scoreFiveGrade(score){
    if (score >= 15) {
      setMarksThree(10);
      setScoreGradeThree("excellent");
    } else if (score >= 11 && score <= 14) {
      setMarksThree(8);
      setScoreGradeThree("good");
    } else if (score >= 10 && score <= 12) {
      setMarksThree(5);
      setScoreGradeThree("average");
    } else if (score >= 5 && score <= 9) {
      setMarksThree(3);
      setScoreGradeThree("poor");
    } else if (score < 5) {
      setMarksThree(0);
      setScoreGradeThree("worst");
    }
  }

  function scoreSixGrade(score){
    if (score >= 15) {
      setMarksThree(10);
      setScoreGradeThree("excellent");
    } else if (score >= 11 && score <= 14) {
      setMarksThree(8);
      setScoreGradeThree("good");
    } else if (score >= 10 && score <= 12) {
      setMarksThree(5);
      setScoreGradeThree("average");
    } else if (score >= 5 && score <= 9) {
      setMarksThree(3);
      setScoreGradeThree("poor");
    } else if (score < 5) {
      setMarksThree(0);
      setScoreGradeThree("worst");
    }
  }

  useEffect(() => {
    scoreOneGrade(40);
    scoreTwoGrade(20);
    scoreThreeGrade(15);
  }, []);

  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>PARAMETERS</th>
              <th>TARGET</th>
              <th>SCORE</th>
              <th>TOTAL SCORE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TOTAL CALLS(TC)</td>
              <td>40</td>
              <td>10</td>
              <td>{marksOne} {scoreGradeOne}</td>
            </tr>
            <tr>
              <td>PRODUCTIVE CALLS(PC)</td>
              <td>25</td>
              <td>10</td>
              <td>{marksTwo} {scoreGradeTwo}</td>
            </tr>
            <tr>
              <td>POP VISELITY</td>
              <td>15</td>
              <td>10</td>
              <td className="flex gap-2">{marksThree} <p className="bg-[green] p-1 rounded text-white">{scoreGradeThree}</p></td>
            </tr>
            <tr>
              <td>MONTHLY TARGET</td>
              <td>100%</td>
              <td>50</td>
              <td>{totalScore.scoreFour}</td>
            </tr>
            <tr>
              <td>PROMOTION ACTIVITY</td>
              <td>100</td>
              <td>10</td>
              <td>{totalScore.scoreFive}</td>
            </tr>
            <tr>
              <td>PJP CHANGE</td>
              <td>100</td>
              <td>10</td>
              <td>{totalScore.scoreFive}</td>
            </tr>
            <tr>
              <td>CLAIM/GIFT SUBMISSIONS</td>
              <td>0</td>
              <td>5</td>
              <td>{totalScore.scoreSeven}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ScoreCard;
