

google.charts.load('current', {packages:['sankey']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart2);
google.charts.setOnLoadCallback(drawChart3);
google.charts.setOnLoadCallback(drawChart4);
google.charts.setOnLoadCallback(drawChart5);


    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'People');
        data.addRows([
            ['Graduates From Welsh Universities', 'Male', 7870],
            ['Graduates From Welsh Universities', 'Female', 9950],
            [ 'Male', 'Agriculture & related subjects', 145 ],
            [ 'Male', 'Architecture, building & planning', 145 ],
            [ 'Male', 'Biological Sciences', 1275 ],
            [ 'Male', 'Business & administrative studies', 900 ],
            [ 'Male', 'Computer Science', 540 ],
            [ 'Male', 'Creative Arts & Design', 790 ],
            [ 'Male', 'Education', 165 ],
            [ 'Male', 'Engineering & Technology', 935 ],
            [ 'Male', 'Historical & Philosophical Studies', 380 ],
            [ 'Male', 'Languages', 305 ],
            [ 'Male', 'Law', 200 ],
            [ 'Male', 'Mass Communication & Documentation', 145 ],
            [ 'Male', 'Mathematical Sciences', 150 ],
            [ 'Male', 'Medicine & Dentistry', 180 ],
            [ 'Male', 'Physical Sciences', 175 ],
            [ 'Male', 'Social Studies', 660 ],
            [ 'Male', 'Subjects allied to Medicine', 285 ],
            [ 'Female', 'Agriculture & related subjects', 95 ], 
            [ 'Female', 'Architecture, building & planning', 80 ], 
            [ 'Female', 'Biological Sciences', 1560 ], 
            [ 'Female', 'Business & administrative studies', 930 ], 
            [ 'Female', 'Computer Science', 90 ],
            [ 'Female', 'Creative Arts & Design', 1095 ], 
            [ 'Female', 'Education', 930 ], 
            [ 'Female', 'Engineering & Technology', 115 ], 
            [ 'Female', 'Historical & Philosophical Studies', 440 ],
            [ 'Female', 'Languages', 835 ],
            [ 'Female', 'Law', 400 ], 
            [ 'Female', 'Mass Communication & Documentation', 225 ], 
            [ 'Female', 'Mathematical Sciences', 158 ], 
            [ 'Female', 'Medicine & Dentistry', 200 ], 
            [ 'Female', 'Physical Sciences', 390 ], 
            [ 'Female', 'Social Studies', 1025 ], 
            [ 'Female', 'Subjects allied to Medicine', 1410 ],
            [ 'Agriculture & related subjects', 'FT Work Male', 75],
            [ 'Agriculture & related subjects', 'Further Study Male', 75],
            [ 'Agriculture & related subjects', 'Other / No response', 35],
            [ 'Agriculture & related subjects', 'FT Work Female', 95],
            [ 'Agriculture & related subjects', 'Further Study Female', 55],
            [ 'Agriculture & related subjects', 'Unemployed Female', 5],
            [ 'Agriculture & related subjects', 'Other / No response', 65],
            [ 'Architecture, building & planning', 'FT Work Male', 280],
            [ 'Architecture, building & planning', 'Further Study Male', 25],
            [ 'Architecture, building & planning', 'Unemployed Male', 5],
            [ 'Architecture, building & planning', 'Other / No response', 115],
            [ 'Architecture, building & planning', 'FT Work Female', 120],
            [ 'Architecture, building & planning', 'Further Study Female', 5],
            [ 'Architecture, building & planning', 'Other / No response', 35],
            [ 'Biological Sciences', 'FT Work Male', 415],
            [ 'Biological Sciences', 'Further Study Male', 230],
            [ 'Biological Sciences', 'Unemployed Male', 30],
            [ 'Biological Sciences', 'Other / No response', 325],
            [ 'Biological Sciences', 'FT Work Female', 625],
            [ 'Biological Sciences', 'Further Study Female', 365],
            [ 'Biological Sciences', 'Unemployed Female', 30],
            [ 'Biological Sciences', 'Other / No response', 425],
            [ 'Business & administrative studies', 'FT Work Male', 605],
            [ 'Business & administrative studies', 'Further Study Male', 115],
            [ 'Business & administrative studies', 'Unemployed Male', 35],
            [ 'Business & administrative studies', 'Other / No response', 355],
            [ 'Business & administrative studies', 'FT Work Female', 665],
            [ 'Business & administrative studies', 'Further Study Female', 130],
            [ 'Business & administrative studies', 'Unemployed Female', 25],
            [ 'Business & administrative studies', 'Other / No response', 350],
            [ 'Computer Science', 'FT Work Male', 385],
            [ 'Computer Science', 'Further Study Male', 85],
            [ 'Computer Science', 'Unemployed Male', 45],
            [ 'Computer Science', 'Other / No response', 235],
            [ 'Computer Science', 'FT Work Female', 75],
            [ 'Computer Science', 'Further Study Female', 15],
            [ 'Computer Science', 'Unemployed Female', 10],
            [ 'Computer Science', 'Other / No response', 20],
            [ 'Creative Arts & Design', 'FT Work Male', 490],
            [ 'Creative Arts & Design', 'Further Study Male', 152],
            [ 'Creative Arts & Design', 'Unemployed Male', 45],
            [ 'Creative Arts & Design', 'Other / No response', 40],
            [ 'Creative Arts & Design', 'FT Work Female', 730],
            [ 'Creative Arts & Design', 'Further Study Female', 220],
            [ 'Creative Arts & Design', 'Unemployed Female', 45],
            [ 'Creative Arts & Design', 'Other / No response', 470],
            [ 'Education', 'FT Work Male', 565],
            [ 'Education', 'Further Study Male', 45],
            [ 'Education', 'Unemployed Male', 10],
            [ 'Education', 'Other / No response', 175],
            [ 'Education', 'FT Work Female', 1695],
            [ 'Education', 'Further Study Female', 205],
            [ 'Education', 'Unemployed Female', 25],
            [ 'Education', 'Other / No response', 690],
            [ 'Engineering & Technology', 'FT Work Male', 770],
            [ 'Engineering & Technology', 'Further Study Male', 115],
            [ 'Engineering & Technology', 'Unemployed Male', 30],
            [ 'Engineering & Technology', 'Other / No response', 390],
            [ 'Engineering & Technology', 'FT Work Female', 85],
            [ 'Engineering & Technology', 'Further Study Female', 15],
            [ 'Engineering & Technology', 'Other / No response', 45],
            [ 'Historical & Philosophical Studies', 'FT Work Male', 150],
            [ 'Historical & Philosophical Studies', 'Further Study Male', 115],
            [ 'Historical & Philosophical Studies', 'Unemployed Male', 25],
            [ 'Historical & Philosophical Studies', 'Other / No response', 135],
            [ 'Historical & Philosophical Studies', 'FT Work Female', 225],
            [ 'Historical & Philosophical Studies', 'Further Study Female', 140],
            [ 'Historical & Philosophical Studies', 'Unemployed Female', 15],
            [ 'Historical & Philosophical Studies', 'Other / No response', 175],
            [ 'Languages', 'FT Work Male', 95],
            [ 'Languages', 'Further Study Male', 65],
            [ 'Languages', 'Unemployed Male', 5],
            [ 'Languages', 'Other / No response', 135],
            [ 'Languages', 'FT Work Female', 295],
            [ 'Languages', 'Further Study Female', 150],
            [ 'Languages', 'Unemployed Female', 15],
            [ 'Languages', 'Other / No response', 200],
            [ 'Law', 'FT Work Male', 105],
            [ 'Law', 'Further Study Male', 55],
            [ 'Law', 'Unemployed Male', 10],
            [ 'Law', 'Other / No response', 95],
            [ 'Law', 'FT Work Female', 215],
            [ 'Law', 'Further Study Female', 130],
            [ 'Law', 'Unemployed Female', 5],
            [ 'Law', 'Other / No response', 175],
            [ 'Mass Communication & Documentation', 'FT Work Male', 115],
            [ 'Mass Communication & Documentation', 'Further Study Male', 35],
            [ 'Mass Communication & Documentation', 'Unemployed Male', 10],
            [ 'Mass Communication & Documentation', 'Other / No response', 80],
            [ 'Mass Communication & Documentation', 'FT Work Female', 150],
            [ 'Mass Communication & Documentation', 'Further Study Female', 35],
            [ 'Mass Communication & Documentation', 'Unemployed Female', 10],
            [ 'Mass Communication & Documentation', 'Other / No response', 115],
            [ 'Mathematical Sciences', 'FT Work Male', 85],
            [ 'Mathematical Sciences', 'Further Study Male', 45],
            [ 'Mathematical Sciences', 'Unemployed Male', 10],
            [ 'Mathematical Sciences', 'Other / No response', 80],
            [ 'Mathematical Sciences', 'FT Work Female', 65],
            [ 'Mathematical Sciences', 'Further Study Female', 35],
            [ 'Mathematical Sciences', 'Other / No response', 25],
            [ 'Medicine & Dentistry', 'FT Work Male', 165],
            [ 'Medicine & Dentistry', 'Further Study Male', 10],
            [ 'Medicine & Dentistry', 'Other / No response', 45],
            [ 'Medicine & Dentistry', 'FT Work Female', 225],
            [ 'Medicine & Dentistry', 'Further Study Female', 10],
            [ 'Medicine & Dentistry', 'Other / No response', 55],
            [ 'Physical Sciences', 'FT Work Male', 290],
            [ 'Physical Sciences', 'Further Study Male', 150],
            [ 'Physical Sciences', 'Unemployed Male', 30],
            [ 'Physical Sciences', 'Other / No response', 165],
            [ 'Physical Sciences', 'FT Work Female', 175],
            [ 'Physical Sciences', 'Further Study Female', 110],
            [ 'Physical Sciences', 'Unemployed Female', 15],
            [ 'Physical Sciences', 'Other / No response', 115],
            [ 'Social Studies', 'FT Work Male', 285],
            [ 'Social Studies', 'Further Study Male', 105],
            [ 'Social Studies', 'Unemployed Male', 10],
            [ 'Social Studies', 'Other / No response', 210],
            [ 'Social Studies', 'FT Work Female', 810],
            [ 'Social Studies', 'Further Study Female', 295],
            [ 'Social Studies', 'Unemployed Female', 30],
            [ 'Social Studies', 'Other / No response', 625],
            [ 'Subjects allied to Medicine', 'FT Work Male', 375],
            [ 'Subjects allied to Medicine', 'Further Study Male', 50],
            [ 'Subjects allied to Medicine', 'Unemployed Male', 5],
            [ 'Subjects allied to Medicine', 'Other / No response', 150],
            [ 'Subjects allied to Medicine', 'FT Work Female', 1680],
            [ 'Subjects allied to Medicine', 'Further Study Female', 155],
            [ 'Subjects allied to Medicine', 'Unemployed Female', 15],
            [ 'Subjects allied to Medicine', 'Other / No response', 625],        
        ]);
        var options = {
            height : 800,
            width : 1000,
            sankey: { node: { nodePadding: 5 } }
        } ;
        var chart = new google.visualization.Sankey(document.getElementById('us_Chart'));
        chart.draw(data, options);
        }

