var MouseX = 0;
var MouseY = 0;
//let MovingTextOrigins = [];

//Functions

function mouseMove(event) {
    MouseX = event.clientX;
    MouseY = event.clientY;

}//END mouseMove

function pixelToNum(PixelValue)
{

    if (PixelValue.length == 0){
        return 0;
    }
    else{
        let TruncatedPixel = PixelValue.substring(0, PixelValue.length - 2);

        return parseFloat(TruncatedPixel);
    }
}//END pixelToNum

function distanceBetween(X0,Y0,X1,Y1)
{
    return ((X0 - X1)**2 + (Y0 - Y1)**2)**0.5;
}

function floatText(MovingText,OriginPos,TrackRadius)
{ 
    const MaxSpeed = 10;

    //let Textpos = MovingText.getBoundingClientRect();
    let Width = MovingText.offsetWidth;
    let Height = MovingText.offsetHeight;
    let X = pixelToNum(MovingText.style.left);
    let Y = pixelToNum(MovingText.style.top);
    OriginX = OriginPos[0] - Width/2;
    OriginY = OriginPos[1] - Height;
    MouseXOf = MouseX - Width/2;
    MouseYOf = MouseY - Height*(2/3);

    let MouseDistance = distanceBetween(OriginX,OriginY,MouseXOf,MouseYOf );
    let OriginDistance = distanceBetween(OriginX,OriginY,X,Y);
    if (MouseDistance < TrackRadius)
    {   
        let YDis = (MouseYOf - Y);
        let XDis = (MouseXOf  - X);
        MovingText.style.top = (Y + MaxSpeed*(YDis /TrackRadius)) + "px";
        MovingText.style.left = (X + MaxSpeed*(XDis /TrackRadius)) + "px";
        
    }
    else if (OriginDistance > MaxSpeed + 1 && OriginDistance <= TrackRadius)
    {
        let YDis = (OriginY - Y);
        let XDis = (OriginX - X);
        MovingText.style.top = (Y + MaxSpeed*(YDis /TrackRadius)) + "px";
        MovingText.style.left = (X + MaxSpeed*(XDis /TrackRadius)) + "px";
    }
    else if (OriginDistance > TrackRadius)
    {
        MovingText.style.top = OriginY + "px";
        MovingText.style.left = OriginX + "px";
    }
}
function drawLines(MovingText) {
  const canvas = document.getElementById("LineCanvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.beginPath();
  ctx.moveTo(pixelToNum(MovingText[0].style.left) + MovingText[0].offsetWidth/2, pixelToNum(MovingText[0].style.top)+ MovingText[0].offsetHeight/2);
  for (let i = 1; i < MovingText.length; i++)
    ctx.lineTo(pixelToNum(MovingText[i].style.left) + MovingText[i].offsetWidth/2, pixelToNum(MovingText[i].style.top)+ MovingText[i].offsetHeight/2);
  ctx.lineTo(pixelToNum(MovingText[0].style.left) + MovingText[0].offsetWidth/2, pixelToNum(MovingText[0].style.top)+ MovingText[0].offsetHeight/2);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(0, 183, 183)";
  ctx.stroke();
}

function handleMovingText()
{

    let MovingTexts = document.getElementsByClassName("MovingText")
    const OriginsRadius = calculateOrigins(3);
    for (let i = 0; i < MovingTexts.length; i++)
    {
        floatText(MovingTexts[i],OriginsRadius[0][i],OriginsRadius[1]);
    }
    drawLines(MovingTexts)
}

function calculateOrigins(NumOfTexts)
{
    let MovingTextOrigins = [];
    let Radius = 0;
    let OriginX = window.innerWidth / 2;
    let OriginY = window.innerHeight / 2;
    let PercentRadius = 0.7;

    if (window.innerWidth >= window.innerHeight)
    {
        Radius = window.innerHeight/2 * PercentRadius;
    }
    else
    {
        Radius = window.innerWidth/2 * PercentRadius;
    }
    const Interval = (2*Math.PI) / NumOfTexts;
    let TrackRadius = Radius*Math.sin(Interval/2)
    var CurrentAngle = Math.PI/2;
    for (let i = 0; i < NumOfTexts; i++)
    {
        CurrentAngle += Interval;
        let X = Radius*Math.cos(CurrentAngle);
        let Y = Radius*Math.sin(CurrentAngle);
        MovingTextOrigins.push([OriginX+X,OriginY+Y]);
    }
    return [MovingTextOrigins,TrackRadius];
}

function spawnRain(Xpos,NumOfChars,FontSize)
{
    const Container = document.getElementById("RainContainer");
    const RainText = document.createElement("p");
    RainText.className = "RainingText";
    //RainText.fon = FontSize + "px";
    RainText.style.left = Math.round(Xpos) + "px";
    RainText.style.top = (-300) + "px";
    RainText.textContent = "";
    document.body.appendChild(RainText);
}

function randomRainText(NumOfChars,currentText)
{
    let Characters = ['A','B','C','D','E','F','G','H','I','J','K','L',"M",'N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','#','(',')','?','!'];
    let Text = currentText;
    if (currentText.length > 0)
    {
        Text = Text.slice(2,currentText.length);
    }
    let BreakChar = "\n";
    let CurrentLength = currentText.length/2;
    for (let i = 0; i < NumOfChars - CurrentLength; i++)
    {
        let RandomIndex = Math.floor(Math.random()*Characters.length);
        Text = Text + Characters[RandomIndex] + BreakChar;
    }

    if (CurrentLength == NumOfChars)
    {
        let RandomIndex2 = Math.floor(Math.random()*Characters.length);
        Text = Text + Characters[RandomIndex2] + BreakChar;
    }
    
    return Text;
}

function handleRainingText()
{
    let RainTexts = document.getElementsByClassName("RainingText");
    const FontSize = 15;
    const NumberOfChars = 8;
    const refreshRate = 10;
    const NumOfRain = window.innerWidth/FontSize;
    let Speed = FontSize/2;
    
    for (let i = 0; i < RainTexts.length; i++)
    {
        if (i === 0)
        {
           
            console.log(RainTexts[i].offsetTop);
        }
        RainTexts[i].style.top = (pixelToNum(RainTexts[i].style.top) + Speed) + "px";
        RainTexts[i].textContent = randomRainText(NumberOfChars,RainTexts[i].textContent);
        
        if (pixelToNum(RainTexts[i].style.top) > window.innerHeight)
        {
            RainTexts[i].remove();
        }

    }
    
    if (RainTexts.length < NumOfRain)
    {
        
        SpawnX = window.innerWidth*Math.random();
        
        spawnRain(SpawnX,NumberOfChars,FontSize);
        
    }
}
//Event Listeners
window.addEventListener("mousemove",mouseMove)
setInterval(handleMovingText,30);
setInterval(handleRainingText,50);