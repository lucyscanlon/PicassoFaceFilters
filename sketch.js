/*
  
*/

// declare variables
let facemesh,
    video,
    predictions = [],
    portraitMode,
    savedPointsX = [];
    savedPointsY = [];

// preload function
function preload() {
  // load the images to display the portraits in the information / description section
  painting1900 = loadImage('images/18.jpeg');
  painting1901 = loadImage('images/20.jpeg');
  painting1906 = loadImage('images/24.jpeg');
  painting1907 = loadImage('images/25.jpeg');
  painting1965 = loadImage('images/83.jpeg');
}

// setup function
function setup() {

  // create the canvas - needs enough space for the webcam, text descriptions and timeline
  createCanvas(1040, 550);
  video = createCapture(VIDEO);
  video.size(width, height - 40);
  video.position(0, 0);

  facemesh = ml5.facemesh(video, modelReady);

  // Set the portrait mode to 0 - this loads the first portrait and filter automatically 
  portraitMode = 0;

  let hasLogged = false;

  facemesh.on("face", preds => {
    predictions = preds;

    if (!hasLogged) {
      console.log("The predictions object:");
      console.log(preds);
      console.log("The list of 'annotations' in `predictions[0].annotations` (accessible as a property, and containing an array of points in that part of the face:)");
      console.log(Object.keys(preds[0].annotations));
      hasLogged = true;

    }
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

// draw function
function draw() {

  // display the webcam
  image(video, 0, 0, width - 400, height - 70);

  // depending on the value of the portrait mode variable - display a certain filter 
  if (portraitMode === 0) {
    drawRealismPortrait();
  } else if (portraitMode === 1) {
    drawBluesPortrait();
  } else if (portraitMode === 2) {
    drawExpressionistPortrait();
  } else if (portraitMode === 3) {
    drawAfricanInfluencedPortrait();
  } else if (portraitMode === 4) {
    drawCubismPortrait();
  }

  // call save points function to save the coordinates of the face mesh
  savepoints();

  // call the draw timeline function
  drawTimeline();

  // call the draw text description function
  drawTextDescription();

  // draw the navigation instructions
  drawNavigationInstructions();
}

// A function to save the keypoints to two arrays for the x and y coordinates
function savepoints() {
  for (let i = 0; i < predictions.length; i++) {
    const keypoints = predictions[i].scaledMesh;

    // save the keypoints to the savedPoints array
    for (let j = 0; j < keypoints.length; j++) {
      const [x, y, z] = keypoints[j]; 

      // save the x and y to the arrays
      savedPointsX[j] = x;
      savedPointsY[j] = y;

      // draw the facial mesh points as blue circles 
      fill(0, 0, 255);
      //ellipse(x, y, 2, 2);

    }
  }
}

// function to draw the realism 1900 portrait
function drawRealismPortrait() {

  // add filter to replicate the portrait
  filter(POSTERIZE, 9);
  filter(GRAY);
  
  // draw white nose 
  fill(255, 255, 255, 20);
  noStroke();

    fill(255, 255, 255, 70);
    beginShape();
    vertex(savedPointsX[195], savedPointsY[195]);
    vertex(savedPointsX[3], savedPointsY[3]);
    vertex(savedPointsX[51], savedPointsY[51]);
    vertex(savedPointsX[45], savedPointsY[45]);
    vertex(savedPointsX[1], savedPointsY[1]);
    vertex(savedPointsX[275], savedPointsY[275]);
    vertex(savedPointsX[281], savedPointsY[281]);
    vertex(savedPointsX[248], savedPointsY[248]);
    vertex(savedPointsX[195], savedPointsY[195]);
    endShape();


  // draw nose shadow
  fill(0, 0, 0, 40);
  beginShape();
  vertex(savedPointsX[3], savedPointsY[3]);
  vertex(savedPointsX[134], savedPointsY[134]);
  vertex(savedPointsX[131], savedPointsY[131]);
  vertex(savedPointsX[49], savedPointsY[49]);
  vertex(savedPointsX[64], savedPointsY[64]);
  vertex(savedPointsX[240], savedPointsY[240]);
  vertex(savedPointsX[99], savedPointsY[99]);
  vertex(savedPointsX[238], savedPointsY[238]);
  vertex(savedPointsX[1], savedPointsY[1]);
  vertex(savedPointsX[45], savedPointsY[45]);
  vertex(savedPointsX[3], savedPointsY[3]);
  endShape();

  // draw side of nose
  beginShape();
  vertex(savedPointsX[131], savedPointsY[131]);
  vertex(savedPointsX[198], savedPointsY[198]);
  vertex(savedPointsX[217], savedPointsY[217]);
  vertex(savedPointsX[114], savedPointsY[114]);
  vertex(savedPointsX[128], savedPointsY[128]);
  vertex(savedPointsX[244], savedPointsY[244]);
  vertex(savedPointsX[193], savedPointsY[193]);
  vertex(savedPointsX[122], savedPointsY[122]);
  vertex(savedPointsX[196], savedPointsY[196]);
  vertex(savedPointsX[3], savedPointsY[3]);
  vertex(savedPointsX[134], savedPointsY[134]);
  vertex(savedPointsX[131], savedPointsY[131]);
  endShape();

  // draw left cheekbone 
  beginShape();
  vertex(savedPointsX[127], savedPointsY[127]);
  vertex(savedPointsX[116], savedPointsY[116]);
  vertex(savedPointsX[187], savedPointsY[187]);
  vertex(savedPointsX[207], savedPointsY[207]);
  vertex(savedPointsX[214], savedPointsY[214]);
  vertex(savedPointsX[210], savedPointsY[210]);
  vertex(savedPointsX[211], savedPointsY[211]);
  vertex(savedPointsX[140], savedPointsY[140]);
  vertex(savedPointsX[176], savedPointsY[176]);
  vertex(savedPointsX[150], savedPointsY[150]);
  vertex(savedPointsX[136], savedPointsY[136]);
  vertex(savedPointsX[172], savedPointsY[172]);
  vertex(savedPointsX[58], savedPointsY[58]);
  vertex(savedPointsX[132], savedPointsY[132]);
  vertex(savedPointsX[93], savedPointsY[93]);
  vertex(savedPointsX[234], savedPointsY[234]);
  vertex(savedPointsX[127], savedPointsY[127]);
  endShape();

  // draw right cheekbone
  beginShape();
  vertex(savedPointsX[400], savedPointsY[400]);
  vertex(savedPointsX[369], savedPointsY[369]);
  vertex(savedPointsX[431], savedPointsY[431]);
  vertex(savedPointsX[430], savedPointsY[430]);
  vertex(savedPointsX[434], savedPointsY[434]);
  vertex(savedPointsX[427], savedPointsY[427]);
  vertex(savedPointsX[411], savedPointsY[411]);
  vertex(savedPointsX[345], savedPointsY[345]);
  vertex(savedPointsX[264], savedPointsY[264]);
  vertex(savedPointsX[356], savedPointsY[356]);
  vertex(savedPointsX[454], savedPointsY[454]);
  vertex(savedPointsX[323], savedPointsY[323]);
  vertex(savedPointsX[361], savedPointsY[361]);
  vertex(savedPointsX[288], savedPointsY[288]);
  vertex(savedPointsX[397], savedPointsY[397]);
  vertex(savedPointsX[365], savedPointsY[365]);
  vertex(savedPointsX[379], savedPointsY[379]);
  vertex(savedPointsX[378], savedPointsY[378]);
  vertex(savedPointsX[400], savedPointsY[400]);
  endShape();

  // draw right nose shadow
  beginShape();
  vertex(savedPointsX[305], savedPointsY[305]);
  vertex(savedPointsX[392], savedPointsY[392]);
  vertex(savedPointsX[344], savedPointsY[344]);
  vertex(savedPointsX[360], savedPointsY[360]);
  vertex(savedPointsX[279], savedPointsY[279]);
  vertex(savedPointsX[358], savedPointsY[358]);
  vertex(savedPointsX[294], savedPointsY[294]);
  vertex(savedPointsX[455], savedPointsY[455]);
  vertex(savedPointsX[305], savedPointsY[305]);
  endShape();

  // draw chin 
  beginShape();
  vertex(savedPointsX[140], savedPointsY[140]);
  vertex(savedPointsX[171], savedPointsY[171]);
  vertex(savedPointsX[175], savedPointsY[175]);
  vertex(savedPointsX[396], savedPointsY[396]);
  vertex(savedPointsX[400], savedPointsY[400]);
  vertex(savedPointsX[377], savedPointsY[377]);
  vertex(savedPointsX[152], savedPointsY[152]);
  vertex(savedPointsX[148], savedPointsY[148]);
  vertex(savedPointsX[176], savedPointsY[176]);
  vertex(savedPointsX[140], savedPointsY[140]);
  endShape();

  // draw left eyebrow
  fill(0, 0, 0, 100);
  beginShape();
  vertex(savedPointsX[336], savedPointsY[336]);
  vertex(savedPointsX[296], savedPointsY[296]);
  vertex(savedPointsX[334], savedPointsY[334]);
  vertex(savedPointsX[293], savedPointsY[293]);
  vertex(savedPointsX[300], savedPointsY[300]);
  vertex(savedPointsX[383], savedPointsY[383]);
  vertex(savedPointsX[276], savedPointsY[276]);
  vertex(savedPointsX[283], savedPointsY[283]);
  vertex(savedPointsX[282], savedPointsY[282]);
  vertex(savedPointsX[295], savedPointsY[295]);
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[336], savedPointsY[336]);
  endShape();

  // draw right eyebrow 
  beginShape();
  vertex(savedPointsX[107], savedPointsY[107]);
  vertex(savedPointsX[66], savedPointsY[66]);
  vertex(savedPointsX[105], savedPointsY[105]);
  vertex(savedPointsX[63], savedPointsY[63]);
  vertex(savedPointsX[70], savedPointsY[70]);
  vertex(savedPointsX[156], savedPointsY[156]);
  vertex(savedPointsX[46], savedPointsY[46]);
  vertex(savedPointsX[53], savedPointsY[53]);
  vertex(savedPointsX[52], savedPointsY[52]);
  vertex(savedPointsX[65], savedPointsY[65]);
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[107], savedPointsY[107]);
  endShape();

  // draw right eye shadow
  fill(0, 0, 0, 50);
  beginShape();
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[417], savedPointsY[417]);
  vertex(savedPointsX[351], savedPointsY[351]);
  vertex(savedPointsX[463], savedPointsY[463]);
  vertex(savedPointsX[398], savedPointsY[398]);
  vertex(savedPointsX[384], savedPointsY[384]);
  vertex(savedPointsX[385], savedPointsY[385]);
  vertex(savedPointsX[257], savedPointsY[257]);
  vertex(savedPointsX[444], savedPointsY[444]);
  vertex(savedPointsX[283], savedPointsY[283]);
  vertex(savedPointsX[282], savedPointsY[282]);
  vertex(savedPointsX[295], savedPointsY[295]);
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[285], savedPointsY[285]);
  endShape();

  beginShape();
  vertex(savedPointsX[373], savedPointsY[373]);
  vertex(savedPointsX[390], savedPointsY[390]);
  vertex(savedPointsX[249], savedPointsY[249]);
  vertex(savedPointsX[359], savedPointsY[359]);
  vertex(savedPointsX[467], savedPointsY[467]);
  vertex(savedPointsX[446], savedPointsY[446]);
  vertex(savedPointsX[255], savedPointsY[255]);
  vertex(savedPointsX[339], savedPointsY[339]);
  vertex(savedPointsX[373], savedPointsY[373]);
  endShape();

  // draw left eye shadow
  beginShape();
  vertex(savedPointsX[193], savedPointsY[193]);
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[65], savedPointsY[65]);
  vertex(savedPointsX[52], savedPointsY[52]);
  vertex(savedPointsX[53], savedPointsY[53]);
  vertex(savedPointsX[46], savedPointsY[46]);
  vertex(savedPointsX[156], savedPointsY[156]);
  vertex(savedPointsX[35], savedPointsY[35]);
  vertex(savedPointsX[31], savedPointsY[31]);
  vertex(savedPointsX[228], savedPointsY[228]);
  vertex(savedPointsX[229], savedPointsY[229]);
  vertex(savedPointsX[230], savedPointsY[230]);
  vertex(savedPointsX[23], savedPointsY[23]);
  vertex(savedPointsX[144], savedPointsY[144]);
  vertex(savedPointsX[163], savedPointsY[163]);
  vertex(savedPointsX[7], savedPointsY[7]);
  vertex(savedPointsX[33], savedPointsY[33]);
  vertex(savedPointsX[246], savedPointsY[246]);
  vertex(savedPointsX[161], savedPointsY[161]);
  vertex(savedPointsX[160], savedPointsY[160]);
  vertex(savedPointsX[159], savedPointsY[159]);
  vertex(savedPointsX[158], savedPointsY[158]);
  vertex(savedPointsX[157], savedPointsY[157]);
  vertex(savedPointsX[173], savedPointsY[173]);
  vertex(savedPointsX[128], savedPointsY[128]);
  vertex(savedPointsX[244], savedPointsY[244]);
  vertex(savedPointsX[193], savedPointsY[193]);
  endShape();

  // eye lines 
  stroke(0, 0, 0, 50);
  strokeWeight(1);
  line(savedPointsX[226], savedPointsY[226], savedPointsX[247], savedPointsY[247]);
  line(savedPointsX[247], savedPointsY[247], savedPointsX[30], savedPointsY[30]);
  line(savedPointsX[30], savedPointsY[30], savedPointsX[29], savedPointsY[29]);
  line(savedPointsX[29], savedPointsY[29], savedPointsX[27], savedPointsY[27]);
  line(savedPointsX[27], savedPointsY[27], savedPointsX[28], savedPointsY[28]);
  line(savedPointsX[28], savedPointsY[28], savedPointsX[56], savedPointsY[56]);
  line(savedPointsX[56], savedPointsY[56], savedPointsX[190], savedPointsY[190]);

  line(savedPointsX[286], savedPointsY[286], savedPointsX[258], savedPointsY[258]);
  line(savedPointsX[258], savedPointsY[258], savedPointsX[257], savedPointsY[257]);
  line(savedPointsX[257], savedPointsY[257], savedPointsX[259], savedPointsY[259]);
  line(savedPointsX[259], savedPointsY[259], savedPointsX[260], savedPointsY[260]);
  noStroke();

}

