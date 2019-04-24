// This clears the "shared" content between articles on the intial page load. 

document.getElementById("cardifffe").style.display = "none";

// This clears containers for chart / text elements on the skill page, and allows the
// option at the start of the article to let the user pick which article to read

function showChart() {
  document.getElementById("sankey_chartu").style.display = "none";
  document.getElementsByClassName("sankey_chartu")[0].style.display = "none";
  document.getElementById("Compulsory").style.display = "none";
  document.getElementsByClassName("Compulsory")[0].style.display = "none";
  document.getElementById("Tertiary").style.display = "none";
  document.getElementsByClassName("Tertiary")[0].style.display = "none";
  document.getElementById("alleducation").style.display = "none";
  document.getElementById("cardifffe").style.display = "none";
  dataLoad = document.getElementById("slevel").value;
  console.log(dataLoad) 
  document.getElementById(dataLoad).style.display = "block";
  document.getElementsByClassName(dataLoad)[0].style.display = "block";
  document.getElementById("alleducation").style.display = "block";
  document.getElementById("cardifffe").style.display = "block";
}

// You'll need to add more articles to this bit 