// Source for chart statswales - https://statswales.gov.wales/Catalogue/Education-and-Skills/Post-16-Education-and-Training/Higher-Education/Destination-of-Leavers/welshdomiciledqualifiers-by-employmentstatus-locationofstudy

        function drawChart2() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'From');
            data.addColumn('string', 'To');
            data.addColumn('number', 'People');
            data.addRows([
                ['High School Leavers', 'Remained in Education', 1129],
                ['High School Leavers', 'Working', 222],
                ['Remained in Education', 'High School', 153],
                ['Remained in Education', 'College / Technical Qualifications', 124],
                ['Remained in Education', 'Higher Education / University', 849],
                ['Remained in Education', 'Gap Year', 1],
                ['Remained in Education', 'Part-Time Education', 2],
                ['Working', 'Work-Based Training (Unemployed)', 6],
                ['Working', 'Work-Based Training (Employed)', 10],
                ['Working', 'Employed', 90],
                ['Working', 'NEET', 33],
                ['Working', 'Non-Responce / Other', 83]
        
            ]);
            var options = {
                title : 'Graduate Career Outcomes From Welsh HEI',
                height : 800,
                width : 800,
                sankey: { node: { labelPadding: 10 } }
            } ;
            var chart = new google.visualization.Sankey(document.getElementById('cs_Chart'));
            chart.draw(data, options);
            }
    