// function to draw the 1901 portrait from the 'Blue Period'
function drawBluesPortrait() {

  // blue overlay 
  fill(67, 106, 153, 100);
  rect(0, 0, width, height);

  noStroke();
  //draw right cheek
  fill(100, 127, 151);
  beginShape();
  vertex(savedPointsX[332], savedPointsY[332]);
  vertex(savedPointsX[298], savedPointsY[298]);
  vertex(savedPointsX[301], savedPointsY[301]);
  vertex(savedPointsX[368], savedPointsY[368]);
  vertex(savedPointsX[345], savedPointsY[345]);
  vertex(savedPointsX[280], savedPointsY[280]);
  vertex(savedPointsX[434], savedPointsY[434]);
  vertex(savedPointsX[430], savedPointsY[430]);
  vertex(savedPointsX[431], savedPointsY[431]);
  vertex(savedPointsX[262], savedPointsY[262]);
  vertex(savedPointsX[396], savedPointsY[396]);
  vertex(savedPointsX[175], savedPointsY[175]);
  vertex(savedPointsX[152], savedPointsY[152]);
  vertex(savedPointsX[377], savedPointsY[377]);
  vertex(savedPointsX[400], savedPointsY[400]);
  vertex(savedPointsX[378], savedPointsY[378]);
  vertex(savedPointsX[379], savedPointsY[379]);
  vertex(savedPointsX[365], savedPointsY[365]);
  vertex(savedPointsX[397], savedPointsY[397]);
  vertex(savedPointsX[288], savedPointsY[288]);
  vertex(savedPointsX[361], savedPointsY[361]);
  vertex(savedPointsX[323], savedPointsY[323]);
  vertex(savedPointsX[454], savedPointsY[454]);
  vertex(savedPointsX[356], savedPointsY[356]);
  vertex(savedPointsX[389], savedPointsY[389]);
  vertex(savedPointsX[251], savedPointsY[251]);
  vertex(savedPointsX[284], savedPointsY[284]);
  vertex(savedPointsX[332], savedPointsY[332]);
  endShape();

  // draw left cheek
  beginShape();
  vertex(savedPointsX[103], savedPointsY[103]);
  vertex(savedPointsX[68], savedPointsY[68]);
  vertex(savedPointsX[71], savedPointsY[71]);
  vertex(savedPointsX[139], savedPointsY[139]);
  vertex(savedPointsX[116], savedPointsY[116]);
  vertex(savedPointsX[50], savedPointsY[50]);
  vertex(savedPointsX[214], savedPointsY[214]);
  vertex(savedPointsX[210], savedPointsY[210]);
  vertex(savedPointsX[211], savedPointsY[211]);
  vertex(savedPointsX[32], savedPointsY[32]);
  vertex(savedPointsX[171], savedPointsY[171]);
  vertex(savedPointsX[175], savedPointsY[175]);
  vertex(savedPointsX[152], savedPointsY[152]);
  vertex(savedPointsX[148], savedPointsY[148]);
  vertex(savedPointsX[176], savedPointsY[176]);
  vertex(savedPointsX[149], savedPointsY[149]);
  vertex(savedPointsX[150], savedPointsY[150]);
  vertex(savedPointsX[136], savedPointsY[136]);
  vertex(savedPointsX[172], savedPointsY[172]);
  vertex(savedPointsX[58], savedPointsY[58]);
  vertex(savedPointsX[132], savedPointsY[132]);
  vertex(savedPointsX[93], savedPointsY[93]);
  vertex(savedPointsX[234], savedPointsY[234]);
  vertex(savedPointsX[127], savedPointsY[127]);
  vertex(savedPointsX[162], savedPointsY[162]);
  vertex(savedPointsX[21], savedPointsY[21]);
  vertex(savedPointsX[54], savedPointsY[54]);
  vertex(savedPointsX[103], savedPointsY[103]);
  endShape();

  // draw right eye shadow
  beginShape();
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[442], savedPointsY[442]);
  vertex(savedPointsX[257], savedPointsY[257]);
  vertex(savedPointsX[258], savedPointsY[258]);
  vertex(savedPointsX[286], savedPointsY[286]);
  vertex(savedPointsX[398], savedPointsY[398]);
  vertex(savedPointsX[382], savedPointsY[382]);
  vertex(savedPointsX[381], savedPointsY[381]);
  vertex(savedPointsX[380], savedPointsY[380]);
  vertex(savedPointsX[374], savedPointsY[374]);
  vertex(savedPointsX[373], savedPointsY[373]);
  vertex(savedPointsX[390], savedPointsY[390]);
  vertex(savedPointsX[249], savedPointsY[249]);
  vertex(savedPointsX[263], savedPointsY[263]);
  vertex(savedPointsX[261], savedPointsY[261]);
  vertex(savedPointsX[448], savedPointsY[448]);
  vertex(savedPointsX[449], savedPointsY[449]);
  vertex(savedPointsX[253], savedPointsY[253]);
  vertex(savedPointsX[452], savedPointsY[452]);
  vertex(savedPointsX[343], savedPointsY[343]);
  vertex(savedPointsX[413], savedPointsY[413]);
  vertex(savedPointsX[285], savedPointsY[285]);
  endShape();

  // draw left eye shadow
  beginShape();
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[222], savedPointsY[222]);
  vertex(savedPointsX[27], savedPointsY[27]);
  vertex(savedPointsX[158], savedPointsY[158]);
  vertex(savedPointsX[157], savedPointsY[157]);
  vertex(savedPointsX[173], savedPointsY[173]);
  vertex(savedPointsX[155], savedPointsY[155]);
  vertex(savedPointsX[154], savedPointsY[154]);
  vertex(savedPointsX[153], savedPointsY[153]);
  vertex(savedPointsX[145], savedPointsY[145]);
  vertex(savedPointsX[144], savedPointsY[144]);
  vertex(savedPointsX[163], savedPointsY[163]);
  vertex(savedPointsX[7], savedPointsY[7]);
  vertex(savedPointsX[33], savedPointsY[33]);
  vertex(savedPointsX[228], savedPointsY[228]);
  vertex(savedPointsX[229], savedPointsY[229]);
  vertex(savedPointsX[230], savedPointsY[230]);
  vertex(savedPointsX[22], savedPointsY[22]);
  vertex(savedPointsX[232], savedPointsY[232]);
  vertex(savedPointsX[114], savedPointsY[114]);
  vertex(savedPointsX[128], savedPointsY[128]);
  vertex(savedPointsX[244], savedPointsY[244]);
  vertex(savedPointsX[189], savedPointsY[189]);
  vertex(savedPointsX[55], savedPointsY[55]);
  endShape();

  // draw right side nose shadows 
  fill(100, 127, 151, 255);
  beginShape();
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[417], savedPointsY[417]);
  vertex(savedPointsX[351], savedPointsY[351]);
  vertex(savedPointsX[419], savedPointsY[419]);
  vertex(savedPointsX[248], savedPointsY[248]);
  vertex(savedPointsX[281], savedPointsY[281]);
  vertex(savedPointsX[440], savedPointsY[440]);
  vertex(savedPointsX[438], savedPointsY[438]);
  vertex(savedPointsX[305], savedPointsY[305]);
  vertex(savedPointsX[455], savedPointsY[455]);
  vertex(savedPointsX[358], savedPointsY[358]);
  vertex(savedPointsX[279], savedPointsY[279]);
  vertex(savedPointsX[429], savedPointsY[429]);
  vertex(savedPointsX[420], savedPointsY[420]);
  vertex(savedPointsX[437], savedPointsY[437]);
  vertex(savedPointsX[343], savedPointsY[343]);
  vertex(savedPointsX[357], savedPointsY[357]);
  vertex(savedPointsX[413], savedPointsY[413]);
  vertex(savedPointsX[285], savedPointsY[285]);
  endShape();

 

  // draw left side nose shadows
  beginShape();
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[193], savedPointsY[193]);
  vertex(savedPointsX[122], savedPointsY[122]);
  vertex(savedPointsX[196], savedPointsY[196]);
  vertex(savedPointsX[3], savedPointsY[3]);
  vertex(savedPointsX[51], savedPointsY[51]);
  vertex(savedPointsX[220], savedPointsY[220]);
  vertex(savedPointsX[218], savedPointsY[218]);
  vertex(savedPointsX[75], savedPointsY[75]);
  vertex(savedPointsX[235], savedPointsY[235]);
  vertex(savedPointsX[64], savedPointsY[64]);
  vertex(savedPointsX[129], savedPointsY[129]);
  vertex(savedPointsX[49], savedPointsY[49]);
  vertex(savedPointsX[209], savedPointsY[209]);
  vertex(savedPointsX[198], savedPointsY[198]);
  vertex(savedPointsX[217], savedPointsY[217]);
  vertex(savedPointsX[114], savedPointsY[114]);
  vertex(savedPointsX[189], savedPointsY[189]);
  vertex(savedPointsX[55], savedPointsY[55]);
  endShape();

  fill(38, 62, 94, 255);
  beginShape();
  vertex(savedPointsX[59], savedPointsY[59]);
  vertex(savedPointsX[75], savedPointsY[75]);
  vertex(savedPointsX[166], savedPointsY[166]);
  vertex(savedPointsX[218], savedPointsY[218]);
  vertex(savedPointsX[239], savedPointsY[239]);
  vertex(savedPointsX[44], savedPointsY[44]);
  vertex(savedPointsX[241], savedPointsY[241]);
  vertex(savedPointsX[19], savedPointsY[19]);
  vertex(savedPointsX[354], savedPointsY[354]);
  vertex(savedPointsX[274], savedPointsY[274]);
  vertex(savedPointsX[459], savedPointsY[459]);
  vertex(savedPointsX[392], savedPointsY[392]);
  vertex(savedPointsX[305], savedPointsY[305]);
  vertex(savedPointsX[290], savedPointsY[290]);
  vertex(savedPointsX[462], savedPointsY[462]);
  vertex(savedPointsX[94], savedPointsY[94]);
  vertex(savedPointsX[242], savedPointsY[242]);
  vertex(savedPointsX[60], savedPointsY[60]);
  vertex(savedPointsX[59], savedPointsY[59]);
  endShape();


  // draw bottom lip
  fill(203, 152, 133, 255);
  beginShape();
  vertex(savedPointsX[61], savedPointsY[61]);
  vertex(savedPointsX[78], savedPointsY[78]);
  vertex(savedPointsX[96], savedPointsY[96]);
  vertex(savedPointsX[88], savedPointsY[88]);
  vertex(savedPointsX[178], savedPointsY[178]);
  vertex(savedPointsX[87], savedPointsY[87]);
  vertex(savedPointsX[14], savedPointsY[14]);
  vertex(savedPointsX[317], savedPointsY[317]);
  vertex(savedPointsX[402], savedPointsY[402]);
  vertex(savedPointsX[318], savedPointsY[318]);
  vertex(savedPointsX[325], savedPointsY[325]);
  vertex(savedPointsX[308], savedPointsY[308]);
  vertex(savedPointsX[291], savedPointsY[291]);
  vertex(savedPointsX[375], savedPointsY[375]);
  vertex(savedPointsX[321], savedPointsY[321]);
  vertex(savedPointsX[405], savedPointsY[405]);
  vertex(savedPointsX[314], savedPointsY[314]);
  vertex(savedPointsX[17], savedPointsY[17]);
  vertex(savedPointsX[84], savedPointsY[84]);
  vertex(savedPointsX[181], savedPointsY[181]);
  vertex(savedPointsX[91], savedPointsY[91]);
  vertex(savedPointsX[146], savedPointsY[146]);
  vertex(savedPointsX[61], savedPointsY[61]);
  endShape();

  // draw top lip 
  fill(193, 133, 110, 255);
  beginShape();
  vertex(savedPointsX[61], savedPointsY[61]);
  vertex(savedPointsX[184], savedPointsY[184]);
  vertex(savedPointsX[74], savedPointsY[74]);
  vertex(savedPointsX[73], savedPointsY[73]);
  vertex(savedPointsX[72], savedPointsY[72]);
  vertex(savedPointsX[11], savedPointsY[11]);
  vertex(savedPointsX[302], savedPointsY[302]);
  vertex(savedPointsX[303], savedPointsY[303]);
  vertex(savedPointsX[304], savedPointsY[304]);
  vertex(savedPointsX[408], savedPointsY[408]);
  vertex(savedPointsX[306], savedPointsY[306]);
  vertex(savedPointsX[308], savedPointsY[308]);
  vertex(savedPointsX[415], savedPointsY[415]);
  vertex(savedPointsX[310], savedPointsY[310]);
  vertex(savedPointsX[311], savedPointsY[311]);
  vertex(savedPointsX[312], savedPointsY[312]);
  vertex(savedPointsX[13], savedPointsY[13]);
  vertex(savedPointsX[82], savedPointsY[82]);
  vertex(savedPointsX[81], savedPointsY[81]);
  vertex(savedPointsX[80], savedPointsY[80]);
  vertex(savedPointsX[191], savedPointsY[191]);
  vertex(savedPointsX[183], savedPointsY[183]);
  vertex(savedPointsX[78], savedPointsY[78]);
  vertex(savedPointsX[61], savedPointsY[61]);
  endShape();

  // draw nose bridge 
  fill(211, 200, 170, 255);
  beginShape();
  vertex(savedPointsX[107], savedPointsY[107]);
  vertex(savedPointsX[9], savedPointsY[9]);
  vertex(savedPointsX[336], savedPointsY[336]);
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[417], savedPointsY[417]);
  vertex(savedPointsX[351], savedPointsY[351]);
  vertex(savedPointsX[419], savedPointsY[419]);
  vertex(savedPointsX[248], savedPointsY[248]);
  vertex(savedPointsX[281], savedPointsY[281]);
  vertex(savedPointsX[440], savedPointsY[440]);
  vertex(savedPointsX[438], savedPointsY[438]);
  vertex(savedPointsX[392], savedPointsY[392]);
  vertex(savedPointsX[309], savedPointsY[309]);
  vertex(savedPointsX[459], savedPointsY[459]);
  vertex(savedPointsX[274], savedPointsY[274]);
  vertex(savedPointsX[354], savedPointsY[354]);
  vertex(savedPointsX[19], savedPointsY[19]);
  vertex(savedPointsX[241], savedPointsY[241]);
  vertex(savedPointsX[238], savedPointsY[238]);
  vertex(savedPointsX[44], savedPointsY[44]);
  vertex(savedPointsX[239], savedPointsY[239]);
  vertex(savedPointsX[218], savedPointsY[218]);
  vertex(savedPointsX[220], savedPointsY[220]);
  vertex(savedPointsX[51], savedPointsY[51]);
  vertex(savedPointsX[3], savedPointsY[3]);
  vertex(savedPointsX[196], savedPointsY[196]);
  vertex(savedPointsX[122], savedPointsY[122]);
  vertex(savedPointsX[193], savedPointsY[193]);
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[107], savedPointsY[107]);
  endShape();

  // draw left eye shape
  fill(164, 194, 215);
  beginShape();
  vertex(savedPointsX[398], savedPointsY[398]);
  vertex(savedPointsX[384], savedPointsY[384]);
  vertex(savedPointsX[385], savedPointsY[385]);
  vertex(savedPointsX[386], savedPointsY[386]);
  vertex(savedPointsX[387], savedPointsY[387]);
  vertex(savedPointsX[388], savedPointsY[388]);
  vertex(savedPointsX[466], savedPointsY[466]);
  vertex(savedPointsX[263], savedPointsY[263]);
  vertex(savedPointsX[249], savedPointsY[249]);
  vertex(savedPointsX[390], savedPointsY[390]);
  vertex(savedPointsX[373], savedPointsY[373]);
  vertex(savedPointsX[374], savedPointsY[374]);
  vertex(savedPointsX[380], savedPointsY[380]);
  vertex(savedPointsX[381], savedPointsY[381]);
  vertex(savedPointsX[382], savedPointsY[382]);
  vertex(savedPointsX[398], savedPointsY[398]);
  endShape();

  // draw right eye shape 
  beginShape();
  vertex(savedPointsX[173], savedPointsY[173]);
  vertex(savedPointsX[157], savedPointsY[157]);
  vertex(savedPointsX[158], savedPointsY[158]);
  vertex(savedPointsX[159], savedPointsY[159]);
  vertex(savedPointsX[160], savedPointsY[160]);
  vertex(savedPointsX[161], savedPointsY[161]);
  vertex(savedPointsX[246], savedPointsY[246]);
  vertex(savedPointsX[33], savedPointsY[33]);
  vertex(savedPointsX[7], savedPointsY[7]);
  vertex(savedPointsX[163], savedPointsY[163]);
  vertex(savedPointsX[144], savedPointsY[144]);
  vertex(savedPointsX[145], savedPointsY[145]);
  vertex(savedPointsX[153], savedPointsY[153]);
  vertex(savedPointsX[154], savedPointsY[154]);
  vertex(savedPointsX[155], savedPointsY[155]);
  vertex(savedPointsX[173], savedPointsY[173]);
  endShape();


  // draw right eye
  fill(25, 31, 49);
  beginShape();
  vertex(savedPointsX[384], savedPointsY[384]);
  vertex(savedPointsX[380], savedPointsY[380]);
  vertex(savedPointsX[374], savedPointsY[374]);
  vertex(savedPointsX[373] - 2, savedPointsY[373] - 3);
  vertex(savedPointsX[387], savedPointsY[387]);
  vertex(savedPointsX[386], savedPointsY[386]);
  vertex(savedPointsX[385], savedPointsY[385]);
  vertex(savedPointsX[384], savedPointsY[384]);
  endShape();

  // draw left eye 
  beginShape();
  vertex(savedPointsX[158], savedPointsY[158]);
  vertex(savedPointsX[159], savedPointsY[159]);
  vertex(savedPointsX[160], savedPointsY[160]);
  vertex(savedPointsX[144] + 2, savedPointsY[144] - 2);
  vertex(savedPointsX[145], savedPointsY[145]);
  vertex(savedPointsX[153], savedPointsY[153]);
  vertex(savedPointsX[157], savedPointsY[157]);
  vertex(savedPointsX[158], savedPointsY[158]);
  endShape();

  // draw right eyelid
  fill(197, 193, 198);
  beginShape();
  vertex(savedPointsX[398], savedPointsY[398]);
  vertex(savedPointsX[286], savedPointsY[286]);
  vertex(savedPointsX[258], savedPointsY[258]);
  vertex(savedPointsX[257], savedPointsY[257]);
  vertex(savedPointsX[259], savedPointsY[259]);
  vertex(savedPointsX[260], savedPointsY[260]);
  vertex(savedPointsX[359], savedPointsY[359]);
  vertex(savedPointsX[263], savedPointsY[263]);
  vertex(savedPointsX[466], savedPointsY[466]);
  vertex(savedPointsX[388], savedPointsY[388]);
  vertex(savedPointsX[387], savedPointsY[387]);
  vertex(savedPointsX[386], savedPointsY[386]);
  vertex(savedPointsX[385], savedPointsY[385]);
  vertex(savedPointsX[384], savedPointsY[384]);
  vertex(savedPointsX[398], savedPointsY[398]);
  endShape();

  // draw left eyelid 
  beginShape();
  vertex(savedPointsX[157], savedPointsY[157]);
  vertex(savedPointsX[28], savedPointsY[28]);
  vertex(savedPointsX[27], savedPointsY[27]);
  vertex(savedPointsX[29], savedPointsY[29]);
  vertex(savedPointsX[30], savedPointsY[30]);
  vertex(savedPointsX[247], savedPointsY[247]);
  vertex(savedPointsX[33], savedPointsY[33]);
  vertex(savedPointsX[246], savedPointsY[246]);
  vertex(savedPointsX[161], savedPointsY[161]);
  vertex(savedPointsX[160], savedPointsY[160]);
  vertex(savedPointsX[159], savedPointsY[159]);
  vertex(savedPointsX[158], savedPointsY[158]);
  vertex(savedPointsX[157], savedPointsY[157]);
  endShape();

  // draw right eyebrow 
  fill(25, 31, 49);
  beginShape();
  vertex(savedPointsX[336], savedPointsY[336]);
  vertex(savedPointsX[296], savedPointsY[296]);
  vertex(savedPointsX[334], savedPointsY[334]);
  vertex(savedPointsX[293], savedPointsY[293]);
  vertex(savedPointsX[300], savedPointsY[300]);
  vertex(savedPointsX[283], savedPointsY[283]);
  vertex(savedPointsX[282], savedPointsY[282]);
  vertex(savedPointsX[295], savedPointsY[295]);
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[336], savedPointsY[336]);
  endShape();

  beginShape();
  vertex(savedPointsX[107], savedPointsY[107]);
  vertex(savedPointsX[66], savedPointsY[66]);
  vertex(savedPointsX[105], savedPointsY[105]);
  vertex(savedPointsX[63], savedPointsY[63]);
  vertex(savedPointsX[70], savedPointsY[70]);
  vertex(savedPointsX[53], savedPointsY[53]);
  vertex(savedPointsX[52], savedPointsY[52]);
  vertex(savedPointsX[65], savedPointsY[65]);
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[107], savedPointsY[107]);
  endShape();

  //draw yellow face 
  fill(211, 200, 170);
  beginShape();
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[295], savedPointsY[295]);
  vertex(savedPointsX[282], savedPointsY[282]);
  vertex(savedPointsX[283], savedPointsY[283]);
  vertex(savedPointsX[300], savedPointsY[300]);
  vertex(savedPointsX[293], savedPointsY[293]);
  vertex(savedPointsX[334], savedPointsY[334]);
  vertex(savedPointsX[296], savedPointsY[296]);
  vertex(savedPointsX[336], savedPointsY[336]);
  vertex(savedPointsX[9], savedPointsY[9]);
  vertex(savedPointsX[107], savedPointsY[107]);
  vertex(savedPointsX[66], savedPointsY[66]);
  vertex(savedPointsX[105], savedPointsY[105]);
  vertex(savedPointsX[63], savedPointsY[63]);
  vertex(savedPointsX[70], savedPointsY[70]);
  vertex(savedPointsX[53], savedPointsY[53]);
  vertex(savedPointsX[52], savedPointsY[52]);
  vertex(savedPointsX[65], savedPointsY[65]);
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[222], savedPointsY[222]);
  vertex(savedPointsX[27], savedPointsY[27]);
  vertex(savedPointsX[29], savedPointsY[29]);
  vertex(savedPointsX[30], savedPointsY[30]);
  vertex(savedPointsX[247], savedPointsY[247]);
  vertex(savedPointsX[33], savedPointsY[33]);
  vertex(savedPointsX[228], savedPointsY[228]);
  vertex(savedPointsX[229], savedPointsY[229]);
  vertex(savedPointsX[230], savedPointsY[230]);
  vertex(savedPointsX[22], savedPointsY[22]);
  vertex(savedPointsX[232], savedPointsY[232]);
  vertex(savedPointsX[114], savedPointsY[114]);
  vertex(savedPointsX[217], savedPointsY[217]);
  vertex(savedPointsX[198], savedPointsY[198]);
  vertex(savedPointsX[209], savedPointsY[209]);
  vertex(savedPointsX[49], savedPointsY[49]);
  vertex(savedPointsX[129], savedPointsY[129]);
  vertex(savedPointsX[64], savedPointsY[64]);
  vertex(savedPointsX[235], savedPointsY[235]);
  vertex(savedPointsX[75], savedPointsY[75]);
  vertex(savedPointsX[60], savedPointsY[60]);
  vertex(savedPointsX[242], savedPointsY[242]);
  vertex(savedPointsX[94], savedPointsY[94]);
  vertex(savedPointsX[2], savedPointsY[2]);
  vertex(savedPointsX[164], savedPointsY[164]);
  vertex(savedPointsX[0], savedPointsY[0]);
  vertex(savedPointsX[11], savedPointsY[11]);
  vertex(savedPointsX[72], savedPointsY[72]);
  vertex(savedPointsX[73], savedPointsY[73]);
  vertex(savedPointsX[74], savedPointsY[74]);
  vertex(savedPointsX[184], savedPointsY[184]);
  vertex(savedPointsX[61], savedPointsY[61]);
  vertex(savedPointsX[146], savedPointsY[146]);
  vertex(savedPointsX[91], savedPointsY[91]);
  vertex(savedPointsX[181], savedPointsY[181]);
  vertex(savedPointsX[84], savedPointsY[84]);
  vertex(savedPointsX[17], savedPointsY[17]);
  vertex(savedPointsX[18], savedPointsY[18]);
  vertex(savedPointsX[200], savedPointsY[200]);
  vertex(savedPointsX[199], savedPointsY[199]);
  vertex(savedPointsX[175], savedPointsY[175]);
  vertex(savedPointsX[171], savedPointsY[171]);
  vertex(savedPointsX[32], savedPointsY[32]);
  vertex(savedPointsX[211], savedPointsY[211]);
  vertex(savedPointsX[210], savedPointsY[210]);
  vertex(savedPointsX[214], savedPointsY[214]);
  vertex(savedPointsX[50], savedPointsY[50]);
  vertex(savedPointsX[116], savedPointsY[116]);
  vertex(savedPointsX[139], savedPointsY[139]);
  vertex(savedPointsX[71], savedPointsY[71]);
  vertex(savedPointsX[68], savedPointsY[68]);
  vertex(savedPointsX[103], savedPointsY[103]);
  vertex(savedPointsX[67], savedPointsY[67]);
  vertex(savedPointsX[109], savedPointsY[109]);
  vertex(savedPointsX[10], savedPointsY[10]);
  vertex(savedPointsX[338], savedPointsY[338]);
  vertex(savedPointsX[297], savedPointsY[297]);
  vertex(savedPointsX[332], savedPointsY[332]);
  vertex(savedPointsX[298], savedPointsY[298]);
  vertex(savedPointsX[301], savedPointsY[301]);
  vertex(savedPointsX[368], savedPointsY[368]);
  vertex(savedPointsX[345], savedPointsY[345]);
  vertex(savedPointsX[359], savedPointsY[359]);
  vertex(savedPointsX[260], savedPointsY[260]);
  vertex(savedPointsX[259], savedPointsY[259]);
  vertex(savedPointsX[257], savedPointsY[257]);
  vertex(savedPointsX[442], savedPointsY[442]);
  vertex(savedPointsX[285], savedPointsY[285]);
  endShape();

  beginShape();
  vertex(savedPointsX[359], savedPointsY[359]);
  vertex(savedPointsX[345], savedPointsY[345]);
  vertex(savedPointsX[280], savedPointsY[280]);
  vertex(savedPointsX[434], savedPointsY[434]);
  vertex(savedPointsX[430], savedPointsY[430]);
  vertex(savedPointsX[431], savedPointsY[431]);
  vertex(savedPointsX[262], savedPointsY[262]);
  vertex(savedPointsX[396], savedPointsY[396]);
  vertex(savedPointsX[175], savedPointsY[175]);
  vertex(savedPointsX[199], savedPointsY[199]);
  vertex(savedPointsX[200], savedPointsY[200]);
  vertex(savedPointsX[18], savedPointsY[18]);
  vertex(savedPointsX[17], savedPointsY[17]);
  vertex(savedPointsX[314], savedPointsY[314]);
  vertex(savedPointsX[405], savedPointsY[405]);
  vertex(savedPointsX[321], savedPointsY[321]);
  vertex(savedPointsX[375], savedPointsY[375]);
  vertex(savedPointsX[291], savedPointsY[291]);
  vertex(savedPointsX[408], savedPointsY[408]);
  vertex(savedPointsX[304], savedPointsY[304]);
  vertex(savedPointsX[303], savedPointsY[303]);
  vertex(savedPointsX[302], savedPointsY[302]);
  vertex(savedPointsX[11], savedPointsY[11]);
  vertex(savedPointsX[0], savedPointsY[0]);
  vertex(savedPointsX[164], savedPointsY[164]);
  vertex(savedPointsX[2], savedPointsY[2]);
  vertex(savedPointsX[141], savedPointsY[141]);
  vertex(savedPointsX[462], savedPointsY[462]);
  vertex(savedPointsX[290], savedPointsY[290]);
  vertex(savedPointsX[305], savedPointsY[305]);
  vertex(savedPointsX[455], savedPointsY[455]);
  vertex(savedPointsX[294], savedPointsY[294]);
  vertex(savedPointsX[331], savedPointsY[331]);
  vertex(savedPointsX[279], savedPointsY[279]);
  vertex(savedPointsX[429], savedPointsY[429]);
  vertex(savedPointsX[420], savedPointsY[420]);
  vertex(savedPointsX[437], savedPointsY[437]);
  vertex(savedPointsX[343], savedPointsY[343]);
  vertex(savedPointsX[452], savedPointsY[452]);
  vertex(savedPointsX[252], savedPointsY[252]);
  vertex(savedPointsX[253], savedPointsY[253]);
  vertex(savedPointsX[449], savedPointsY[449]);
  vertex(savedPointsX[448], savedPointsY[448]);
  vertex(savedPointsX[261], savedPointsY[261]);
  vertex(savedPointsX[263], savedPointsY[263]);
  vertex(savedPointsX[359], savedPointsY[359]);
  endShape();

  // draw lighter yellow highlights 
  fill(231, 219, 186);
  beginShape();
  vertex(savedPointsX[5], savedPointsY[5]);
  vertex(savedPointsX[45], savedPointsY[45]);
  vertex(savedPointsX[1], savedPointsY[1]);
  vertex(savedPointsX[275], savedPointsY[275]);
  vertex(savedPointsX[5], savedPointsY[5]);
  endShape();

  beginShape();
  vertex(savedPointsX[371], savedPointsY[371]);
  vertex(savedPointsX[423], savedPointsY[423]);
  vertex(savedPointsX[426], savedPointsY[426]);
  vertex(savedPointsX[425], savedPointsY[425]);
  vertex(savedPointsX[347], savedPointsY[347]);
  vertex(savedPointsX[346], savedPointsY[346]);
  vertex(savedPointsX[340], savedPointsY[340]);
  vertex(savedPointsX[348], savedPointsY[348]);
  vertex(savedPointsX[329], savedPointsY[329]);
  vertex(savedPointsX[371], savedPointsY[371]);
  endShape();

  beginShape();
  vertex(savedPointsX[100], savedPointsY[100]);
  vertex(savedPointsX[142], savedPointsY[142]);
  vertex(savedPointsX[203], savedPointsY[203]);
  vertex(savedPointsX[206], savedPointsY[206]);
  vertex(savedPointsX[205], savedPointsY[205]);
  vertex(savedPointsX[118], savedPointsY[118]);
  vertex(savedPointsX[117], savedPointsY[117]);
  vertex(savedPointsX[111], savedPointsY[111]);
  vertex(savedPointsX[119], savedPointsY[119]);
  vertex(savedPointsX[100], savedPointsY[100]);
  endShape();

  beginShape();
  vertex(savedPointsX[167], savedPointsY[167]);
  vertex(savedPointsX[164], savedPointsY[164]);
  vertex(savedPointsX[393], savedPointsY[393]);
  vertex(savedPointsX[0], savedPointsY[0]);
  vertex(savedPointsX[167], savedPointsY[167]);
  endShape();

  beginShape();
  vertex(savedPointsX[201], savedPointsY[201]);
  vertex(savedPointsX[200], savedPointsY[200]);
  vertex(savedPointsX[421], savedPointsY[421]);
  vertex(savedPointsX[428], savedPointsY[428]);
  vertex(savedPointsX[199], savedPointsY[199]);
  vertex(savedPointsX[208], savedPointsY[208]);
  vertex(savedPointsX[201], savedPointsY[201]);
  endShape();

  beginShape();
  vertex(savedPointsX[109], savedPointsY[109]);
  vertex(savedPointsX[69], savedPointsY[69]);
  vertex(savedPointsX[9], savedPointsY[9]);
  vertex(savedPointsX[299], savedPointsY[299]);
  vertex(savedPointsX[338], savedPointsY[338]);
  vertex(savedPointsX[10], savedPointsY[10]);
  vertex(savedPointsX[109], savedPointsY[109]);
  endShape();

}

