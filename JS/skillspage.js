// This clears the "shared" content between articles on the intial page load. 


// This clears containers for chart / text elements on the skill page, and allows the
// option at the start of the article to let the user pick which article to read

function clear_decks() {
  document.getElementById("us_Chart").style.display = "none";
  document.getElementById("us_Chart").style.display = "none";
  document.getElementById("us_Text").style.display = "none";
  document.getElementById("cs_Chart").style.display = "none";
  document.getElementById("cs_Text").style.display = "none";
  document.getElementById("ts_Chart").style.display = "none";
  document.getElementById("ts_Text").style.display = "none";
  document.getElementById("ts_Chart2").style.display = "none";
  document.getElementById("ts_Text2").style.display = "none";
  document.getElementById("as_Chart").style.display = "none";
  document.getElementById("as_Text").style.display = "none";
}

// AS_Chart & As_Text load for all article selections as they are overviews. 
// US_ - University Related article
// CS_ - Compulsory Education related Article
// TS_ - Tertiary education article. 

function universitySankey() {
  document.getElementById("us_Chart").style.display = "block";
  document.getElementById("us_Text").style.display = "block";
  document.getElementById("as_Chart").style.display = "block";
  document.getElementById("as_Text").style.display = "block";
}

function compulsory_Sankey() {
  document.getElementById("cs_Chart").style.display = "block";
  document.getElementById("cs_Text").style.display = "block";
  document.getElementById("as_Chart").style.display = "block";
  document.getElementById("as_Text").style.display = "block";
}

function tertiary_Sankey() {
  document.getElementById("ts_Chart").style.display = "block";
  document.getElementById("ts_Text").style.display = "block";
  document.getElementById("ts_Chart2").style.display = "block";
  document.getElementById("ts_Text2").style.display = "block";
  document.getElementById("as_Chart").style.display = "block";
  document.getElementById("as_Text").style.display = "block";
}

// Function related to option menu

function show_chart() {
  clear_decks(); 
  dataLoad = document.getElementById("slevel").value;
  console.log(dataLoad) 
  if (dataLoad == "sankey_chartu") {
    universitySankey() ;
  } else if (dataLoad == "Compulsory") {
    compulsory_Sankey() ;
  } else if (dataLoad == "Tertiary") {
    tertiary_Sankey();  
  }  
}