// Source for Chart 'careerwales.com' - http://s3-eu-west-1.amazonaws.com/static.live.careerswales.net/MIS%20Individual%20LEA%20for%20companies%20Year%2013%202017.pdf / https://www.careerswales.com/en/professionals/pupil-destinations/


        
    function drawChart3() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'People');
        data.addRows([
        [ '20-24 Men', 'Health, Public Services & Care', 1350],
        [ '20-24 Men', 'Science & Mathematics', 580],
        [ '20-24 Men', 'Architecture, Horticulture & Animal Care', 280],
        [ '20-24 Men', 'Engineering & Manufacturing Technologies', 3205],
        [ '20-24 Men', 'Construction & Planning', 2090],
        [ '20-24 Men', 'IT & Communication Tech', 640],
        [ '20-24 Men', 'Retail & Commercial Enterprise', 1080],
        [ '20-24 Men', 'Leisure, Travel & Tourism', 255],
        [ '20-24 Men', 'Arts, Media & Publishing', 440],
        [ '20-24 Men', 'History, Philosophy & Theology', 170],
        [ '20-24 Men', 'Social Sciences', 125],
        [ '20-24 Men', 'Languages, Literature & Culture', 485],
        [ '20-24 Men', 'Education & Training', 200],
        [ '20-24 Men', 'Preparation for Life & Work', 8460],
        [ '20-24 Men', 'Business, Administration & Law', 940],
        [ '25-39 Men', 'Health, Public Services & Care', 3075],
        [ '25-39 Men', 'Science & Mathematics', 450],
        [ '25-39 Men', 'Architecture, Horticulture & Animal Care', 435],
        [ '25-39 Men', 'Engineering & Manufacturing Technologies', 2930],
        [ '25-39 Men', 'Construction & Planning', 1960],
        [ '25-39 Men', 'IT & Communication Tech', 830],
        [ '25-39 Men', 'Retail & Commercial Enterprise', 1480],
        [ '25-39 Men', 'Leisure, Travel & Tourism', 200],
        [ '25-39 Men', 'Arts, Media & Publishing', 295],
        [ '25-39 Men', 'History, Philosophy & Theology', 180],
        [ '25-39 Men', 'Social Sciences', 80],
        [ '25-39 Men', 'Languages, Literature & Culture', 505],
        [ '25-39 Men', 'Education & Training', 540],
        [ '25-39 Men', 'Preparation for Life & Work', 12055],
        [ '25-39 Men', 'Business, Administration & Law', 2470],
        [ '40-49 Men', 'Health, Public Services & Care', 1405],
        [ '40-49 Men', 'Science & Mathematics', 90],
        [ '40-49 Men', 'Architecture, Horticulture & Animal Care', 185],
        [ '40-49 Men', 'Engineering & Manufacturing Technologies', 860],
        [ '40-49 Men', 'Construction & Planning', 495],
        [ '40-49 Men', 'IT & Communication Tech', 585],
        [ '40-49 Men', 'Retail & Commercial Enterprise', 480],
        [ '40-49 Men', 'Leisure, Travel & Tourism', 105],
        [ '40-49 Men', 'Arts, Media & Publishing', 120],
        [ '40-49 Men', 'History, Philosophy & Theology', 25],
        [ '40-49 Men', 'Social Sciences', 20],
        [ '40-49 Men', 'Languages, Literature & Culture', 200],
        [ '40-49 Men', 'Education & Training', 265],
        [ '40-49 Men', 'Preparation for Life & Work', 4950],
        [ '40-49 Men', 'Business, Administration & Law', 1300],
        [ '50-59 Men', 'Health, Public Services & Care', 1140],
        [ '50-59 Men', 'Science & Mathematics', 35],
        [ '50-59 Men', 'Architecture, Horticulture & Animal Care', 180],
        [ '50-59 Men', 'Engineering & Manufacturing Technologies', 485],
        [ '50-59 Men', 'Construction & Planning', 275],
        [ '50-59 Men', 'IT & Communication Tech', 755],
        [ '50-59 Men', 'Retail & Commercial Enterprise', 350],
        [ '50-59 Men', 'Leisure, Travel & Tourism', 85],
        [ '50-59 Men', 'Arts, Media & Publishing', 160],
        [ '50-59 Men', 'History, Philosophy & Theology', 30],
        [ '50-59 Men', 'Social Sciences', 10],
        [ '50-59 Men', 'Languages, Literature & Culture', 185],
        [ '50-59 Men', 'Education & Training', 210],
        [ '50-59 Men', 'Preparation for Life & Work', 4190],
        [ '50-59 Men', 'Business, Administration & Law', 1040],
        [ '60-64 Men', 'Health, Public Services & Care', 255],
        [ '60-64 Men', 'Science & Mathematics', 10],
        [ '60-64 Men', 'Architecture, Horticulture & Animal Care', 40],
        [ '60-64 Men', 'Engineering & Manufacturing Technologies', 70],
        [ '60-64 Men', 'Construction & Planning', 45],
        [ '60-64 Men', 'IT & Communication Tech', 310],
        [ '60-64 Men', 'Retail & Commercial Enterprise', 75],
        [ '60-64 Men', 'Leisure, Travel & Tourism', 30],
        [ '60-64 Men', 'Arts, Media & Publishing', 95],
        [ '60-64 Men', 'History, Philosophy & Theology', 10],
        [ '60-64 Men', 'Social Sciences', 5],
        [ '60-64 Men', 'Languages, Literature & Culture', 65],
        [ '60-64 Men', 'Education & Training', 45],
        [ '60-64 Men', 'Preparation for Life & Work', 1260],
        [ '60-64 Men', 'Business, Administration & Law', 230],
        [ '65+ Men', 'Health, Public Services & Care', 110],
        [ '65+ Men', 'Science & Mathematics', 15],
        [ '65+ Men', 'Architecture, Horticulture & Animal Care', 20],
        [ '65+ Men', 'Engineering & Manufacturing Technologies', 20],
        [ '65+ Men', 'Construction & Planning', 30],
        [ '65+ Men', 'IT & Communication Tech', 320],
        [ '65+ Men', 'Retail & Commercial Enterprise', 30],
        [ '65+ Men', 'Leisure, Travel & Tourism', 20],
        [ '65+ Men', 'Arts, Media & Publishing', 260],
        [ '65+ Men', 'History, Philosophy & Theology', 80],
        [ '65+ Men', 'Social Sciences', 15],
        [ '65+ Men', 'Languages, Literature & Culture', 50],
        [ '65+ Men', 'Education & Training', 25],
        [ '65+ Men', 'Preparation for Life & Work', 885],
        [ '65+ Men', 'Business, Administration & Law', 35],
        [ '20-24 Women', 'Health, Public Services & Care', 3110],
        [ '20-24 Women', 'Science & Mathematics', 810],
        [ '20-24 Women', 'Architecture, Horticulture & Animal Care', 290],
        [ '20-24 Women', 'Engineering & Manufacturing Technologies', 320],
        [ '20-24 Women', 'Construction & Planning', 70],
        [ '20-24 Women', 'IT & Communication Tech', 525],
        [ '20-24 Women', 'Retail & Commercial Enterprise', 1550],
        [ '20-24 Women', 'Leisure, Travel & Tourism', 130],
        [ '20-24 Women', 'Arts, Media & Publishing', 335],
        [ '20-24 Women', 'History, Philosophy & Theology', 205],
        [ '20-24 Women', 'Social Sciences', 150],
        [ '20-24 Women', 'Languages, Literature & Culture', 750],
        [ '20-24 Women', 'Education & Training', 325],
        [ '20-24 Women', 'Preparation for Life & Work', 8110],
        [ '20-24 Women', 'Business, Administration & Law', 1235],
        [ '25-39 Women', 'Health, Public Services & Care', 7335],
        [ '25-39 Women', 'Science & Mathematics', 975],
        [ '25-39 Women', 'Architecture, Horticulture & Animal Care', 315],
        [ '25-39 Women', 'Engineering & Manufacturing Technologies', 580],
        [ '25-39 Women', 'Construction & Planning', 150],
        [ '25-39 Women', 'IT & Communication Tech', 1425],
        [ '25-39 Women', 'Retail & Commercial Enterprise', 2970],
        [ '25-39 Women', 'Leisure, Travel & Tourism', 195],
        [ '25-39 Women', 'Arts, Media & Publishing', 500],
        [ '25-39 Women', 'History, Philosophy & Theology', 280],
        [ '25-39 Women', 'Social Sciences', 185],
        [ '25-39 Women', 'Languages, Literature & Culture', 1215],
        [ '25-39 Women', 'Education & Training', 1310],
        [ '25-39 Women', 'Preparation for Life & Work', 20055],
        [ '25-39 Women', 'Business, Administration & Law', 3580],
        [ '40-49 Women', 'Health, Public Services & Care', 3395],
        [ '40-49 Women', 'Science & Mathematics', 260],
        [ '40-49 Women', 'Architecture, Horticulture & Animal Care', 155],
        [ '40-49 Women', 'Engineering & Manufacturing Technologies', 240],
        [ '40-49 Women', 'Construction & Planning', 25],
        [ '40-49 Women', 'IT & Communication Tech', 980],
        [ '40-49 Women', 'Retail & Commercial Enterprise', 1060],
        [ '40-49 Women', 'Leisure, Travel & Tourism', 80],
        [ '40-49 Women', 'Arts, Media & Publishing', 330],
        [ '40-49 Women', 'History, Philosophy & Theology', 65],
        [ '40-49 Women', 'Social Sciences', 45],
        [ '40-49 Women', 'Languages, Literature & Culture', 520],
        [ '40-49 Women', 'Education & Training', 655],
        [ '40-49 Women', 'Preparation for Life & Work', 9010],
        [ '40-49 Women', 'Business, Administration & Law', 1895],
        [ '50-59 Women', 'Health, Public Services & Care', 2155],
        [ '50-59 Women', 'Science & Mathematics', 115],
        [ '50-59 Women', 'Architecture, Horticulture & Animal Care', 135],
        [ '50-59 Women', 'Engineering & Manufacturing Technologies', 180],
        [ '50-59 Women', 'Construction & Planning', 10],
        [ '50-59 Women', 'IT & Communication Tech', 990],
        [ '50-59 Women', 'Retail & Commercial Enterprise', 590],
        [ '50-59 Women', 'Leisure, Travel & Tourism', 75],
        [ '50-59 Women', 'Arts, Media & Publishing', 505],
        [ '50-59 Women', 'History, Philosophy & Theology', 40],
        [ '50-59 Women', 'Social Sciences', 25],
        [ '50-59 Women', 'Languages, Literature & Culture', 395],
        [ '50-59 Women', 'Education & Training', 365],
        [ '50-59 Women', 'Preparation for Life & Work', 5485],
        [ '50-59 Women', 'Business, Administration & Law', 1260],
        [ '60-64 Women', 'Health, Public Services & Care', 355],
        [ '60-64 Women', 'Science & Mathematics', 10],
        [ '60-64 Women', 'Architecture, Horticulture & Animal Care', 30],
        [ '60-64 Women', 'Engineering & Manufacturing Technologies', 35],
        [ '60-64 Women', 'IT & Communication Tech', 390],
        [ '60-64 Women', 'Retail & Commercial Enterprise', 125],
        [ '60-64 Women', 'Leisure, Travel & Tourism', 15],
        [ '60-64 Women', 'Arts, Media & Publishing', 310],
        [ '60-64 Women', 'History, Philosophy & Theology', 20],
        [ '60-64 Women', 'Languages, Literature & Culture', 130],
        [ '60-64 Women', 'Education & Training', 55],
        [ '60-64 Women', 'Preparation for Life & Work', 1415],
        [ '60-64 Women', 'Business, Administration & Law', 190],
        [ '65+ Women', 'Health, Public Services & Care', 135],
        [ '65+ Women', 'Science & Mathematics', 15],
        [ '65+ Women', 'Architecture, Horticulture & Animal Care', 15],
        [ '65+ Women', 'Engineering & Manufacturing Technologies', 20],
        [ '65+ Women', 'IT & Communication Tech', 485],
        [ '65+ Women', 'Retail & Commercial Enterprise', 110],
        [ '65+ Women', 'Leisure, Travel & Tourism', 10],
        [ '65+ Women', 'Arts, Media & Publishing', 620],
        [ '65+ Women', 'History, Philosophy & Theology', 130],
        [ '65+ Women', 'Social Sciences', 25],
        [ '65+ Women', 'Languages, Literature & Culture', 90],
        [ '65+ Women', 'Education & Training', 60],
        [ '65+ Women', 'Preparation for Life & Work', 1525],
        [ '65+ Women', 'Business, Administration & Law', 45],
    ]);
    var options = {
        height : 800,
        width : 800,
        sankey: { node: { labelPadding: 10 } }
    } ;
    var chart = new google.visualization.Sankey(document.getElementById('ts_Chart2'));
    chart.draw(data, options);
    }


    // source 'Learning activities at further education institutions by subject and age group' - https://statswales.gov.wales/Catalogue/Education-and-Skills/Post-16-Education-and-Training/Further-Education-and-Work-Based-Learning/Learners/Further-Education/learningactivitiesfurthereducationinstitutions-by-subject-age

        
      
    
    
    
    