// function to draw the portrait from the 'Rose Period'
function drawExpressionistPortrait() {

  // draw overlay
  fill(146, 128, 58, 100);
  rect(0, 0, width, height);

  fill(244, 145, 78);
  strokeWeight(2);
  stroke(0);

  // call on a function to draw the whole outline of the face
  drawWholeFaceShape(244, 145, 78, 255);

  // darker orange 
  fill(221, 131, 71);
  noStroke();
  beginShape();
  vertex(savedPointsX[10], savedPointsY[10]);
  vertex(savedPointsX[151], savedPointsY[151]);
  vertex(savedPointsX[9], savedPointsY[9]);
  vertex(savedPointsX[193], savedPointsY[193]);
  vertex(savedPointsX[122], savedPointsY[122]);
  vertex(savedPointsX[196], savedPointsY[196]);
  vertex(savedPointsX[3], savedPointsY[3]);
  vertex(savedPointsX[51], savedPointsY[51]);
  vertex(savedPointsX[45], savedPointsY[45]);
  vertex(savedPointsX[239], savedPointsY[239]);
  vertex(savedPointsX[60], savedPointsY[60]);
  vertex(savedPointsX[99], savedPointsY[99]);
  vertex(savedPointsX[167], savedPointsY[167]);
  vertex(savedPointsX[39], savedPointsY[39]);
  vertex(savedPointsX[40], savedPointsY[40]);
  vertex(savedPointsX[185], savedPointsY[185]);
  vertex(savedPointsX[61], savedPointsY[61]);
  vertex(savedPointsX[146], savedPointsY[146]);
  vertex(savedPointsX[91], savedPointsY[91]);
  vertex(savedPointsX[181], savedPointsY[181]);
  vertex(savedPointsX[84], savedPointsY[84]);
  vertex(savedPointsX[17], savedPointsY[17]);
  vertex(savedPointsX[18], savedPointsY[18]);
  vertex(savedPointsX[200], savedPointsY[200]);
  vertex(savedPointsX[199], savedPointsY[199]);
  vertex(savedPointsX[175], savedPointsY[175]);
  vertex(savedPointsX[152], savedPointsY[152]);
  vertex(savedPointsX[148], savedPointsY[148]);
  vertex(savedPointsX[176], savedPointsY[176]);
  vertex(savedPointsX[149], savedPointsY[149]);
  vertex(savedPointsX[150], savedPointsY[150]);
  vertex(savedPointsX[136], savedPointsY[136]);
  vertex(savedPointsX[172], savedPointsY[172]);
  vertex(savedPointsX[58], savedPointsY[58]);
  vertex(savedPointsX[132], savedPointsY[132]);
  vertex(savedPointsX[93], savedPointsY[93]);
  vertex(savedPointsX[234], savedPointsY[234]);
  vertex(savedPointsX[127], savedPointsY[127]);
  vertex(savedPointsX[162], savedPointsY[162]);
  vertex(savedPointsX[21], savedPointsY[21]);
  vertex(savedPointsX[54], savedPointsY[54]);
  vertex(savedPointsX[103], savedPointsY[103]);
  vertex(savedPointsX[67], savedPointsY[67]);
  vertex(savedPointsX[109], savedPointsY[109]);
  vertex(savedPointsX[10], savedPointsY[10]);
  endShape();

  fill(0);
  beginShape();
  vertex(savedPointsX[57], savedPointsY[57]);
  vertex(savedPointsX[61], savedPointsY[61]);
  vertex(savedPointsX[76], savedPointsY[76]);
  vertex(savedPointsX[78], savedPointsY[78]);
  vertex(savedPointsX[191], savedPointsY[191]);
  vertex(savedPointsX[80], savedPointsY[80]);
  vertex(savedPointsX[82], savedPointsY[82]);
  vertex(savedPointsX[13], savedPointsY[13]);
  vertex(savedPointsX[312], savedPointsY[312]);
  vertex(savedPointsX[311], savedPointsY[311]);
  vertex(savedPointsX[310], savedPointsY[310]);
  vertex(savedPointsX[415], savedPointsY[415]);
  vertex(savedPointsX[308], savedPointsY[308]);
  vertex(savedPointsX[306], savedPointsY[306]);
  vertex(savedPointsX[291], savedPointsY[291]);
  vertex(savedPointsX[287], savedPointsY[287]);
  vertex(savedPointsX[408], savedPointsY[408]);
  vertex(savedPointsX[304], savedPointsY[304]);
  vertex(savedPointsX[303], savedPointsY[303]);
  vertex(savedPointsX[302], savedPointsY[302]);
  vertex(savedPointsX[11], savedPointsY[11]);
  vertex(savedPointsX[72], savedPointsY[72]);
  vertex(savedPointsX[73], savedPointsY[73]);
  vertex(savedPointsX[74], savedPointsY[74]);
  vertex(savedPointsX[185], savedPointsY[185]);
  vertex(savedPointsX[57], savedPointsY[57]);
  endShape();

  beginShape();
  vertex(savedPointsX[91], savedPointsY[91]);
  vertex(savedPointsX[83], savedPointsY[83]);
  vertex(savedPointsX[18], savedPointsY[18]);
  vertex(savedPointsX[313], savedPointsY[313]);
  vertex(savedPointsX[321], savedPointsY[321]);
  vertex(savedPointsX[405], savedPointsY[405]);
  vertex(savedPointsX[314], savedPointsY[314]);
  vertex(savedPointsX[17], savedPointsY[17]);
  vertex(savedPointsX[84], savedPointsY[84]);
  vertex(savedPointsX[181], savedPointsY[181]);
  vertex(savedPointsX[91], savedPointsY[91]);
  endShape();

  strokeWeight(2);
  stroke(0);

  // mouth line and eye brows 
  line(savedPointsX[0], savedPointsY[0], savedPointsX[164], savedPointsY[164]);

  line(savedPointsX[285], savedPointsY[285], savedPointsX[295], savedPointsY[295]);
  line(savedPointsX[295], savedPointsY[295], savedPointsX[282], savedPointsY[282]);
  line(savedPointsX[282], savedPointsY[282], savedPointsX[283], savedPointsY[283]);
  line(savedPointsX[283], savedPointsY[283], savedPointsX[276], savedPointsY[276]);
  line(savedPointsX[276], savedPointsY[276], savedPointsX[383], savedPointsY[383]);

  line(savedPointsX[55], savedPointsY[55], savedPointsX[65], savedPointsY[65]);
  line(savedPointsX[65], savedPointsY[65], savedPointsX[52], savedPointsY[52]);
  line(savedPointsX[52], savedPointsY[52], savedPointsX[53], savedPointsY[53]);
  line(savedPointsX[53], savedPointsY[53], savedPointsX[46], savedPointsY[46]);
  line(savedPointsX[46], savedPointsY[46], savedPointsX[156], savedPointsY[156]);

  beginShape();
  vertex(savedPointsX[362], savedPointsY[362]);
  vertex(savedPointsX[398], savedPointsY[398]);
  vertex(savedPointsX[384], savedPointsY[384]);
  vertex(savedPointsX[385], savedPointsY[385]);
  vertex(savedPointsX[386], savedPointsY[386]);
  vertex(savedPointsX[387], savedPointsY[387]);
  vertex(savedPointsX[388], savedPointsY[388]);
  vertex(savedPointsX[466], savedPointsY[466]);
  vertex(savedPointsX[263], savedPointsY[263]);
  vertex(savedPointsX[249], savedPointsY[249]);
  vertex(savedPointsX[390], savedPointsY[390]);
  vertex(savedPointsX[373], savedPointsY[373]);
  vertex(savedPointsX[374], savedPointsY[374]);
  vertex(savedPointsX[380], savedPointsY[380]);
  vertex(savedPointsX[381], savedPointsY[381]);
  vertex(savedPointsX[382], savedPointsY[382]);
  vertex(savedPointsX[362], savedPointsY[362]);
  endShape();

  // line around right eye
  line(savedPointsX[359], savedPointsY[359], savedPointsX[260], savedPointsY[260]);
  line(savedPointsX[260], savedPointsY[260], savedPointsX[259], savedPointsY[259]);
  line(savedPointsX[259], savedPointsY[259], savedPointsX[257], savedPointsY[257]);
  line(savedPointsX[257], savedPointsY[257], savedPointsX[258], savedPointsY[258]);
  line(savedPointsX[258], savedPointsY[258], savedPointsX[286], savedPointsY[286]);
  line(savedPointsX[286], savedPointsY[286], savedPointsX[414], savedPointsY[414]);
  line(savedPointsX[414], savedPointsY[414], savedPointsX[463], savedPointsY[463]);
  line(savedPointsX[463], savedPointsY[463], savedPointsX[341], savedPointsY[341]);
  line(savedPointsX[341], savedPointsY[341], savedPointsX[256], savedPointsY[256]);
  line(savedPointsX[256], savedPointsY[256], savedPointsX[252], savedPointsY[252]);
  line(savedPointsX[252], savedPointsY[252], savedPointsX[253], savedPointsY[253]);
  line(savedPointsX[253], savedPointsY[253], savedPointsX[254], savedPointsY[254]);
  line(savedPointsX[254], savedPointsY[254], savedPointsX[339], savedPointsY[339]);
  line(savedPointsX[339], savedPointsY[339], savedPointsX[255], savedPointsY[255]);

  // left eye
  line(savedPointsX[133], savedPointsY[133], savedPointsX[173], savedPointsY[173]);
  line(savedPointsX[173], savedPointsY[173], savedPointsX[157], savedPointsY[157]);
  line(savedPointsX[157], savedPointsY[157], savedPointsX[158], savedPointsY[158]);
  line(savedPointsX[158], savedPointsY[158], savedPointsX[159], savedPointsY[159]);
  line(savedPointsX[159], savedPointsY[159], savedPointsX[160], savedPointsY[160]);
  line(savedPointsX[160], savedPointsY[160], savedPointsX[161], savedPointsY[161]);
  line(savedPointsX[161], savedPointsY[161], savedPointsX[246], savedPointsY[246]);
  line(savedPointsX[246], savedPointsY[246], savedPointsX[33], savedPointsY[33]);
  line(savedPointsX[33], savedPointsY[33], savedPointsX[7], savedPointsY[7]);
  line(savedPointsX[7], savedPointsY[7], savedPointsX[163], savedPointsY[163]);
  line(savedPointsX[163], savedPointsY[163], savedPointsX[144], savedPointsY[144]);
  line(savedPointsX[144], savedPointsY[144], savedPointsX[145], savedPointsY[145]);
  line(savedPointsX[145], savedPointsY[145], savedPointsX[153], savedPointsY[153]);
  line(savedPointsX[153], savedPointsY[153], savedPointsX[154], savedPointsY[154]);
  line(savedPointsX[154], savedPointsY[154], savedPointsX[155], savedPointsY[155]);
  line(savedPointsX[155], savedPointsY[155], savedPointsX[133], savedPointsY[133]);

  // left eye outline
  line(savedPointsX[25], savedPointsY[25], savedPointsX[110], savedPointsY[110]);
  line(savedPointsX[110], savedPointsY[110], savedPointsX[24], savedPointsY[24]);
  line(savedPointsX[24], savedPointsY[24], savedPointsX[23], savedPointsY[23]);
  line(savedPointsX[23], savedPointsY[23], savedPointsX[22], savedPointsY[22]);
  line(savedPointsX[22], savedPointsY[22], savedPointsX[26], savedPointsY[26]);
  line(savedPointsX[26], savedPointsY[26], savedPointsX[112], savedPointsY[112]);
  line(savedPointsX[112], savedPointsY[112], savedPointsX[243], savedPointsY[243]);
  line(savedPointsX[243], savedPointsY[243], savedPointsX[190], savedPointsY[190]);
  line(savedPointsX[190], savedPointsY[190], savedPointsX[56], savedPointsY[56]);
  line(savedPointsX[56], savedPointsY[56], savedPointsX[28], savedPointsY[28]);
  line(savedPointsX[28], savedPointsY[28], savedPointsX[27], savedPointsY[27]);
  line(savedPointsX[27], savedPointsY[27], savedPointsX[29], savedPointsY[29]);
  line(savedPointsX[29], savedPointsY[29], savedPointsX[30], savedPointsY[30]);
  line(savedPointsX[30], savedPointsY[30], savedPointsX[247], savedPointsY[247]);
  line(savedPointsX[247], savedPointsY[247], savedPointsX[130], savedPointsY[130]);

  // nose 
  line(savedPointsX[122], savedPointsY[122], savedPointsX[196], savedPointsY[196]);
  line(savedPointsX[196], savedPointsY[196], savedPointsX[3], savedPointsY[3]);
  line(savedPointsX[3], savedPointsY[3], savedPointsX[51], savedPointsY[51]);
  line(savedPointsX[51], savedPointsY[51], savedPointsX[220], savedPointsY[220]);
  line(savedPointsX[220], savedPointsY[220], savedPointsX[218], savedPointsY[218]);
  line(savedPointsX[218], savedPointsY[218], savedPointsX[166], savedPointsY[166]);
  line(savedPointsX[166], savedPointsY[166], savedPointsX[240], savedPointsY[240]);
  line(savedPointsX[240], savedPointsY[240], savedPointsX[167], savedPointsY[167]);
  line(savedPointsX[167], savedPointsY[167], savedPointsX[164], savedPointsY[164]);
  line(savedPointsX[164], savedPointsY[164], savedPointsX[393], savedPointsY[393]);
  

  noStroke();

  beginShape();
  //left eye ball
  vertex(savedPointsX[158], savedPointsY[158]);
  vertex(savedPointsX[159], savedPointsY[159]);
  vertex(savedPointsX[160], savedPointsY[160]);
  vertex(savedPointsX[144] + 2, savedPointsY[144] - 2);
  vertex(savedPointsX[145], savedPointsY[145]);
  vertex(savedPointsX[153], savedPointsY[153]);
  vertex(savedPointsX[157], savedPointsY[157]);
  vertex(savedPointsX[158], savedPointsY[158]);
  endShape();

  fill(142, 86, 48);
  beginShape();
  vertex(savedPointsX[78], savedPointsY[78]);
  vertex(savedPointsX[191], savedPointsY[191]);
  vertex(savedPointsX[80], savedPointsY[80]);
  vertex(savedPointsX[81], savedPointsY[81]);
  vertex(savedPointsX[82], savedPointsY[82]);
  vertex(savedPointsX[13], savedPointsY[13]);
  vertex(savedPointsX[312], savedPointsY[312]);
  vertex(savedPointsX[311], savedPointsY[311]);
  vertex(savedPointsX[310], savedPointsY[310]);
  vertex(savedPointsX[415], savedPointsY[415]);
  vertex(savedPointsX[308], savedPointsY[308]);
  vertex(savedPointsX[324], savedPointsY[324]);
  vertex(savedPointsX[318], savedPointsY[318]);
  vertex(savedPointsX[402], savedPointsY[402]);
  vertex(savedPointsX[317], savedPointsY[317]);
  vertex(savedPointsX[14], savedPointsY[14]);
  vertex(savedPointsX[87], savedPointsY[87]);
  vertex(savedPointsX[178], savedPointsY[178]);
  vertex(savedPointsX[88], savedPointsY[88]);
  vertex(savedPointsX[95], savedPointsY[95]);
  vertex(savedPointsX[78], savedPointsY[78]);
  endShape();

}

