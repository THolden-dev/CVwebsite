let RotationAngle = 0;
const DegreeOffset = Math.PI/60;

const CVImages = document.getElementsByClassName("CVImage")
const CVImagesContainer = document.getElementsByClassName("CVImagesContainer")

for (var i = 0; i < CVImages.length; i++) {
    CVImages[i].addEventListener('click', 
    e = (event) => 
    {  
        const ImageScale = 3;
        let Spacer =  event.target.parentNode.parentNode.getElementsByClassName("CVImageSpacer");
        if (event.target.style.zIndex !== "1"){
            console.log("running")
            let OtherCVImages = event.target.parentNode.parentNode.getElementsByClassName("CVImage");
            

            for (var i = 0; i < OtherCVImages.length; i++) {
                OtherCVImages[i].style.transform = "translate(0,0)";
                OtherCVImages[i].style.zIndex = "0";
            }
            event.target.style.zIndex = "1";

            const HeightOfContainer = (event.target.parentNode.parentNode.offsetHeight - pixelToNum(Spacer[0].style.paddingBottom))
            const CenterX = event.target.parentNode.parentNode.offsetLeft + event.target.parentNode.parentNode.offsetWidth / 2;
            const CenterY = event.target.parentNode.parentNode.offsetTop + HeightOfContainer/2;
            const OffsetCenterX = CenterX - event.target.offsetLeft;
            const OffsetCenterY = CenterY - event.target.offsetTop;
            console.log(event.target.parentNode.offsetLeft,event.target.parentNode.offsetTop, CenterX,CenterY);
            event.target.style.transform = "translate(" + OffsetCenterX + "px" +  "," + OffsetCenterY +  "px" + ")" + " scale(" + ImageScale + ")";
            console.log((event.target.offsetTop + event.target.offsetHeight*ImageScale) - (CenterY + HeightOfContainer/2))
            if ((event.target.offsetTop + OffsetCenterY + event.target.offsetHeight*ImageScale) - (CenterY + HeightOfContainer/2) > 0)
            {
                console.log("adding space")
                Spacer[0].style.paddingBottom = ((event.target.offsetTop + OffsetCenterY + event.target.offsetHeight*ImageScale) - (CenterY + HeightOfContainer/2)) + "px";
                console.log(Spacer[0].style.paddingBottom)
            }
            else
            {
                Spacer[0].style.paddingBottom = "0px";
            }
            console.log(Spacer)
        }
        else
        {
            event.target.style.zIndex = "0";
            event.target.style.transform = "translate(" + 0 + "px" +  "," + 0 +  "px" + ")" + " scale(" + 1 + ")";
            Spacer[0].style.paddingBottom = "0px";
        }
    });
}
function MouseLeft(item)
{
    item.style.paddingBottom = "0px";
    console.log("left")
}

function drawMontains(Canvas, Context, XStart,YStart)
{
    const MontWidth = Canvas.width/15;
    const HighMontHeight = Canvas.height/10;
    const LowMontHeight = Canvas.height/13;
    const LowMontRatio = LowMontHeight/MontWidth;
    console.log(LowMontRatio);
    Context.moveTo(XStart,YStart);
    Context.lineTo(XStart + MontWidth*0.5,YStart - LowMontHeight);
    Context.lineTo(XStart + MontWidth,YStart);
    Context.moveTo(XStart + MontWidth*0.75,YStart - (MontWidth*0.50)*LowMontRatio);
    Context.lineTo(XStart + MontWidth, YStart - HighMontHeight);
    Context.lineTo(XStart + MontWidth*1.5, YStart);
}
function drawBackground(Canvas)
{
    let context = Canvas.getContext("2d");

    Canvas.width = window.innerWidth;
    Canvas.height = window.innerHeight;

    const PathWidth = Canvas.width/10;
    const BeginY = -2;
    const AngleInterval = (Math.PI*2)/Canvas.height;
    const WaveHeight = 100;
    let CurrentAngle = 0;
    
    context.beginPath();
    context.moveTo(Canvas.width/2,BeginY);

    for (let i = BeginY; i < Canvas.height; i++)
    {
        context.lineTo((Canvas.width/2 - PathWidth/2) + WaveHeight*Math.sin(CurrentAngle),i);
        context.moveTo((Canvas.width/2 - PathWidth/2) + WaveHeight*Math.sin(CurrentAngle) + PathWidth,i);
        context.lineTo((Canvas.width/2 - PathWidth/2) + WaveHeight*Math.sin((CurrentAngle + AngleInterval)) + PathWidth,i + 1);
        context.moveTo((Canvas.width/2 - PathWidth/2) + WaveHeight*Math.sin(CurrentAngle),i);
        CurrentAngle += AngleInterval
    }

    drawMontains(Canvas, context,Canvas.width*0.08,Canvas.height*0.5);
    drawMontains(Canvas, context,Canvas.width*0.85,Canvas.height*0.75);

    context.lineWidth = 2;
    context.strokeStyle = "rgb(23, 201, 0)";
    context.stroke();

}

for (var i = 0; i < CVImagesContainer.length; i++) {
    CVImagesContainer[i].addEventListener('click', 
    e = (event) =>
    {
        
        if (event.target === event.currentTarget || event.target.className === "CVImageDiv"){
            let OtherCVImages = event.currentTarget.getElementsByClassName("CVImage");
            for (var i = 0; i < OtherCVImages.length; i++) {
                OtherCVImages[i].style.transform = "translate(0,0)";
            }
            event.currentTarget.style.paddingBottom = "0px";
        }
    })
}

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

function floatEntry(ExpEntries,i)
{
    let ExpEntry = ExpEntries[i]
    const Radius = 3;
    const CenterX = window.innerWidth/2 - ExpEntry.offsetWidth/2;
    const DisBetween = (window.innerHeight/4)
    let Direction = 1;
    let CenterY = (window.innerHeight/2) - ExpEntry.offsetHeight/2;
    if (i % 2 === 0)
    {
        Direction = -1;
    }
    if (i > 0){
        
    
        CenterY = pixelToNum(ExpEntries[i - 1].style.top) + ExpEntries[i - 1].offsetHeight + DisBetween;
        
    }
    if (CenterX - pixelToNum(ExpEntry.style.left) > Radius)
    {
        console.log("reseting")
        ExpEntry.style.left = (CenterX - Radius) + "px";
        ExpEntry.style.top = (CenterY - Radius) + "px";
    }
    
    ExpEntry.style.left = (CenterX + Direction*Radius*Math.cos(RotationAngle)) + "px";
    ExpEntry.style.top = (CenterY - Math.cos(RotationAngle)*Radius*Math.sin(RotationAngle)) + "px";
}

function floatEntries()
{
    let ExpEntries = document.getElementsByClassName("ExperienceEntry");
    RotationAngle = RotationAngle + DegreeOffset;
    for (let i = 0; i < ExpEntries.length; i++)
    {
        floatEntry(ExpEntries,i);
    }
    
}

function drawBackgrounds()
{
    let Canvases = document.getElementsByClassName("Background");
    for (let i = 0; i < Canvases.length; i++)
    {
        drawBackground(Canvases[i]);
    }
}

setInterval(floatEntries,30);
window.addEventListener('resize', drawBackgrounds);
drawBackgrounds();