// Cardiff only version of the chart above.  NEEDS TO BE FINISHED   
function drawChart4() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'People');
    data.addRows([
        [ 'Men', 'Agriculture, Horticulture & Animal Care', 80],
        [ 'Men', 'Arts, Media & Publishing', 550],
        [ 'Men', 'Business, Administration & Law', 870],
        [ 'Men', 'Construction & Planning', 850],
        [ 'Men', 'Education & Training', 60],
        [ 'Men', 'Engineering & Manufacturing Technologies', 655],
        [ 'Men', 'Health, Public Services & Care', 685],
        [ 'Men', 'History, Philosophy & Theology', 105],
        [ 'Men', 'IT & Communication Tech', 480],
        [ 'Men', 'Languages, Literature & Culture', 750],
        [ 'Men', 'Leisure, Travel & Tourism', 405],
        [ 'Men', 'Preparation for Life & Work', 8255],
        [ 'Men', 'Retail & Commercial Enterprise', 950],
        [ 'Men', 'Science & Mathematics', 975],
        [ 'Men', 'Social Sciences', 275],
        [ 'Women', 'Agriculture, Horticulture & Animal Care', 100],
        [ 'Women', 'Arts, Media & Publishing', 635],
        [ 'Women', 'Business, Administration & Law', 910],
        [ 'Women', 'Construction & Planning', 45],
        [ 'Women', 'Education & Training', 210],
        [ 'Women', 'Engineering & Manufacturing Technologies', 110],
        [ 'Women', 'Health, Public Services & Care', 1360],
        [ 'Women', 'History, Philosophy & Theology', 195],
        [ 'Women', 'IT & Communication Tech', 310],
        [ 'Women', 'Languages, Literature & Culture', 1140],
        [ 'Women', 'Leisure, Travel & Tourism', 200],
        [ 'Women', 'Preparation for Life & Work', 9375],
        [ 'Women', 'Retail & Commercial Enterprise', 1490],
        [ 'Women', 'Science & Mathematics', 1120],
        [ 'Women', 'Social Sciences', 415]
    ]);
    var options = {
        height : 800,
        width : 800,
        sankey: { node: { labelPadding: 10 } }
    } ;
    var chart = new google.visualization.Sankey(document.getElementById('ts_Chart'));
    chart.draw(data, options);
    }