// function to draw the portrait from the 'African Influence' period
function drawAfricanInfluencedPortrait() {

  // draw overlay
  fill(161, 96, 16, 100);
  rect(0, 0, width, height);

  stroke(0);
  // function to draw whole face outline
  drawWholeFaceShape(217, 154, 116, 255);

  fill(213, 168, 136);
  noStroke();
  beginShape();
  vertex(savedPointsX[10], savedPointsY[10]);
  vertex(savedPointsX[109], savedPointsY[109]);
  vertex(savedPointsX[67], savedPointsY[67]);
  vertex(savedPointsX[103], savedPointsY[103]);
  vertex(savedPointsX[54], savedPointsY[54]);
  vertex(savedPointsX[71], savedPointsY[71]);
  vertex(savedPointsX[139], savedPointsY[139]);
  vertex(savedPointsX[156], savedPointsY[156]);
  vertex(savedPointsX[46], savedPointsY[46]);
  vertex(savedPointsX[53], savedPointsY[53]);
  vertex(savedPointsX[52], savedPointsY[52]);
  vertex(savedPointsX[65], savedPointsY[65]);
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[9] - 9, savedPointsY[9]);
  vertex(savedPointsX[9] + 9, savedPointsY[9]);
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[295], savedPointsY[295]);
  vertex(savedPointsX[282], savedPointsY[282]);
  vertex(savedPointsX[283], savedPointsY[283]);
  vertex(savedPointsX[276], savedPointsY[276]);
  vertex(savedPointsX[383], savedPointsY[383]);
  vertex(savedPointsX[368], savedPointsY[368]);
  vertex(savedPointsX[301], savedPointsY[301]);
  vertex(savedPointsX[284], savedPointsY[284]);
  vertex(savedPointsX[332], savedPointsY[332]);
  vertex(savedPointsX[297], savedPointsY[297]);
  vertex(savedPointsX[338], savedPointsY[338]);
  vertex(savedPointsX[10], savedPointsY[10]);
  endShape();

  // sides of nose 
  fill(211, 129, 88);
  noStroke();
  beginShape();
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[189], savedPointsY[189]);
  vertex(savedPointsX[217], savedPointsY[217]);
  vertex(savedPointsX[198], savedPointsY[198]);
  vertex(savedPointsX[209], savedPointsY[209]);
  vertex(savedPointsX[102], savedPointsY[102]);
  vertex(savedPointsX[64], savedPointsY[64]);
  vertex(savedPointsX[235], savedPointsY[235]);
  vertex(savedPointsX[60], savedPointsY[60]);
  vertex(savedPointsX[94], savedPointsY[94]);
  vertex(savedPointsX[305], savedPointsY[305]);
  vertex(savedPointsX[455], savedPointsY[455]);
  vertex(savedPointsX[294], savedPointsY[294]);
  vertex(savedPointsX[331], savedPointsY[331]);
  vertex(savedPointsX[279], savedPointsY[279]);
  vertex(savedPointsX[429], savedPointsY[429]);
  vertex(savedPointsX[420], savedPointsY[420]);
  vertex(savedPointsX[437], savedPointsY[437]);
  vertex(savedPointsX[464], savedPointsY[464]);
  vertex(savedPointsX[413], savedPointsY[413]);
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[9] + 9, savedPointsY[9]);
  vertex(savedPointsX[9] - 9, savedPointsY[9]);
  vertex(savedPointsX[55], savedPointsY[55]);
  endShape();

  // nose highlight
  fill(241, 182, 113);
  noStroke();
  beginShape();
  vertex(savedPointsX[9] - 9, savedPointsY[9]);
  vertex(savedPointsX[193], savedPointsY[193]);
  vertex(savedPointsX[122], savedPointsY[122]);
  vertex(savedPointsX[196], savedPointsY[196]);
  vertex(savedPointsX[3], savedPointsY[3]);
  vertex(savedPointsX[51], savedPointsY[51]);
  vertex(savedPointsX[45], savedPointsY[45]);
  vertex(savedPointsX[44], savedPointsY[44]);
  vertex(savedPointsX[19], savedPointsY[1]);
  vertex(savedPointsX[274], savedPointsY[274]);
  vertex(savedPointsX[275], savedPointsY[275]);
  vertex(savedPointsX[281], savedPointsY[281]);
  vertex(savedPointsX[248], savedPointsY[248]);
  vertex(savedPointsX[419], savedPointsY[419]);
  vertex(savedPointsX[351], savedPointsY[351]);
  vertex(savedPointsX[417], savedPointsY[417]);
  vertex(savedPointsX[9] + 9, savedPointsY[9]);
  vertex(savedPointsX[9], savedPointsY[9]);
  vertex(savedPointsX[9] - 9, savedPointsY[9]);
  endShape();

  strokeWeight(1);

  // cheek bones 
  fill(204, 113, 75);
  beginShape();
  noStroke(); 
  vertex(savedPointsX[362], savedPointsY[362]);
  vertex(savedPointsX[463], savedPointsY[463]);
  vertex(savedPointsX[464], savedPointsY[464]);
  vertex(savedPointsX[343], savedPointsY[343]);
  vertex(savedPointsX[437], savedPointsY[437]);
  vertex(savedPointsX[420], savedPointsY[420]);
  vertex(savedPointsX[279], savedPointsY[279]);
  vertex(savedPointsX[423], savedPointsY[423]);
  vertex(savedPointsX[427], savedPointsY[427]);
  vertex(savedPointsX[280], savedPointsY[280]);
  vertex(savedPointsX[346], savedPointsY[346]);
  vertex(savedPointsX[340], savedPointsY[340]);
  vertex(savedPointsX[372], savedPointsY[372]);
  vertex(savedPointsX[368], savedPointsY[368]);
  vertex(savedPointsX[383], savedPointsY[383]);
  vertex(savedPointsX[446], savedPointsY[446]);
  vertex(savedPointsX[339], savedPointsY[339]);
  vertex(savedPointsX[254], savedPointsY[254]);
  vertex(savedPointsX[253], savedPointsY[253]);
  vertex(savedPointsX[252], savedPointsY[252]);
  vertex(savedPointsX[256], savedPointsY[256]);
  vertex(savedPointsX[362], savedPointsY[362]);
  endShape();

  //left cheekbones 
  beginShape();
  noStroke();
  vertex(savedPointsX[155], savedPointsY[155]);
  vertex(savedPointsX[243], savedPointsY[243]);
  vertex(savedPointsX[244], savedPointsY[244]);
  vertex(savedPointsX[114], savedPointsY[114]);
  vertex(savedPointsX[217], savedPointsY[217]);
  vertex(savedPointsX[198], savedPointsY[198]);
  vertex(savedPointsX[49], savedPointsY[49]);
  vertex(savedPointsX[203], savedPointsY[203]);
  vertex(savedPointsX[207], savedPointsY[207]);
  vertex(savedPointsX[50], savedPointsY[50]);
  vertex(savedPointsX[117], savedPointsY[117]);
  vertex(savedPointsX[111], savedPointsY[111]);
  vertex(savedPointsX[143], savedPointsY[143]);
  vertex(savedPointsX[139], savedPointsY[139]);
  vertex(savedPointsX[156], savedPointsY[156]);
  vertex(savedPointsX[226], savedPointsY[226]);
  vertex(savedPointsX[110], savedPointsY[110]);
  vertex(savedPointsX[24], savedPointsY[24]);
  vertex(savedPointsX[23], savedPointsY[23]);
  vertex(savedPointsX[22], savedPointsY[22]);
  vertex(savedPointsX[26], savedPointsY[26]);
  vertex(savedPointsX[133], savedPointsY[133]);
  endShape();

  //mouth 
  beginShape();
  fill(179, 123, 84);
  stroke(0);
  strokeWeight(2); 
  vertex(savedPointsX[61], savedPointsY[61]);
  vertex(savedPointsX[185], savedPointsY[185]);
  vertex(savedPointsX[40], savedPointsY[40]);
  vertex(savedPointsX[39], savedPointsY[39]);
  vertex(savedPointsX[37], savedPointsY[37]);
  vertex(savedPointsX[11], savedPointsY[11]);
  vertex(savedPointsX[267], savedPointsY[267]);
  vertex(savedPointsX[269], savedPointsY[269]);
  vertex(savedPointsX[270], savedPointsY[270]);
  vertex(savedPointsX[409], savedPointsY[409]);
  vertex(savedPointsX[291], savedPointsY[291]);
  vertex(savedPointsX[375], savedPointsY[375]);
  vertex(savedPointsX[321], savedPointsY[321]);
  vertex(savedPointsX[405], savedPointsY[405]);
  vertex(savedPointsX[314], savedPointsY[314]);
  vertex(savedPointsX[17], savedPointsY[17]);
  vertex(savedPointsX[84], savedPointsY[84]);
  vertex(savedPointsX[181], savedPointsY[181]);
  vertex(savedPointsX[91], savedPointsY[91]);
  vertex(savedPointsX[146], savedPointsY[146]);
  vertex(savedPointsX[61], savedPointsY[61]);
  endShape();

  fill(113, 78, 53);
  beginShape();
  vertex(savedPointsX[78], savedPointsY[78]);
  vertex(savedPointsX[183], savedPointsY[183]);
  vertex(savedPointsX[191], savedPointsY[191]);
  vertex(savedPointsX[80], savedPointsY[80]);
  vertex(savedPointsX[81], savedPointsY[81]);
  vertex(savedPointsX[82], savedPointsY[82]);
  vertex(savedPointsX[13], savedPointsY[13]);
  vertex(savedPointsX[312], savedPointsY[312]);
  vertex(savedPointsX[311], savedPointsY[311]);
  vertex(savedPointsX[310], savedPointsY[310]);
  vertex(savedPointsX[415], savedPointsY[415]);
  vertex(savedPointsX[308], savedPointsY[308]);
  vertex(savedPointsX[324], savedPointsY[324]);
  vertex(savedPointsX[402], savedPointsY[402]);
  vertex(savedPointsX[317], savedPointsY[317]);
  vertex(savedPointsX[14], savedPointsY[14]);
  vertex(savedPointsX[87], savedPointsY[87]);
  vertex(savedPointsX[178], savedPointsY[178]);
  vertex(savedPointsX[95], savedPointsY[95]);
  vertex(savedPointsX[78], savedPointsY[78]);
  endShape();

  line(savedPointsX[57], savedPointsY[57], savedPointsX[61], savedPointsY[61]);
  line(savedPointsX[287], savedPointsY[287], savedPointsX[306], savedPointsY[306]);
  line(savedPointsX[37], savedPointsY[37], savedPointsX[167], savedPointsY[167]);
  line(savedPointsX[0], savedPointsY[0], savedPointsX[164], savedPointsY[164]);
  line(savedPointsX[267], savedPointsY[267], savedPointsX[393], savedPointsY[393]);
  line(savedPointsX[212], savedPointsY[212], savedPointsX[207], savedPointsY[207]);
  line(savedPointsX[207], savedPointsY[207], savedPointsX[50], savedPointsY[50]);
  line(savedPointsX[50], savedPointsY[50], savedPointsX[117], savedPointsY[117]);

  line(savedPointsX[432], savedPointsY[432], savedPointsX[427], savedPointsY[427]);
  line(savedPointsX[427], savedPointsY[427], savedPointsX[280], savedPointsY[280]);
  line(savedPointsX[280], savedPointsY[280], savedPointsX[346], savedPointsY[346]);

  // nose line 
  line(savedPointsX[9] - 9, savedPointsY[9], savedPointsX[193], savedPointsY[193]);
  line(savedPointsX[193], savedPointsY[193], savedPointsX[122], savedPointsY[122]);
  line(savedPointsX[122], savedPointsY[122], savedPointsX[196], savedPointsY[196]);
  line(savedPointsX[196], savedPointsY[196], savedPointsX[3], savedPointsY[3]);
  line(savedPointsX[3], savedPointsY[3], savedPointsX[51], savedPointsY[51]);
  line(savedPointsX[51], savedPointsY[51], savedPointsX[45], savedPointsY[45]);
  line(savedPointsX[45], savedPointsY[45], savedPointsX[44], savedPointsY[44]);
  line(savedPointsX[44], savedPointsY[44], savedPointsX[1], savedPointsY[1]);
  line(savedPointsX[1], savedPointsY[1], savedPointsX[274], savedPointsY[274]);
  line(savedPointsX[274], savedPointsY[274], savedPointsX[275], savedPointsY[275]);

  line(savedPointsX[131], savedPointsY[131], savedPointsX[49], savedPointsY[49]);
  line(savedPointsX[49], savedPointsY[49], savedPointsX[102], savedPointsY[102]);
  line(savedPointsX[102], savedPointsY[102], savedPointsX[64], savedPointsY[64]);
  line(savedPointsX[64], savedPointsY[64], savedPointsX[235], savedPointsY[235]);
  line(savedPointsX[235], savedPointsY[235], savedPointsX[75], savedPointsY[75]);
  line(savedPointsX[75], savedPointsY[75], savedPointsX[60], savedPointsY[60]);
  line(savedPointsX[60], savedPointsY[60], savedPointsX[242], savedPointsY[242]);
  line(savedPointsX[242], savedPointsY[242], savedPointsX[94], savedPointsY[94]);
  line(savedPointsX[94], savedPointsY[94], savedPointsX[462], savedPointsY[462]);
  line(savedPointsX[462], savedPointsY[462], savedPointsX[290], savedPointsY[290]);
  line(savedPointsX[290], savedPointsY[290], savedPointsX[305], savedPointsY[305]);
  line(savedPointsX[305], savedPointsY[305], savedPointsX[294], savedPointsY[294]);
  line(savedPointsX[294], savedPointsY[294], savedPointsX[331], savedPointsY[331]);
  line(savedPointsX[331], savedPointsY[331], savedPointsX[279], savedPointsY[279]);
  line(savedPointsX[279], savedPointsY[279], savedPointsX[360], savedPointsY[360]);

  // eyebrows 
  strokeWeight(4);
  line(savedPointsX[336], savedPointsY[336], savedPointsX[296], savedPointsY[296]);
  line(savedPointsX[296], savedPointsY[296], savedPointsX[334], savedPointsY[334]);
  line(savedPointsX[334], savedPointsY[334], savedPointsX[293], savedPointsY[293]);
  line(savedPointsX[293], savedPointsY[293], savedPointsX[300], savedPointsY[300]);

  line(savedPointsX[107], savedPointsY[107], savedPointsX[66], savedPointsY[66]);
  line(savedPointsX[66], savedPointsY[66], savedPointsX[105], savedPointsY[105]);
  line(savedPointsX[105], savedPointsY[105], savedPointsX[63], savedPointsY[63]);
  line(savedPointsX[63], savedPointsY[63], savedPointsX[70], savedPointsY[70]);
  noStroke(); 


  // right eye 
  fill(243, 223, 197);
  stroke(0);
  strokeWeight(2);
  beginShape();
  vertex(savedPointsX[398], savedPointsY[398]);
  vertex(savedPointsX[286], savedPointsY[286]);
  vertex(savedPointsX[442], savedPointsY[442]);
  vertex(savedPointsX[443], savedPointsY[443]);
  vertex(savedPointsX[444], savedPointsY[444]);
  vertex(savedPointsX[445], savedPointsY[445]);
  vertex(savedPointsX[353], savedPointsY[353]);
  vertex(savedPointsX[446], savedPointsY[446]);
  vertex(savedPointsX[339], savedPointsY[339]);
  vertex(savedPointsX[254], savedPointsY[254]);
  vertex(savedPointsX[253], savedPointsY[253]);
  vertex(savedPointsX[252], savedPointsY[252]);
  vertex(savedPointsX[256], savedPointsY[256]);
  vertex(savedPointsX[382], savedPointsY[382]);
  vertex(savedPointsX[398], savedPointsY[398]);
  endShape();

  // left eye 
  beginShape();
  vertex(savedPointsX[173], savedPointsY[173]);
  vertex(savedPointsX[56], savedPointsY[56]);
  vertex(savedPointsX[222], savedPointsY[222]);
  vertex(savedPointsX[223], savedPointsY[223]);
  vertex(savedPointsX[224], savedPointsY[224]);
  vertex(savedPointsX[225], savedPointsY[225]);
  vertex(savedPointsX[124], savedPointsY[124]);
  vertex(savedPointsX[226], savedPointsY[226]);
  vertex(savedPointsX[110], savedPointsY[110]);
  vertex(savedPointsX[24], savedPointsY[24]);
  vertex(savedPointsX[23], savedPointsY[23]);
  vertex(savedPointsX[22], savedPointsY[22]);
  vertex(savedPointsX[26], savedPointsY[26]);
  vertex(savedPointsX[155], savedPointsY[155]);
  vertex(savedPointsX[173], savedPointsY[173]);
  endShape();

  noStroke();

  fill(0);
  ellipse(savedPointsX[159], savedPointsY[159], 20, 20);
  ellipse(savedPointsX[386], savedPointsY[386], 20, 20);
  
}


