 
 //choices =  all_qs.split('');
 var questionnaire_length = questions.length;
 var question_number = 0;
 // Number of seconds given to complete the test
 var timer = document.getElementById("timer");
 var btn_submit_initials = document.getElementById("btn_submit_initials");
 var score = 0;
 var interval;
 var highScorers =new Array();
 


     
 function display_question_and_answer(question_number)
 {
     var choices;
     var question = "";
     var qa = "";
     var number_of_choice = questions[question_number]['choices'].length;
     
     question += '<p>'+questions[question_number]['title']+'</p>';

     choices = "<ul>";
         for (i = 0; i < number_of_choice; i++) {
         var current_choice = questions[question_number]['choices'][i];
         choices += '<li class="choices" onclick="check_answer(\''+current_choice+'\')">'+current_choice+'</li>';
         }
         choices += "</ul>";
         qa += question + choices; // concatanete title and question choices
         
         document.getElementById("quiz").innerHTML = qa;
 }


 function StopTimer() 
 {
     clearInterval(interval);
 }

 function scorePoint()
 {
     score = score + 25;
 }

 function check_answer(answer)
 {
     if (answer === questions[question_number]['answer'])
     {       
             // if answer to the question is correct
             // add pints to totalscore
             scorePoint();
             question_number++;
             if (questionnaire_length > question_number)
             {
                 display_question_and_answer(question_number);
             }
             else // If questions are over
             {
                 getInitials();
             }
     }
      else 
      {
          // if the selected answer is incorrect
          // deduct 10 seconds from the running clock
          question_number++;
          setTime = setTime -10;
        if (questionnaire_length > question_number)
        {
        display_question_and_answer(question_number);
        }
        else
        {
        getInitials();
        }
      }   
 }

 function storeHighScore()
 {
     var initials = document.getElementById("initials").value;
     localStorage.setItem("initials", initials);
     player_initials_with_score = localStorage.getItem('initials')+' - '+ score;
     highScorers.push(player_initials_with_score);
     document.getElementById("quizscore").innerText = highScorers.toString();
 }

 function getInitials()
 {
     StopTimer(); 
     get_initials = 
     "<input type='text' id='initials' value='' placeholder='Type Your Initials here'><button id='btn_submit_initials'>Submit</button>";
     document.getElementById("quiz").innerHTML = get_initials;
     document.getElementById('btn_submit_initials').addEventListener("click", storeHighScore);
 }

 function startTimer() {
     document.getElementById("quizStart").style.display = "none";
     display_question_and_answer(question_number); // 0 by default

     setTime = 60;
     interval = setInterval(function() {
     setTime = setTime - 1;
     timer.innerHTML = setTime;
     if (setTime === 0)
     {
         getInitials();
     }
 }, 1000);
 }

 quizStart.addEventListener("click", startTimer);