// https://statswales.gov.wales/Catalogue/Education-and-Skills/Post-16-Education-and-Training/Further-Education-and-Work-Based-Learning/Learners/Further-Education/learningactivitiesfurthereducationinstitutions-by-sectorsubjectarea-domicile



        
function drawChart5() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'People');
    data.addRows([
        [ 'Men', 'Under 16', 1520],
        [ 'Men', '16 Years old', 41960],
        [ 'Men', '17 Years old', 36325],
        [ 'Men', '18 Years old', 20720],
        [ 'Men', '19 Years old', 10960],
        [ 'Men', '20-24 Years old', 20310],
        [ 'Men', '25-39 Years old', 27495],
        [ 'Men', '40-49 Years old', 11090],
        [ 'Men', '50-59 Years old', 9130],
        [ 'Men', '60-64 Years old', 2540],
        [ 'Men', '65 + Years old', 1905],
        [ 'Women', 'Under 16', 1215],
        [ 'Women', '16 Years old', 37105],
        [ 'Women', '17 Years old', 32945],
        [ 'Women', '18 Years old', 17360],
        [ 'Women', '19 Years old', 7920],
        [ 'Women', '20-24 Years old', 17925],
        [ 'Women', '25-39 Years old', 41080],
        [ 'Women', '40-49 Years old', 18730],
        [ 'Women', '50-59 Years old', 12325],
        [ 'Women', '60-64 Years old', 3085],
        [ 'Women', '65 + Years old', 3280],
        [ 'Under 16', 'A2-Levels', 30],
        [ 'Under 16', 'A-Levels', 30],
        [ 'Under 16', 'OCN Credit(s)', 95],
        [ 'Under 16', 'GCSE/VCE', 105],
        [ 'Under 16', 'Key Skills / Essential Skills Wales', 25],
        [ 'Under 16', 'NVQ', 70],
        [ 'Under 16', 'QCF', 245],
        [ 'Under 16', 'Other / Key Life Skills', 970],
        [ '16 Years old', 'AS-Levels', 10660],
        [ '16 Years old', 'A2-Levels', 255],
        [ 'AS-Levels', 'A-Levels', 255],
        [ 'A2-Levels', 'A-Levels', 10660],
        [ '16 Years old', 'OCN Credit(s)', 2885],
        [ '16 Years old', 'First Certificate', 15],
        [ '16 Years old', 'GCSE/VCE', 3755],
        [ '16 Years old', 'Key Skills / Essential Skills Wales', 545],
        [ '16 Years old', 'NVQ', 1610],
        [ '16 Years old', 'QCF', 12830],
        [ '16 Years old', 'Other / Key Life Skills', 41305],
        [ '17 Years old', 'AS-Levels', 3370],
        [ '17 Years old', 'A2-Levels', 6410],
        [ 'AS-Levels', 'A-Levels', 3370],
        [ 'A2-Levels', 'A-Levels', 6410],
        [ '17 Years old', 'OCN Credit(s)', 2885],
        [ '17 Years old', 'GCSE/VCE', 3755],
        [ '17 Years old', 'Key Skills / Essential Skills Wales', 545],
        [ '17 Years old', 'NVQ', 1700],
        [ '17 Years old', 'QCF', 12940],
        [ '17 Years old', 'Other / Key Life Skills', 37235],
        [ '18 Years old', 'AS-Levels', 995],
        [ '18 Years old', 'A2-Levels', 1805],
        [ 'AS-Levels', 'A-Levels', 995],
        [ 'A2-Levels', 'A-Levels', 1805],
        [ '18 Years old', 'Access Diploma', 65],
        [ '18 Years old', 'OCN Credit(s)', 2050],
        [ '18 Years old', 'GCSE/VCE', 2230],
        [ '18 Years old', 'Key Skills / Essential Skills Wales', 270],
        [ '18 Years old', 'NVQ', 1765],
        [ '18 Years old', 'QCF', 7945],
        [ '18 Years old', 'Other / Key Life Skills', 20660],
        [ '19 Years old', 'AS-Levels', 210],
        [ '19 Years old', 'A2-Levels', 255],
        [ 'AS-Levels', 'A-Levels', 210],
        [ 'A2-Levels', 'A-Levels', 255],
        [ '19 Years old', 'Access Diploma', 105],
        [ '19 Years old', 'OCN Credit(s)', 1595],
        [ '19 Years old', 'GCSE/VCE', 950],
        [ '19 Years old', 'Key Skills / Essential Skills Wales', 225],
        [ '19 Years old', 'NVQ', 1350],
        [ '19 Years old', 'QCF', 4365],
        [ '19 Years old', 'Other / Key Life Skills', 9680],
        [ '20-24 Years old', 'AS-Levels', 185],
        [ '20-24 Years old', 'A2-Levels', 130],
        [ 'AS-Levels', 'A-Levels', 130],
        [ 'A2-Levels', 'A-Levels', 185],
        [ '20-24 Years old', 'Access Diploma', 265],
        [ '20-24 Years old', 'OCN Credit(s)', 5230],
        [ '20-24 Years old', 'GCSE/VCE', 1525],
        [ '20-24 Years old', 'Key Skills / Essential Skills Wales', 490],
        [ '20-24 Years old', 'NVQ', 3505],
        [ '20-24 Years old', 'QCF', 8695],
        [ '20-24 Years old', 'Other / Key Life Skills', 17690],
        [ '25-39 Years old', 'AS-Levels', 55],
        [ '25-39 Years old', 'A2-Levels', 25],
        [ 'AS-Levels', 'A-Levels', 55],
        [ 'A2-Levels', 'A-Levels', 25],
        [ '25-39 Years old', 'Access Diploma', 390],
        [ '25-39 Years old', 'OCN Credit(s)', 14320],
        [ '25-39 Years old', 'GCSE/VCE', 1475],
        [ '25-39 Years old', 'Key Skills / Essential Skills Wales', 655],
        [ '25-39 Years old', 'NVQ', 4425],
        [ '25-39 Years old', 'QCF', 14560],
        [ '25-39 Years old', 'Other / Key Life Skills', 31890],
        [ '40-49 Years old', 'AS-Levels', 10],
        [ 'AS-Levels', 'A-Levels', 10],
        [ '40-49 Years old', 'Access Diploma', 55],
        [ '40-49 Years old', 'OCN Credit(s)', 7410],
        [ '40-49 Years old', 'GCSE/VCE', 330],
        [ '40-49 Years old', 'Key Skills / Essential Skills Wales', 290],
        [ '40-49 Years old', 'NVQ', 1640],
        [ '40-49 Years old', 'QCF', 5715],
        [ '40-49 Years old', 'Other / Key Life Skills', 14100],
        [ '50-59 Years old', 'OCN Credit(s)', 6320],
        [ '50-59 Years old', 'GCSE/VCE', 110],
        [ '50-59 Years old', 'Key Skills / Essential Skills Wales', 130],
        [ '50-59 Years old', 'NVQ', 875],
        [ '50-59 Years old', 'QCF', 3305],
        [ '50-59 Years old', 'Other / Key Life Skills', 10585],
        [ '60-64 Years old', 'OCN Credit(s)', 2030],
        [ '60-64 Years old', 'NVQ', 100],
        [ '60-64 Years old', 'QCF', 500],
        [ '60-64 Years old', 'Other / Key Life Skills', 2935],
        [ '65 + Years old', 'OCN Credit(s)', 2565],
        [ '65 + Years old', 'GCSE/VCE', 15],
        [ '65 + Years old', 'Key Skills / Essential Skills Wales', 30],
        [ '65 + Years old', 'NVQ', 20],
        [ '65 + Years old', 'QCF', 290],
        [ '65 + Years old', 'Other / Key Life Skills', 2255],
    ]);
    var options = {
        height : 1000,
        width : 800,
        sankey: { node: { labelPadding: 10 } }
    } ;
    var chart = new google.visualization.Sankey(document.getElementById('as_Chart'));
    chart.draw(data, options);
    }


// Sourced from https://statswales.gov.wales/Catalogue/Education-and-Skills/Post-16-Education-and-Training/Further-Education-and-Work-Based-Learning/Learners/Further-Education/learningactivitiesfurthereducationinstitutions-by-qualificationtype-age-gender