// function to draw abstract portrait
function drawCubismPortrait() {

  // add overlay
  fill(224, 219, 188, 100);
  rect(0, 0, width, height);
  noStroke();

  // function to draw whole face 
  drawWholeFaceShape(255, 255, 255, 255);

  //draw blue shadow
  fill(92, 183, 185);
  beginShape();
  vertex(savedPointsX[152], savedPointsY[152]);
  vertex(savedPointsX[175], savedPointsY[175]);
  vertex(savedPointsX[199], savedPointsY[199]);
  vertex(savedPointsX[200], savedPointsY[200]);
  vertex(savedPointsX[421], savedPointsY[421]);
  vertex(savedPointsX[418], savedPointsY[418]);
  vertex(savedPointsX[424], savedPointsY[424]);
  vertex(savedPointsX[422], savedPointsY[422]);
  vertex(savedPointsX[432], savedPointsY[432]);
  vertex(savedPointsX[427], savedPointsY[427]);
  vertex(savedPointsX[280], savedPointsY[280]);
  vertex(savedPointsX[346], savedPointsY[346]);
  vertex(savedPointsX[340], savedPointsY[340]);
  vertex(savedPointsX[372], savedPointsY[372]);
  vertex(savedPointsX[447], savedPointsY[447]);
  vertex(savedPointsX[323], savedPointsY[323]);
  vertex(savedPointsX[361], savedPointsY[361]);
  vertex(savedPointsX[288], savedPointsY[288]);
  vertex(savedPointsX[397], savedPointsY[397]);
  vertex(savedPointsX[365], savedPointsY[365]);
  vertex(savedPointsX[379], savedPointsY[379]);
  vertex(savedPointsX[378], savedPointsY[378]);
  vertex(savedPointsX[400], savedPointsY[400]);
  vertex(savedPointsX[377], savedPointsY[377]);
  vertex(savedPointsX[152], savedPointsY[152]);
  endShape();

  // blue shadow left
  beginShape();
  vertex(savedPointsX[176], savedPointsY[176]);
  vertex(savedPointsX[140], savedPointsY[140]);
  vertex(savedPointsX[211], savedPointsY[211]);
  vertex(savedPointsX[210], savedPointsY[210]);
  vertex(savedPointsX[214], savedPointsY[214]);
  vertex(savedPointsX[187], savedPointsY[187]);
  vertex(savedPointsX[50], savedPointsY[50]);
  vertex(savedPointsX[111], savedPointsY[111]);
  vertex(savedPointsX[35], savedPointsY[35]);
  vertex(savedPointsX[124], savedPointsY[124]);
  vertex(savedPointsX[156], savedPointsY[156]);
  vertex(savedPointsX[139], savedPointsY[139]);
  vertex(savedPointsX[162], savedPointsY[162]);
  vertex(savedPointsX[127], savedPointsY[127]);
  vertex(savedPointsX[234], savedPointsY[234]);
  vertex(savedPointsX[93], savedPointsY[93]);
  vertex(savedPointsX[132], savedPointsY[132]);
  vertex(savedPointsX[58], savedPointsY[58]);
  vertex(savedPointsX[172], savedPointsY[172]);
  vertex(savedPointsX[136], savedPointsY[136]);
  vertex(savedPointsX[150], savedPointsY[150]);
  vertex(savedPointsX[149], savedPointsY[149]);
  vertex(savedPointsX[176], savedPointsY[176]);
  endShape();

  // draw silver shapes
  fill(208, 213, 210);
  beginShape();
  vertex(savedPointsX[176], savedPointsY[176]);
  vertex(savedPointsX[140], savedPointsY[140]);
  vertex(savedPointsX[32], savedPointsY[32]);
  vertex(savedPointsX[194], savedPointsY[194]);
  vertex(savedPointsX[182], savedPointsY[182]);
  vertex(savedPointsX[181], savedPointsY[181]);
  vertex(savedPointsX[84], savedPointsY[84]);
  vertex(savedPointsX[314], savedPointsY[314]);
  vertex(savedPointsX[313], savedPointsY[313]);
  vertex(savedPointsX[421], savedPointsY[421]);
  vertex(savedPointsX[200], savedPointsY[200]);
  vertex(savedPointsX[199], savedPointsY[199]);
  vertex(savedPointsX[175], savedPointsY[175]);
  vertex(savedPointsX[152], savedPointsY[152]);
  vertex(savedPointsX[148], savedPointsY[148]);
  vertex(savedPointsX[176], savedPointsY[176]);
  endShape();

  //draw grey shapes on cheek
  fill(160, 165, 156);
  beginShape();
  vertex(savedPointsX[432], savedPointsY[432]);
  vertex(savedPointsX[427], savedPointsY[427]);
  vertex(savedPointsX[280], savedPointsY[280]);
  vertex(savedPointsX[346], savedPointsY[346]);
  vertex(savedPointsX[340], savedPointsY[340]);
  vertex(savedPointsX[372], savedPointsY[372]);
  vertex(savedPointsX[347], savedPointsY[347]);
  vertex(savedPointsX[348], savedPointsY[348]);
  vertex(savedPointsX[349], savedPointsY[349]);
  vertex(savedPointsX[350], savedPointsY[350]);
  vertex(savedPointsX[371], savedPointsY[371]);
  vertex(savedPointsX[422], savedPointsY[422]);
  vertex(savedPointsX[432], savedPointsY[432]);
  endShape();

  // draw light green circle on left cheek
  fill(189, 209, 195);
  beginShape();
  vertex(savedPointsX[101], savedPointsY[101]);
  vertex(savedPointsX[50], savedPointsY[50]);
  vertex(savedPointsX[187], savedPointsY[187]);
  vertex(savedPointsX[214], savedPointsY[214]);
  vertex(savedPointsX[212], savedPointsY[212]);
  vertex(savedPointsX[186], savedPointsY[186]);
  vertex(savedPointsX[92], savedPointsY[92]);
  vertex(savedPointsX[203], savedPointsY[203]);
  vertex(savedPointsX[36], savedPointsY[36]);
  vertex(savedPointsX[50], savedPointsY[50]);
  endShape();

  // dark green shapes
  fill(34, 64, 30);
  beginShape();
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[295], savedPointsY[295]);
  vertex(savedPointsX[282], savedPointsY[282]);
  vertex(savedPointsX[283], savedPointsY[283]);
  vertex(savedPointsX[300], savedPointsY[300]);
  vertex(savedPointsX[293], savedPointsY[293]);
  vertex(savedPointsX[334], savedPointsY[334]);
  vertex(savedPointsX[296], savedPointsY[296]);
  vertex(savedPointsX[336], savedPointsY[336]);
  vertex(savedPointsX[285], savedPointsY[285]);
  endShape();

  beginShape();
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[107], savedPointsY[107]);
  vertex(savedPointsX[66], savedPointsY[66]);
  vertex(savedPointsX[105], savedPointsY[105]);
  vertex(savedPointsX[63], savedPointsY[63]);
  vertex(savedPointsX[70], savedPointsY[70]);
  vertex(savedPointsX[53], savedPointsY[53]);
  vertex(savedPointsX[52], savedPointsY[52]);
  vertex(savedPointsX[65], savedPointsY[65]);
  vertex(savedPointsX[55], savedPointsY[55]);
  endShape();

  beginShape();
  vertex(savedPointsX[61], savedPointsY[61]);
  vertex(savedPointsX[78], savedPointsY[78]);
  vertex(savedPointsX[95], savedPointsY[95]);
  vertex(savedPointsX[88], savedPointsY[88]);
  vertex(savedPointsX[178], savedPointsY[178]);
  vertex(savedPointsX[87], savedPointsY[87]);
  vertex(savedPointsX[14], savedPointsY[14]);
  vertex(savedPointsX[317], savedPointsY[317]);
  vertex(savedPointsX[402], savedPointsY[402]);
  vertex(savedPointsX[318], savedPointsY[318]);
  vertex(savedPointsX[324], savedPointsY[324]);
  vertex(savedPointsX[308], savedPointsY[308]);
  vertex(savedPointsX[291], savedPointsY[291]);
  vertex(savedPointsX[375], savedPointsY[375]);
  vertex(savedPointsX[321], savedPointsY[321]);
  vertex(savedPointsX[405], savedPointsY[405]);
  vertex(savedPointsX[314], savedPointsY[314]);
  vertex(savedPointsX[17], savedPointsY[17]);
  vertex(savedPointsX[84], savedPointsY[84]);
  vertex(savedPointsX[181], savedPointsY[181]);
  vertex(savedPointsX[91], savedPointsY[91]);
  vertex(savedPointsX[146], savedPointsY[146]);
  vertex(savedPointsX[61], savedPointsY[61]);
  endShape();

  // pink shapes
  fill(193, 161, 149);
  beginShape();
  vertex(savedPointsX[61], savedPointsY[61]);
  vertex(savedPointsX[185], savedPointsY[185]);
  vertex(savedPointsX[40], savedPointsY[40]);
  vertex(savedPointsX[39], savedPointsY[39]);
  vertex(savedPointsX[37], savedPointsY[37]);
  vertex(savedPointsX[0], savedPointsY[0]);
  vertex(savedPointsX[267], savedPointsY[267]);
  vertex(savedPointsX[269], savedPointsY[269]);
  vertex(savedPointsX[270], savedPointsY[270]);
  vertex(savedPointsX[409], savedPointsY[409]);
  vertex(savedPointsX[306], savedPointsY[306]);
  vertex(savedPointsX[308], savedPointsY[308]);
  vertex(savedPointsX[415], savedPointsY[415]);
  vertex(savedPointsX[310], savedPointsY[310]);
  vertex(savedPointsX[311], savedPointsY[311]);
  vertex(savedPointsX[312], savedPointsY[312]);
  vertex(savedPointsX[13], savedPointsY[13]);
  vertex(savedPointsX[82], savedPointsY[82]);
  vertex(savedPointsX[81], savedPointsY[81]);
  vertex(savedPointsX[80], savedPointsY[80]);
  vertex(savedPointsX[191], savedPointsY[191]);
  vertex(savedPointsX[78], savedPointsY[78]);
  vertex(savedPointsX[61], savedPointsY[61]);
  endShape();

  // dark green face lines
  fill(34, 64, 30);
  stroke(34, 64, 30);
  line(savedPointsX[185], savedPointsY[185],savedPointsX[186], savedPointsY[186]);
  line(savedPointsX[40], savedPointsY[40],savedPointsX[92], savedPointsY[92]);
  line(savedPointsX[39], savedPointsY[39],savedPointsX[165], savedPointsY[165]);
  line(savedPointsX[40], savedPointsY[40],savedPointsX[92], savedPointsY[92]);
  line(savedPointsX[37], savedPointsY[37],savedPointsX[167], savedPointsY[167]);
  line(savedPointsX[0], savedPointsY[0],savedPointsX[164], savedPointsY[164]);
  line(savedPointsX[267], savedPointsY[267],savedPointsX[393], savedPointsY[393]);
  line(savedPointsX[269], savedPointsY[269],savedPointsX[391], savedPointsY[391]);
  line(savedPointsX[270], savedPointsY[270],savedPointsX[322], savedPointsY[322]);
  line(savedPointsX[409], savedPointsY[409],savedPointsX[410], savedPointsY[410]);
  line(savedPointsX[269], savedPointsY[269],savedPointsX[391], savedPointsY[391]);
  line(savedPointsX[202], savedPointsY[202],savedPointsX[210], savedPointsY[210]);
  line(savedPointsX[210], savedPointsY[210],savedPointsX[169], savedPointsY[169]);
  line(savedPointsX[204], savedPointsY[204],savedPointsX[211], savedPointsY[211]);
  line(savedPointsX[211], savedPointsY[211],savedPointsX[170], savedPointsY[170]);
  line(savedPointsX[194], savedPointsY[194],savedPointsX[32], savedPointsY[32]);
  line(savedPointsX[32], savedPointsY[32],savedPointsX[140], savedPointsY[140]);
  line(savedPointsX[201], savedPointsY[201],savedPointsX[208], savedPointsY[208]);
  line(savedPointsX[208], savedPointsY[208],savedPointsX[171], savedPointsY[171]);
  line(savedPointsX[200], savedPointsY[200],savedPointsX[199], savedPointsY[199]);
  line(savedPointsX[199], savedPointsY[199],savedPointsX[175], savedPointsY[175]);
  line(savedPointsX[421], savedPointsY[421],savedPointsX[428], savedPointsY[428]);
  line(savedPointsX[428], savedPointsY[428],savedPointsX[396], savedPointsY[396]);
  line(savedPointsX[418], savedPointsY[418],savedPointsX[262], savedPointsY[262]);
  line(savedPointsX[262], savedPointsY[262],savedPointsX[369], savedPointsY[369]);
  line(savedPointsX[424], savedPointsY[424],savedPointsX[431], savedPointsY[431]);
  line(savedPointsX[431], savedPointsY[431],savedPointsX[395], savedPointsY[395]);
  line(savedPointsX[422], savedPointsY[422],savedPointsX[430], savedPointsY[430]);
  line(savedPointsX[430], savedPointsY[430],savedPointsX[394], savedPointsY[394]);
  noStroke();

  // red shape
  fill(169, 31, 12)
  beginShape();
  vertex(savedPointsX[107], savedPointsY[107]);
  vertex(savedPointsX[55], savedPointsY[55]);
  vertex(savedPointsX[193], savedPointsY[193]);
  vertex(savedPointsX[122], savedPointsY[122]);
  vertex(savedPointsX[196], savedPointsY[196]);
  vertex(savedPointsX[3], savedPointsY[3]);
  vertex(savedPointsX[51], savedPointsY[51]);
  vertex(savedPointsX[45], savedPointsY[45]);
  vertex(savedPointsX[44], savedPointsY[44]);
  vertex(savedPointsX[238], savedPointsY[238]);
  vertex(savedPointsX[20], savedPointsY[20]);
  vertex(savedPointsX[242], savedPointsY[242]);
  vertex(savedPointsX[94], savedPointsY[94]);
  vertex(savedPointsX[462], savedPointsY[462]);
  vertex(savedPointsX[461], savedPointsY[461]);
  vertex(savedPointsX[274], savedPointsY[274]);
  vertex(savedPointsX[275], savedPointsY[275]);
  vertex(savedPointsX[281], savedPointsY[281]);
  vertex(savedPointsX[248], savedPointsY[248]);
  vertex(savedPointsX[419], savedPointsY[419]);
  vertex(savedPointsX[351], savedPointsY[351]);
  vertex(savedPointsX[417], savedPointsY[417]);
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[336], savedPointsY[336]);
  vertex(savedPointsX[337], savedPointsY[337]);
  vertex(savedPointsX[107], savedPointsY[107]);
  endShape();

  // pink eye shape
  fill(198, 160, 147);
  beginShape();
  vertex(savedPointsX[461], savedPointsY[461]);
  vertex(savedPointsX[305], savedPointsY[305]);
  vertex(savedPointsX[294], savedPointsY[294]);
  vertex(savedPointsX[358], savedPointsY[358]);
  vertex(savedPointsX[420], savedPointsY[420]);
  vertex(savedPointsX[412], savedPointsY[412]);
  vertex(savedPointsX[414], savedPointsY[414]);
  vertex(savedPointsX[286], savedPointsY[286]);
  vertex(savedPointsX[258], savedPointsY[258]);
  vertex(savedPointsX[257], savedPointsY[257]);
  vertex(savedPointsX[259], savedPointsY[259]);
  vertex(savedPointsX[445], savedPointsY[445]);
  vertex(savedPointsX[300], savedPointsY[300]);
  vertex(savedPointsX[283], savedPointsY[283]);
  vertex(savedPointsX[282], savedPointsY[282]);
  vertex(savedPointsX[295], savedPointsY[295]);
  vertex(savedPointsX[285], savedPointsY[285]);
  vertex(savedPointsX[417], savedPointsY[417]);
  vertex(savedPointsX[351], savedPointsY[351]);
  vertex(savedPointsX[419], savedPointsY[419]);
  vertex(savedPointsX[248], savedPointsY[248]);
  vertex(savedPointsX[281], savedPointsY[281]);
  vertex(savedPointsX[275], savedPointsY[275]);
  vertex(savedPointsX[274], savedPointsY[274]);
  vertex(savedPointsX[458], savedPointsY[458]);
  endShape();

  // green shapes around eye
  fill(34, 64, 30);
  beginShape();
  vertex(savedPointsX[458], savedPointsY[458]);
  vertex(savedPointsX[328], savedPointsY[328]);
  vertex(savedPointsX[294], savedPointsY[294]);
  vertex(savedPointsX[279], savedPointsY[279]);
  vertex(savedPointsX[458], savedPointsY[458]);
  endShape();

  beginShape();
  vertex(savedPointsX[238], savedPointsY[238]);
  vertex(savedPointsX[97], savedPointsY[97]);
  vertex(savedPointsX[129], savedPointsY[129]);
  vertex(savedPointsX[49], savedPointsY[49]);
  vertex(savedPointsX[238], savedPointsY[238]);
  endShape();

  beginShape();
  vertex(savedPointsX[124], savedPointsY[124]);
  vertex(savedPointsX[156], savedPointsY[156]);
  vertex(savedPointsX[139], savedPointsY[139]);
  vertex(savedPointsX[143], savedPointsY[143]);
  vertex(savedPointsX[227], savedPointsY[227]);
  vertex(savedPointsX[116], savedPointsY[116]);
  vertex(savedPointsX[111], savedPointsY[111]);
  vertex(savedPointsX[35], savedPointsY[35]);
  vertex(savedPointsX[124], savedPointsY[124]);
  endShape();

  // lighter green eye shapes
  fill(90, 153, 113);
  beginShape();
  vertex(savedPointsX[464], savedPointsY[464]);
  vertex(savedPointsX[463], savedPointsY[463]);
  vertex(savedPointsX[398], savedPointsY[398]);
  vertex(savedPointsX[384], savedPointsY[384]);
  vertex(savedPointsX[385], savedPointsY[385]);
  vertex(savedPointsX[386], savedPointsY[386]);
  vertex(savedPointsX[387], savedPointsY[387]);
  vertex(savedPointsX[388], savedPointsY[388]);
  vertex(savedPointsX[263], savedPointsY[263]);
  vertex(savedPointsX[276], savedPointsY[276]);
  vertex(savedPointsX[445], savedPointsY[445]);
  vertex(savedPointsX[259], savedPointsY[259]);
  vertex(savedPointsX[257], savedPointsY[257]);
  vertex(savedPointsX[258], savedPointsY[258]);
  vertex(savedPointsX[286], savedPointsY[286]);
  vertex(savedPointsX[414], savedPointsY[414]);
  vertex(savedPointsX[465], savedPointsY[465]);
  endShape();

  beginShape();
  vertex(savedPointsX[381], savedPointsY[381]);
  vertex(savedPointsX[341], savedPointsY[341]);
  vertex(savedPointsX[256], savedPointsY[256]);
  vertex(savedPointsX[451], savedPointsY[451]);
  vertex(savedPointsX[348], savedPointsY[348]);
  vertex(savedPointsX[449], savedPointsY[449]);
  vertex(savedPointsX[446], savedPointsY[446]);
  vertex(savedPointsX[353], savedPointsY[353]);
  vertex(savedPointsX[359], savedPointsY[359]);
  vertex(savedPointsX[339], savedPointsY[339]);
  vertex(savedPointsX[450], savedPointsY[450]);
  vertex(savedPointsX[252], savedPointsY[252]);
  vertex(savedPointsX[381], savedPointsY[381]);
  endShape();

  beginShape();
  vertex(savedPointsX[243], savedPointsY[243]);
  vertex(savedPointsX[190], savedPointsY[190]);
  vertex(savedPointsX[56], savedPointsY[56]);
  vertex(savedPointsX[28], savedPointsY[28]);
  vertex(savedPointsX[223], savedPointsY[223]);
  vertex(savedPointsX[29], savedPointsY[29]);
  vertex(savedPointsX[30], savedPointsY[30]);
  vertex(savedPointsX[124], savedPointsY[124]);
  vertex(savedPointsX[247], savedPointsY[247]);
  vertex(savedPointsX[161], savedPointsY[161]);
  vertex(savedPointsX[160], savedPointsY[160]);
  vertex(savedPointsX[27], savedPointsY[27]);
  vertex(savedPointsX[158], savedPointsY[158]);
  vertex(savedPointsX[157], savedPointsY[157]);
  vertex(savedPointsX[173], savedPointsY[173]);
  vertex(savedPointsX[155], savedPointsY[155]);
  endShape();

  beginShape();
  vertex(savedPointsX[155], savedPointsY[155]);
  vertex(savedPointsX[112], savedPointsY[112]);
  vertex(savedPointsX[26], savedPointsY[26]);
  vertex(savedPointsX[22], savedPointsY[22]);
  vertex(savedPointsX[23], savedPointsY[23]);
  vertex(savedPointsX[24], savedPointsY[24]);
  vertex(savedPointsX[7], savedPointsY[7]);
  vertex(savedPointsX[163], savedPointsY[163]);
  vertex(savedPointsX[144], savedPointsY[144]);
  vertex(savedPointsX[145], savedPointsY[145]);
  vertex(savedPointsX[153], savedPointsY[153]);
  vertex(savedPointsX[154], savedPointsY[154]);
  vertex(savedPointsX[155], savedPointsY[155]);
  endShape();

  // green eye balls
  fill(34, 64, 30);
  ellipse(savedPointsX[374], savedPointsY[374] - 2, 10, 15);
  ellipse(savedPointsX[145], savedPointsY[145] - 7, 13, 10);

  stroke(193, 189, 186);
  line(savedPointsX[69], savedPointsY[69], savedPointsX[108], savedPointsY[108]);
  line(savedPointsX[108], savedPointsY[108], savedPointsX[151], savedPointsY[151]);
  line(savedPointsX[151], savedPointsY[151], savedPointsX[337], savedPointsY[337]);
  line(savedPointsX[337], savedPointsY[337], savedPointsX[299], savedPointsY[299]);

  noStroke();

}

