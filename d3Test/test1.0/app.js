// Calculo de pH


let dataSet=[]

function createTitulation(increment,points) {
    let initialVol=25
    let concentrationAcid=0.1
    let concentrationBasis=0.1
    let molAcid=initialVol*(1/1000)*concentrationAcid
    let volumeIncremet=increment
    let volumeBasis=[]
    let pH=[]
    
    for (let i = 0; i < points; i++) {
        let volumeAdded = volumeIncremet*i
        volumeBasis[i]=volumeAdded
        let molBasis = volumeAdded*(1/1000)*concentrationBasis
        let diffMol=molAcid-molBasis
        let volumeTotal= (initialVol+volumeAdded)*(1/1000)
        
        if (diffMol > 0){
            console.log("Antes del PE")
            pH[i]=-Math.log(diffMol/volumeTotal)
            console.log(-Math.log10(diffMol/volumeTotal))
        }else if(diffMol == 0){
            console.log("En el PE")
            pH[i]=7
            console.log(7)
        }else{
            console.log("Después del PE")
            let concOH=molBasis-molAcid
            pH[i]=14+Math.log(concOH/volumeTotal)
            console.log(14+Math.log10(concOH/volumeTotal))
        }

        dataSet[i]=[volumeBasis[i],pH[i]]
    }

    createGraph(dataSet)
}



function createGraph(data) {
    // crear grafica 

let width = 500
let height = 280

// Create a container for bar chart

let padding = 20

const xScale = d3.scaleLinear()
.domain([0, d3.max(data, (d) => d[0])])
.range([padding, width - padding]);

const yScale = d3.scaleLinear()
.domain([14,0])
.range([padding, height - padding]);


const svg = d3.select('#grafica')
                .append("svg")
                .attr("width",width)
                .attr("height",height)

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => d[0]*10)
    .attr("cy", d=> height - d[1]*20)
    .attr("r", 5)
    .attr("fill",'#959CE8')

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height-25)
    .text("Volumen agregado de NaOH (ml)");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("pH");
    
}

