// Calculo de pH

let dataSet=[]
let titulationVolumen=0
let previosGraph=false

function updatePoints() {
    console.log("enter")
    let numberOfPoints=inputPoints.value
    numberPoint.textContent=numberOfPoints
}

function createTitulation() {

    
    // Concentración inicial del ácido (analito)
    let concentrationAcid = inputAcidConcentration.value > 0 ? inputAcidConcentration.value : 0.1
    // Concentración inicial de la base (titulante)
    let concentrationBasis = inputBasisConcentration.value > 0 ? inputBasisConcentration.value : 0.1
    console.log("concentrationBasis",concentrationBasis)
    // Número de puntos en la curva de titulación 
    let points = inputPoints.value > 0 ? inputPoints.value : 10
    // Volumen de analito a titular 
    let initialVol=25
    // Concentración molar del ácido al inicio 
    let molAcid=initialVol*(1/1000)*concentrationAcid
    console.log("moles del analito",molAcid)
    // Calculo de la concentración del volumen de equivalencia 
    let equivalenceVolume = molAcid*(1/concentrationBasis)*(1000/1)
    console.log("volumen de eq ",equivalenceVolume)
    // Volumen total de titulación 
    let finalVolumen = equivalenceVolume*2
    console.log("volumen del titulación ",finalVolumen)
    // Calculo del incremento o volumen agregado del titulante en base al número de puntos de la gráfica 
    let increment = finalVolumen / points
    let volumeIncremet=increment
    let volumeBasis=[]
    let pH=[]
    
    for (let i = 0; i <= points; i++) {
        let volumeAdded = volumeIncremet*i
        volumeBasis[i]=volumeAdded
        let molBasis = volumeAdded*(1/1000)*concentrationBasis
        let diffMol=molAcid-molBasis
        let volumeTotal= (initialVol+volumeAdded)*(1/1000)

        if (diffMol > 0){
            pH[i]=-Math.log10(diffMol/volumeTotal)
        }else if(diffMol == 0){
            pH[i]=7
        }else{
            let concOH=molBasis-molAcid
            pH[i]=14+Math.log10(concOH/volumeTotal)
        }

        dataSet[i]=[volumeBasis[i],pH[i]]
    }
    
    titulationVolumen=finalVolumen
    createGraph(dataSet,finalVolumen)
    previosGraph=true

}

// Rebuild graph in any resize

window.addEventListener('resize', () => { 
    if(previosGraph){
        createGraph(dataSet,titulationVolumen)
    }
});



function createGraph(data,maxVolume) {

    // Se verifica si existe otra gráfica y se elimina 
    
    if (grafica.children.length != 0) {
        grafica.innerHTML=''
    }
    

    // Definir valores del tamaño de la gráfica 
     let width = grafica.offsetWidth
     let height = grafica.offsetHeight

     console.log(height)

    // Create a container for bar chart

    let padding = 50


    // Se crea la escala del eje x 
    const xScale = d3.scaleLinear()

    .domain([0,maxVolume])
    .range([padding, width-padding]);

    const yScale = d3.scaleLinear()
    .domain([14,0])
    .range([padding,height - padding]);

    const svg = d3.select('#grafica')
    .append("svg")
    .attr("width",width)
    .attr("height",height)
    
    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy", d=> yScale(d[1]))
    .attr("r", 5)
    .attr("class",(d) => d[1]==7 ? 'equivalencePoint':'point')
    .append("title")
    .text( d=>`pH:${d[1].toFixed(2)} 
volumen: ${d[0].toFixed(2)} ml`)
    
    // const xAxis = d3.axisBottom(xScale);
    
    // const yAxis = d3.axisLeft(yScale);

    const xAxis = d3.axisBottom(xScale).ticks(10);
    
    const yAxis = d3.axisLeft(yScale).ticks(10);

    const xAxisGrid = d3.axisBottom(xScale).tickSize(-height+2*padding).tickFormat('').ticks(10);
    
    const yAxisGrid = d3.axisLeft(yScale).tickSize(-width+2*padding).tickFormat('').ticks(10);

    // Create grids.
    svg.append('g')
    .attr('class', 'xAxeGrid')
    .attr('transform', `translate(0,${height-padding})`)
    .call(xAxisGrid);

    svg.append('g')
    .attr('class', 'yAxeGrid')
    .attr('transform', `translate(${padding},0)`)
    .call(yAxisGrid);



    svg.append("g")
    .attr("transform", "translate(0," + (height - padding) + ")")
    .call(xAxis);

    svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

    svg.append("text")
    .attr("text-anchor", "end")
    .attr("class", "axisLabel")
    .attr("x", width-padding)
    .attr("y", height-15)
    .text('Volumen NaOH (ml)');

    svg.append("text")
    .attr("class", "axisLabel")
    .attr("text-anchor", "end")
    .attr("y", padding/3)
    .attr("x", padding)
    .attr("dy", ".75em")
    .text("pH");

    svg.append("text")
    .attr("class", "graphTitle")
    .attr("text-anchor", "middle")
    .attr("y", padding/3)
    .attr("x", width/2)
    .attr("dy", ".75em")
    .text("Titulación de HCl con NaOH");
    
}