// key pressed function
function keyPressed(key) {

  // increase portrait mode to change between filters using arrow keys

  if(keyCode === RIGHT_ARROW) {
    // check if its on the last filter 
    if(portraitMode < 4) {
      portraitMode = portraitMode + 1;
    }
  } else if (keyCode === LEFT_ARROW) {
    // check if its on the first filter
    if(portraitMode > 0)
    portraitMode = portraitMode - 1;
  }
  
}

// function to tell me the location of the circle i have clicked in side the savedPoints array 
// this allows me to quickly see which circle i want to draw on
// prints the array number in the console
function mousePressed() {
  r = 2;
  for (i = 0; i < savedPointsX.length; i++) {
    let d = dist(mouseX, mouseY, savedPointsX[i], savedPointsY[i]);

    if (d < r) {
      // print to console
      console.log('Circle number: ' + i);
    }
  }
  
}


// a reuseable function that draws a the entire face shape around the edge of the mesh
// uses given rgba values as parameters to fill
function drawWholeFaceShape(r, g, b, a) {
  fill(r, g, b, a);
  beginShape();
  vertex(savedPointsX[10], savedPointsY[10]);
  vertex(savedPointsX[338], savedPointsY[338]);
  vertex(savedPointsX[297], savedPointsY[297]);
  vertex(savedPointsX[332], savedPointsY[332]);
  vertex(savedPointsX[284], savedPointsY[284]);
  vertex(savedPointsX[251], savedPointsY[251]);
  vertex(savedPointsX[389], savedPointsY[389]);
  vertex(savedPointsX[356], savedPointsY[356]);
  vertex(savedPointsX[454], savedPointsY[454]);
  vertex(savedPointsX[323], savedPointsY[323]);
  vertex(savedPointsX[361], savedPointsY[361]);
  vertex(savedPointsX[288], savedPointsY[288]);
  vertex(savedPointsX[397], savedPointsY[397]);
  vertex(savedPointsX[365], savedPointsY[365]);
  vertex(savedPointsX[379], savedPointsY[379]);
  vertex(savedPointsX[378], savedPointsY[378]);
  vertex(savedPointsX[400], savedPointsY[400]);
  vertex(savedPointsX[377], savedPointsY[377]);
  vertex(savedPointsX[152], savedPointsY[152]);
  vertex(savedPointsX[148], savedPointsY[148]);
  vertex(savedPointsX[176], savedPointsY[176]);
  vertex(savedPointsX[149], savedPointsY[149]);
  vertex(savedPointsX[150], savedPointsY[150]);
  vertex(savedPointsX[136], savedPointsY[136]);
  vertex(savedPointsX[172], savedPointsY[172]);
  vertex(savedPointsX[58], savedPointsY[58]);
  vertex(savedPointsX[132], savedPointsY[132]);
  vertex(savedPointsX[93], savedPointsY[93]);
  vertex(savedPointsX[234], savedPointsY[234]);
  vertex(savedPointsX[127], savedPointsY[127]);
  vertex(savedPointsX[162], savedPointsY[162]);
  vertex(savedPointsX[21], savedPointsY[21]);
  vertex(savedPointsX[54], savedPointsY[54]);
  vertex(savedPointsX[103], savedPointsY[103]);
  vertex(savedPointsX[67], savedPointsY[67]);
  vertex(savedPointsX[109], savedPointsY[109]);
  vertex(savedPointsX[10], savedPointsY[10]);
  endShape();

}

