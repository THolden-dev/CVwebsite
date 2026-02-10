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

function floatEntry(ExpEntry)
{
    const DegreeOffset = Math.PI/40;
    let YCenter = 0;
    const Radius = 5;
    const CenterX = window.innerWidth/2;
    let CurAngle = Math.acos((CenterX - pixelToNum(ExpEntry.style.left))/Radius);
    
    ExpEntry.style.left = (pixelToNum(ExpEntry.style.left) + Radius*Math.cos(CurAngle + DegreeOffset)) + "px";
    console.log(Radius*Math.cos(CurAngle + DegreeOffset))
}

function floatEntries()
{
    let ExpEntries = document.getElementsByClassName("ExperienceEntry");

    for (let i = 0; i < ExpEntries.length; i++)
    {
        floatEntry(ExpEntries[i]);
    }
    
}

setInterval(floatEntries,30);