// function to draw the timeline 
function drawTimeline() {
  fill(0);
  rect(0, 480, 640, 70);

  fill(255);
  textSize(13);
  text("18 years old", 10, 505);
  text("83 years old", 540, 505);
  stroke(255);
  line(90, 503, 530, 503);

  // controlled by the portrait mode to display the corresponding timeline info
  if(portraitMode === 0) {
    fill(255, 255, 255, 100);
    rect(0, 480, 90, 70);

    fill(255);
    noStroke();
    textSize(20);
    text("1900", 20, 533);

    textSize(13);
  } else if (portraitMode === 1) {
    fill(100, 127, 151, 100);
    stroke(100, 127, 151);
    rect(40, 480, 90, 70);

    fill(128, 162, 193);
    noStroke();
    textSize(20);
    text("1901", 62, 533);
    textSize(13);

  } else if (portraitMode === 2) {
    fill(206, 95, 12, 100);
    stroke(206, 95, 12);
    rect(100, 480, 90, 70);

    fill(206, 95, 12);
    noStroke();
    textSize(20);
    text("1906", 123, 533);
    textSize(13);

  } else if (portraitMode === 3) {
    fill(177, 124, 20, 100);
    stroke(177, 124, 20);
    rect(120, 480, 90, 70);

    fill(177, 124, 20);
    noStroke();
    textSize(20);
    text("1907", 143, 533);
    textSize(13);

  } else if (portraitMode === 4) {
    fill(225, 221, 187, 100);
    stroke(225, 221, 187);
    rect(510, 480, 90, 70);

    fill(225, 221, 187);
    noStroke();
    textSize(20);
    text("1965", 530, 533);

    textSize(13);
  }

}

// function to draw the descriptions for each portrait
function drawTextDescription() {
  fill(48);
  rect(640, 0, 400, height);

  // controlled by the portrait mode variable
  if(portraitMode === 0) {
    textSize(30)
    fill(255);
    text("18 Years Old", 750, 70);

    textSize(15);
    fill(200)
    text("Drawn in 1900", 790, 100);

    image(painting1900, 743, 120, 190, 250);
  
    textSize(13);
    text("This painting, one of the first known self portraits of Picasso, was created in 1900 using charcoal and paper, and portrays Picasso at 18 years of age. This period marked a transition of Picasso's artistic style from Realism to Modernism. This portrait portrays Picasso with anatomical correctness, a style he leaves behind as his portraits develop over time.", 680, 400, 330, 200);
    
  } else if (portraitMode === 1) {
    textSize(30)
    fill(255);
    text("20 Years Old", 750, 70);

    textSize(15);
    fill(200)
    text("Drawn in 1901", 790, 100);

    image(painting1901, 733, 120, 210, 250);
  
    textSize(13);
    text("This portrait, painted in 1901, depicting Picasso at 20 years old, displays more characteristics of Modernism. Picasso uses tones of blue, yellow and white throughout the painting, key characteristics of his artworks from a time coined 'The Blue Period'. This style is thought to reflect his experience of poverty and depression during this time.", 680, 400, 330, 200);
  } else if (portraitMode === 2) {
    textSize(30)
    fill(255);
    text("24 Years Old", 750, 70);

    textSize(15);
    fill(200)
    text("Drawn in 1906", 790, 100);

    image(painting1906, 733, 120, 210, 250);
  
    textSize(13);
    text("In his 1906 expressionist-styled portrait, Picasso depicts himself with bold colours, exaggerated facial features and bold outlines. This era of artwork is often referred to as Picasso's 'Rose Period' which is characterised by a bright colour palette of oranges and pinks, with his paintings often featuring depictions of circus figures and acrobats.", 680, 400, 330, 200);
  } else if (portraitMode === 3) {
    textSize(30)
    fill(255);
    text("25 Years Old", 750, 70);

    textSize(15);
    fill(200)
    text("Drawn in 1907", 790, 100);

    image(painting1907, 733, 120, 210, 250);
  
    textSize(13);
    text("This 1907 portrait features Picasso with exaggerated and sharp facial features. This portrait also features enlarged oval shaped eyes, an iconic characteristic known as 'Almond Eyes' which can be found in many of his subsequent portraits. This time period is also referred to as Picassos 'African-Influenced Period' in which he took inspiration from traditional African art and sculptures.", 680, 400, 330, 200);
  } else if (portraitMode === 4) {
    textSize(30)
    fill(255);
    text("83 Years Old", 750, 70);

    textSize(15);
    fill(200)
    text("Drawn in 1965", 790, 100);

    image(painting1965, 733, 120, 210, 250);
  
    textSize(13);
    text("In this portrait, called 'Seated Man', Picasso portrays himself with a bright and bold colour palette, using abstract shapes and lines. This painting style is often referred to as 'child-like'.", 680, 400, 330, 200);
  }
}

// function to draw the instructions telling the user how to navigate through the page in the top left hand corner
function drawNavigationInstructions() {
  fill(0);
  rect(0, 0, 640, 25);

  fill(255);
  textSize(12);
  text("Please use the left and right arrow keys to navigate.", 10, 17);
  
}